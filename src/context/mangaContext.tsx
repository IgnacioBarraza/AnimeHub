import axios from 'axios'
import { createContext, useState, useEffect } from 'react'
import {
  Chapter,
  ContextProviderProps,
  LastChaptersResponse,
  MangadexApiResponse,
  MangaDexData,
} from '@/utils/interfaces'

const jikan_base_url = 'https://api.jikan.moe/v4'
const mangadex_base_url = 'https://api.mangadex.org'

interface MangaContextProps {
  getMangaById: (id: string) => Promise<MangaDexData | null>
  getStoredMangaById: (id: string) => MangaDexData | null
  fetchMangaList: () => Promise<MangaDexData[]>
  searchManga: (searchQuery: string, selectedGenres: string[], selectedStatus: string[], selectedDemographic: string[], sortBy: string) => Promise<MangaDexData[]>
  getPopularManga: () => Promise<MangaDexData[]>
  getMoreFollowedManga: () => Promise<MangaDexData[]>
  getNewReleases: () => Promise<MangaDexData[]>
  getMangaDexIdByTitle: (title: string) => Promise<string | null>
  fetchLastChapters: (mangaDexId: string) => Promise<Chapter[]>
}

export const MangaContext = createContext<MangaContextProps | undefined>(
  undefined
)

