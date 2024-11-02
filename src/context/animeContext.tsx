import axios from 'axios'
import { createContext, useState, useEffect } from 'react'
import { ContextProviderProps } from '@/utils/propsInterface'
import { AniListAnimeData, GenreResponse, statusMap, ValidAnimeStatus, ValidAnimeTypes, validTypes } from '@/utils/interfaces'

const anilist_base_url = 'https://graphql.anilist.co'

const CACHE_EXPIRY = 60 * 60 * 1000

interface AnimeContextProps {
  getAnimeById: (id: number) => Promise<AniListAnimeData | null>
  searchAnime: (
    searchQuery: string,
    selectedGenres: string[],
    status: ValidAnimeStatus,
    selectedType: ValidAnimeTypes[]
  ) => Promise<AniListAnimeData[]>
  getPopularAnime: () => Promise<AniListAnimeData[]>
  getNewAnimeReleases: () => Promise<AniListAnimeData[]>
  getTopRatedAnime: () => Promise<AniListAnimeData[]>
  getAnimeGenres: () => Promise<GenreResponse | null>
}

export const AnimeContext = createContext<AnimeContextProps | undefined>(undefined)

export const AnimeProvider = ({ children }: ContextProviderProps) => {
  const [cachedData, setCachedData] = useState<Record<string, AniListAnimeData | AniListAnimeData[]>>({})
  const [genreCachedData, setGenreCachedData] = useState<Record<string, GenreResponse | GenreResponse[]>>({})
  const [cacheTimestamps, setCacheTimestamps] = useState<Record<string, number>>({})

  // Load cache data from localStorage on component mount
  useEffect(() => {
    const storedData = localStorage.getItem('animeCache')
    const storedGenresData = localStorage.getItem('genreCache')
    const storedTimestamps = localStorage.getItem('animeCacheTimestamps')
    if (storedData) setCachedData(JSON.parse(storedData))
    if (storedGenresData) setGenreCachedData(JSON.parse(storedGenresData))
    if (storedTimestamps) setCacheTimestamps(JSON.parse(storedTimestamps))
  }, [])

  // Save cache data to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem('animeCache', JSON.stringify(cachedData))
    localStorage.setItem('genreCache', JSON.stringify(genreCachedData))
    localStorage.setItem('animeCacheTimestamps', JSON.stringify(cacheTimestamps))
  }, [cachedData, cacheTimestamps, genreCachedData])

  const fetchFromAniList = async (query: string, cacheKey: string): Promise<AniListAnimeData[]> => {
    const now = Date.now()

    // Check if data is in cache and still valid
    if (cachedData[cacheKey] && (now - cacheTimestamps[cacheKey]) < CACHE_EXPIRY) {
      return cachedData[cacheKey] as AniListAnimeData[]
    }

    try {
      const response = await axios.post(anilist_base_url, { query }, { headers: { 'Content-Type': 'application/json' }})
      const data = response.data.data.Page.media as AniListAnimeData[]
      setCachedData((prev) => ({ ...prev, [cacheKey]: data }))
      setCacheTimestamps((prev) => ({ ...prev, [cacheKey]: now }))
      return data
    } catch (error) {
      console.error('Failed to fetch from AniList:', error)
      return []
    }
  }

  const getAnimeById = async (id: number): Promise<AniListAnimeData | null> => {
    const cacheKey = `anime_${id}`

    // Return from cache if valid
    if (cachedData[cacheKey] && (Date.now() - cacheTimestamps[cacheKey]) < CACHE_EXPIRY) {
      return cachedData[cacheKey] as AniListAnimeData
    }

    const query = `
      query ($id: Int) {
        Media(id: $id, type: ANIME) {
          id
          title { romaji english native }
          description
          trailer { id site thumbnail }
          streamingEpisodes { title thumbnail url site }
          characters(role: MAIN) {
            edges {
              node { id name { full } image { large } }
              voiceActors(language: JAPANESE) { id name { full } image { large } }
            }
          }
          coverImage { large extraLarge }
          airingSchedule { nodes { id airingAt episode } }
          externalLinks { url site icon }
          startDate { year month day }
          bannerImage
          genres
          averageScore
          status
          episodes
        }
      }
    `

    try {
      const response = await axios.post(anilist_base_url, { query, variables: { id } }, { headers: { 'Content-Type': 'application/json' }})
      const anime = response.data.data.Media as AniListAnimeData
      setCachedData((prev) => ({ ...prev, [cacheKey]: anime }))
      setCacheTimestamps((prev) => ({ ...prev, [cacheKey]: Date.now() }))
      return anime
    } catch (error) {
      console.error('Failed to fetch anime by ID:', error)
      return null
    }
  }

  const searchAnime = async (
    searchQuery: string,
    selectedGenres: string[],
    status: ValidAnimeStatus,
    selectedType: ValidAnimeTypes[]
  ): Promise<AniListAnimeData[]> => {
    const genresFilter = selectedGenres.length > 0 ? `genre_in: [${selectedGenres.map(genre => `"${genre}"`).join(', ')}]` : ''
    const statusFilter = statusMap[status] ? `status: ${statusMap[status]}` : ''
    const formatFilter = selectedType.length > 0 ? `format_in: [${selectedType.map(type => `${validTypes[type]}`).join(', ')}]` : ''

    const query = `
      query {
        Page(page: 1, perPage: 15) {
          media(type: ANIME, search: "${searchQuery}", ${genresFilter}, ${statusFilter}, ${formatFilter}) {
            id
            title { romaji english }
            coverImage { large extraLarge }
            averageScore
            episodes
            genres
            status
            description
          }
        }
      }
    `

    const cacheKey = `search_${searchQuery}_${selectedGenres.join(',')}_${status}_${selectedType.join(',')}`
    return await fetchFromAniList(query, cacheKey)
  }

  const getPopularAnime = async (): Promise<AniListAnimeData[]> => {
    const cacheKey = 'popularAnime'
    const query = `
      query {
        Page(page: 1, perPage: 15) {
          media(type: ANIME, sort: POPULARITY_DESC) {
            id
            title { romaji english }
            coverImage { large extraLarge }
            averageScore
            episodes
            genres
            status
          }
        }
      }
    `
    return await fetchFromAniList(query, cacheKey)
  }

  const getNewAnimeReleases = async (): Promise<AniListAnimeData[]> => {
    const cacheKey = 'newAnimeReleases'
    const query = `
      query {
        Page(page: 1, perPage: 15) {
          media(type: ANIME, sort: START_DATE_DESC) {
            id
            title { romaji english }
            coverImage { large extraLarge }
            averageScore
            episodes
            genres
            status
          }
        }
      }
    `
    return await fetchFromAniList(query, cacheKey)
  }

  const getTopRatedAnime = async (): Promise<AniListAnimeData[]> => {
    const cacheKey = 'topRatedAnime'
    const query = `
      query {
        Page(page: 1, perPage: 15) {
          media(type: ANIME, sort: SCORE_DESC) {
            id
            title { romaji english }
            coverImage { large extraLarge }
            averageScore
            episodes
            genres
            status
          }
        }
      }
    `
    return await fetchFromAniList(query, cacheKey)
  }

  const getAnimeGenres = async (): Promise<GenreResponse | null> => {
    const cacheKey = 'animeGenres'
    if (genreCachedData[cacheKey] && (Date.now() - cacheTimestamps[cacheKey]) < CACHE_EXPIRY) {
      return genreCachedData[cacheKey] as GenreResponse
    }

    const query = `
      query {
        GenreCollection
      }
    `

    try {
      const response = await axios.post(anilist_base_url, { query }, { headers: { 'Content-Type': 'application/json' }})
      const genres = response.data.data.GenreCollection as GenreResponse
      setGenreCachedData((prev) => ({ ...prev, [cacheKey]: genres }))
      setCacheTimestamps((prev) => ({ ...prev, [cacheKey]: Date.now() }))
      return genres
    } catch (error) {
      console.error('Failed to fetch genres:', error)
      return null
    }
  }

  return (
    <AnimeContext.Provider value={{
      getAnimeById,
      searchAnime,
      getPopularAnime,
      getNewAnimeReleases,
      getTopRatedAnime,
      getAnimeGenres
    }}>
      {children}
    </AnimeContext.Provider>
  )
}
