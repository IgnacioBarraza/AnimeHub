import axios from 'axios'
import { createContext, useState, useEffect } from 'react'
import {
  ContextProviderProps,
  Manga,
  MangaApiResponse,
} from '@/utils/interfaces'

const base_url = 'https://api.jikan.moe/v4'

interface MangaContextProps {
  getMangaById: (id: string) => Promise<Manga | null>
  getStoredMangaById: (id: string) => Manga | null // New function
  fetchMangaList: () => Promise<Manga[]>
  searchManga: (query: string) => Promise<Manga[]>
  getPopularManga: () => Promise<Manga[]>
  getTopRatedManga: () => Promise<Manga[]>
  getNewReleases: () => Promise<Manga[]>
}

export const MangaContext = createContext<MangaContextProps | undefined>(
  undefined
)

export const MangaProvider = ({ children }: ContextProviderProps) => {
  const [cachedData, setCachedData] = useState<Record<string, Manga>>({})
  const [popularManga, setPopularManga] = useState<Manga[]>([])
  const [topRatedManga, setTopRatedManga] = useState<Manga[]>([])
  const [newReleases, setNewReleases] = useState<Manga[]>([])

  const [cacheTimestamps, setCacheTimestamps] = useState<
    Record<string, number>
  >({})

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

  const fetchMangaById = async (id: string): Promise<Manga | null> => {
    if (cachedData[id]) return cachedData[id]

    try {
      const response = await axios.get<Manga>(`${base_url}/manga/${id}`)
      const manga = response.data
      setCachedData((prev) => ({ ...prev, [id]: manga }))
      return manga
    } catch (error) {
      console.error('Failed to fetch manga: ', error)
      return null
    }
  }

  const fetchMangaList = async (): Promise<Manga[]> => {
    if (popularManga.length > 0) return popularManga
    return fetchMangaData('popular')
  }

  const searchManga = async (query: string): Promise<Manga[]> => {
    try {
      const response = await axios.get<MangaApiResponse>(
        `${base_url}/manga?q=${query}`
      )
      const searchResults = response.data.data
      searchResults.forEach((manga) => {
        setCachedData((prev) => ({ ...prev, [manga.mal_id]: manga }))
      })
      return searchResults
    } catch (error) {
      console.error('Failed to search manga:', error)
      return []
    }
  }

  const getStoredMangaById = (id: string): Manga | null => {
    return cachedData[id] || null
  }

  const getPopularManga = async (): Promise<Manga[]> => {
    return fetchMangaData('popular')
  }

  const getTopRatedManga = async (): Promise<Manga[]> => {
    return fetchMangaData('top-rated')
  }

  const getNewReleases = async (): Promise<Manga[]> => {
    return fetchMangaData('new-releases')
  }

  const fetchMangaData = async (type: string): Promise<Manga[]> => {
    const now = Date.now()
    const cacheKey = `${type}Timestamp`

    // Check cache based on type and timestamp
    if (
      cacheTimestamps[cacheKey] &&
      now - cacheTimestamps[cacheKey] < 10 * 60 * 1000
    ) {
      // Return cached data if the request was made recently
      if (type === 'popular') return popularManga
      if (type === 'top-rated') return topRatedManga
      if (type === 'new-releases') return newReleases
    }

    try {
      let endpoint = `${base_url}/manga?`

      switch (type) {
        case 'popular':
          endpoint += 'order_by=popularity&sort=desc'
          break
        case 'top-rated':
          endpoint += 'order_by=score&sort=desc'
          break
        case 'new-releases':
          endpoint += 'order_by=start_date&sort=desc'
          break
        default:
          return []
      }

      const response = await axios.get<MangaApiResponse>(endpoint)
      const data = response.data.data

      // Set the appropriate state and cache the data
      if (type === 'popular') {
        setPopularManga(data)
      } else if (type === 'top-rated') {
        setTopRatedManga(data)
      } else if (type === 'new-releases') {
        setNewReleases(data)
      }

      data.forEach((manga) => {
        setCachedData((prev) => ({ ...prev, [manga.mal_id]: manga }))
      })

      // Update the cache timestamp
      setCacheTimestamps((prev) => ({ ...prev, [cacheKey]: now }))

      return data
    } catch (error) {
      // Check for 429 status code and retry
      if (axios.isAxiosError(error) && error.response?.status === 429) {
        console.error('Too Many Requests, retrying in 30 seconds...')
        await new Promise((resolve) => setTimeout(resolve, 30000)) // Wait 30 seconds
        return fetchMangaData(type) // Retry the request
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
        getTopRatedManga,
        getNewReleases,
      }}
    >
      {children}
    </MangaContext.Provider>
  )
}
