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
  fetchMangaList: () => Promise<Manga[]>
  searchManga: (query: string) => Promise<Manga[]>
  getPopularManga: () => Promise<Manga[]>
  getNewReleases: () => Promise<Manga[]>
  getTopRatedManga: () => Promise<Manga[]>
}

export const MangaContext = createContext<MangaContextProps | undefined>(
  undefined
)

export const MangaProvider = ({ children }: ContextProviderProps) => {
  const [cachedData, setCachedData] = useState<Record<string, Manga>>({})

  useEffect(() => {
    const storedData = localStorage.getItem('mangaCache')
    if (storedData) {
      setCachedData(JSON.parse(storedData))
    }
  }, [])

  useEffect(() => {
    localStorage.setItem('mangaCache', JSON.stringify(cachedData))
  }, [cachedData])

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
    try {
      const response = await axios.get<MangaApiResponse>(`${base_url}/manga`)
      const mangaList = response.data.data
      mangaList.forEach((manga) => {
        setCachedData((prev) => ({ ...prev, [manga.mal_id]: manga }))
      })
      return mangaList
    } catch (error) {
      console.error('Failed to fetch manga list: ', error)
      return []
    }
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

  const getPopularManga = async (): Promise<Manga[]> => {
    try {
      const response = await axios.get<MangaApiResponse>(
        `${base_url}/manga?order_by=popularity&sort=desc`
      )
      const popularManga = response.data.data
      popularManga.forEach((manga) => {
        setCachedData((prev) => ({ ...prev, [manga.mal_id]: manga }))
      })
      return popularManga
    } catch (error) {
      console.error('Failed to fetch popular manga: ', error)
      return []
    }
  }

  // Function to get new releases
  const getNewReleases = async (): Promise<Manga[]> => {
    try {
      const response = await axios.get<MangaApiResponse>(
        `${base_url}/manga?order_by=start_date&sort=desc`
      )
      const newReleases = response.data.data
      newReleases.forEach((manga) => {
        setCachedData((prev) => ({ ...prev, [manga.mal_id]: manga }))
      })
      return newReleases
    } catch (error) {
      console.error('Failed to fetch new releases: ', error)
      return []
    }
  }

  // Function to get top-rated manga
  const getTopRatedManga = async (): Promise<Manga[]> => {
    try {
      const response = await axios.get<MangaApiResponse>(
        `${base_url}/manga?order_by=score&sort=desc`
      )
      const topRatedManga = response.data.data
      topRatedManga.forEach((manga) => {
        setCachedData((prev) => ({ ...prev, [manga.mal_id]: manga }))
      })
      return topRatedManga
    } catch (error) {
      console.error('Failed to fetch top-rated manga: ', error)
      return []
    }
  }

  return (
    <MangaContext.Provider
      value={{
        getMangaById: fetchMangaById,
        fetchMangaList,
        searchManga,
        getPopularManga,
        getNewReleases,
        getTopRatedManga,
      }}
    >
      {children}
    </MangaContext.Provider>
  )
}
