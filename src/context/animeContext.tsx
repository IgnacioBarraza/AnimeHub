import axios from 'axios'
import { createContext, useState, useEffect } from 'react'
import { ContextProviderProps } from '@/utils/propsInterface'
import { AnimeData, JikanMoeApiResponse } from '@/utils/interfaces'

const jikan_base_url = 'https://api.jikan.moe/v4'

interface AnimeContextProps {
  getAnimeById: (id: number) => Promise<AnimeData | null>
  searchAnime: (
    searchQuery: string,
    selectedGenres: number[],
    status: string,
    rating: string,
    selectedType: string[]
  ) => Promise<AnimeData[]>
}

export const AnimeContext = createContext<AnimeContextProps | undefined>(
  undefined
)

export const AnimeProvider = ({ children }: ContextProviderProps) => {
  const [cachedData, setCachedData] = useState<Record<string, AnimeData>>({})

  const [cacheTimestamps, setCacheTimestamps] = useState<
    Record<string, number>
  >({})

  useEffect(() => {
    const storedData = localStorage.getItem('animeCache')
    const storedTimestamps = localStorage.getItem('animeCacheTimestamps')

    if (storedData) {
      setCachedData(JSON.parse(storedData))
    }
    if (storedTimestamps) {
      setCacheTimestamps(JSON.parse(storedTimestamps))
    }
  }, [])

  useEffect(() => {
    localStorage.setItem('animeCache', JSON.stringify(cachedData))
    localStorage.setItem(
      'animeCacheTimestamps',
      JSON.stringify(cacheTimestamps)
    )
  }, [cachedData, cacheTimestamps])

  const getAnimeById = async (id: number): Promise<AnimeData | null> => {
    if (cachedData[id]) return cachedData[id]

    try {
      const response = await axios.get<AnimeData>(
        `${jikan_base_url}/anime/${id}/full`
      )
      const anime = response.data
      setCachedData((prev) => ({ ...prev, [id]: anime }))
      return anime
    } catch (error) {
      console.error('Failed to fetch manga: ', error)
      return null
    }
  }

  const searchAnime = async (
    searchQuery: string,
    selectedGenres: number[],
    status: string,
    rating: string,
    selectedType: string[]
  ): Promise<AnimeData[]> => {
    try {
      let url = `${jikan_base_url}/anime?q=${encodeURIComponent(
        searchQuery
      )}&limit=10`

      if (selectedGenres.length > 0) {
        url += `&genres=${selectedGenres.join(',')}`
      }

      if (status !== 'all') {
        url += `&status=${status}`
      }

      if (rating !== 'all') {
        url += `&rating=${rating}`
      }

      if (selectedType.length > 0) {
        selectedType.forEach((type) => {
          url += `&type=${type}`
        })
      }

      const response = await axios.get<JikanMoeApiResponse>(url)
      const searchResults = response.data.data
      searchResults.forEach((anime) => {
        setCachedData((prev) => ({ ...prev, [anime.mal_id]: anime }))
      })
      return searchResults
    } catch (error) {
      console.error(error)
      return []
    }
  }

  return (
    <AnimeContext.Provider value={{ searchAnime, getAnimeById }}>
      {children}
    </AnimeContext.Provider>
  )
}