export const MangaProvider = ({ children }: ContextProviderProps) => {
  const [cachedData, setCachedData] = useState<Record<string, MangaDexData>>({})
  const [lastChaptersCache, setLastChaptersCache] = useState<Record<string, Chapter[]>>({})
  const [popularManga, setPopularManga] = useState<MangaDexData[]>([])
  const [topRatedManga, setTopRatedManga] = useState<MangaDexData[]>([])
  const [newReleases, setNewReleases] = useState<MangaDexData[]>([])

  const [cacheTimestamps, setCacheTimestamps] = useState<Record<string, number>>({})

  useEffect(() => {
    const storedData = localStorage.getItem('mangaCache')
    const storedTimestamps = localStorage.getItem('mangaCacheTimestamps')

    if (storedData) {
      setCachedData(JSON.parse(storedData))
    }
    if (storedTimestamps) {
      setCacheTimestamps(JSON.parse(storedTimestamps))
    }
  }, [])

  useEffect(() => {
    localStorage.setItem('mangaCache', JSON.stringify(cachedData))
    localStorage.setItem(
      'mangaCacheTimestamps',
      JSON.stringify(cacheTimestamps)
    )
  }, [cachedData, cacheTimestamps])

  const fetchMangaById = async (id: string): Promise<MangaDexData | null> => {
    if (cachedData[id]) return cachedData[id]

    try {
      const response = await axios.get<MangaDexData>(`${jikan_base_url}/manga/${id}`)
      const manga = response.data
      setCachedData((prev) => ({ ...prev, [id]: manga }))
      return manga
    } catch (error) {
      console.error('Failed to fetch manga: ', error)
      return null
    }
  }

  const fetchMangaList = async (): Promise<MangaDexData[]> => {
    if (popularManga.length > 0) return popularManga
    return fetchMangaData('popular')
  }

  const searchManga = async (searchQuery: string, selectedGenres: string[], selectedStatus: string[], selectedDemographic: string[], sortBy: string): Promise<MangaDexData[]> => {
    try {
      let url = `${mangadex_base_url}/manga?title=${searchQuery}&limit=10&includes[]=cover_art&includes[]=author`
      
      if (selectedGenres.length > 0) {
        selectedGenres.forEach(genreId => {
          url += `&includedTags[]=${genreId}`
        })
      }

      if (selectedStatus.length > 0) {
        selectedStatus.forEach(status => {
          url += `&status[]=${status}`
        })
      }

      if (selectedDemographic.length > 0) {
        selectedDemographic.forEach(demographicId => {
          if (demographicId !== 'none') {
            url += `&includedTags[]=${demographicId}`
          }
        })
      }

      if (sortBy !== 'relevance') {
        url += `&order[${sortBy}]=desc`
      }
      
      const response = await axios.get<MangadexApiResponse>(url)
      const searchResults = response.data.data
      searchResults.forEach((manga) => {
        setCachedData((prev) => ({ ...prev, [manga.id]: manga }))
      })
      return searchResults
    } catch (error) {
      console.error('Failed to search manga:', error)
      return []
    }
  }

  const normalizeTitle = (title: string): string => {
    return title
      .toLowerCase()
      .replace(/[\s-]+/g, '-')
      .replace(/[^\w-]/g, '')
  }

  const fetchMangaDexIdByTitle = async (title: string): Promise<string | null> => {
    try {
      const response = await axios.get(`${mangadex_base_url}/manga?title=${encodeURIComponent(title)}`)
      if (response.data.result === 'ok' && response.data.data.length > 0) {
        const matchingManga = response.data.data.find(
          (manga: { attributes: { title: { en: string } } }) =>
            normalizeTitle(manga.attributes.title.en) === normalizeTitle(title)
        )
  
        if (matchingManga) {
          return matchingManga.id
        }
      }
  
      return null
    } catch (error) {
      console.error('Failed to fetch MangaDex ID:', error)
      return null
    }
  }

  const fetchLastChapters = async (mangaDexId: string): Promise<Chapter[]> => {
    if (lastChaptersCache[mangaDexId]) {
      return lastChaptersCache[mangaDexId]
    }

    try {
      const response = await axios.get<LastChaptersResponse>(
        `${mangadex_base_url}/chapter?manga=${mangaDexId}&limit=20`
      )
      if (response.data.result === 'ok') {
        const chapters = response.data.data || []
        setLastChaptersCache((prev) => ({ ...prev, [mangaDexId]: chapters }))
        return chapters
      }
      return []
    } catch (error) {
      console.error('Failed to fetch last chapters:', error)
      return []
    }
  }

  const getStoredMangaById = (id: string): MangaDexData | null => {
    return cachedData[id] || null
  }

  const getPopularManga = async (): Promise<MangaDexData[]> => {
    return fetchMangaData('popular')
  }

  const getMoreFollowedManga = async (): Promise<MangaDexData[]> => {
    return fetchMangaData('more-followed')
  }

  const getNewReleases = async (): Promise<MangaDexData[]> => {
    return fetchMangaData('new-releases')
  }

  const fetchMangaData = async (type: string): Promise<MangaDexData[]> => {
    const now = Date.now()
    const cacheKey = `${type}Timestamp`

    if (
      cacheTimestamps[cacheKey] &&
      now - cacheTimestamps[cacheKey] < 10 * 60 * 1000
    ) {
      if (type === 'popular') return popularManga
      if (type === 'more-followed') return topRatedManga
      if (type === 'new-releases') return newReleases
    }

    try {
      let endpointMangadex = `${mangadex_base_url}/manga?`
      switch (type) {
        case 'popular':
          endpointMangadex += 'order[rating]=desc&includes[]=cover_art&includes[]=author&limit=15'
          break
        case 'more-followed':
          endpointMangadex += 'order[followedCount]=desc&includes[]=cover_art&includes[]=author&limit=15'
          break
        case 'new-releases':
          endpointMangadex += 'order[createdAt]=desc&includes[]=cover_art&includes[]=author&limit=15'
          break
        default:
          return []
      }

      const response = await axios.get<MangadexApiResponse>(endpointMangadex)
      const data = response.data.data

      if (type === 'popular') {
        setPopularManga(data)
      } else if (type === 'more-followed') {
        setTopRatedManga(data)
      } else if (type === 'new-releases') {
        setNewReleases(data)
      }

      data.forEach((manga) => {
        setCachedData((prev) => ({ ...prev, [manga.id]: manga }))
      })

      setCacheTimestamps((prev) => ({ ...prev, [cacheKey]: now }))

      return data
    } catch (error) {
      if (axios.isAxiosError(error) && error.response?.status === 429) {
        console.error('Too Many Requests, retrying in 30 seconds...')
        await new Promise((resolve) => setTimeout(resolve, 30000))
        return fetchMangaData(type)
      }

      console.error(`Failed to fetch ${type} manga:`, error)
      return []
    }
  }

  return (
    <MangaContext.Provider
      value={{
        getMangaById: fetchMangaById,
        getStoredMangaById,
        fetchMangaList,
        searchManga,
        getPopularManga,
        getMoreFollowedManga,
        getNewReleases,
        getMangaDexIdByTitle: fetchMangaDexIdByTitle,
        fetchLastChapters
      }}
    >
      {children}
    </MangaContext.Provider>
  )
}
