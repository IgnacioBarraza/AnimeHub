  import axios from 'axios'
  import { createContext, useState, useEffect } from 'react'
  import { ContextProviderProps } from '@/utils/propsInterface'
  import { AniListAnimeData } from '@/utils/interfaces'

  const anilist_base_url = 'https://graphql.anilist.co'

  interface AnimeContextProps {
    getAnimeById: (id: number) => Promise<AniListAnimeData | null>
    searchAnime: (
      searchQuery: string,
      selectedGenres: number[],
      status: string,
      selectedType: string[]
    ) => Promise<AniListAnimeData[]>
    getPopularAnime: () => Promise<AniListAnimeData[]>
    getNewAnimeReleases: () => Promise<AniListAnimeData[]>
    getTopRatedAnime: () => Promise<AniListAnimeData[]>
  }

  export const AnimeContext = createContext<AnimeContextProps | undefined>(
    undefined
  )

  export const AnimeProvider = ({ children }: ContextProviderProps) => {
    const [cachedData, setCachedData] = useState<Record<string, AniListAnimeData>>({})

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

    const getAnimeById = async (id: number): Promise<AniListAnimeData | null> => {
      if (cachedData[id]) return cachedData[id]
    
      const query = `
        query ($id: Int) {
          Media(id: $id, type: ANIME) {
            id
            title {
              romaji
              english
              native
            }
            description(asHtml: false)
            trailer {
              id
              site
              thumbnail
            }
            streamingEpisodes {
              title
              thumbnail
              url
              site
            }
            characters(role: MAIN) {
              edges {
                node {
                  id
                  name {
                    full
                  }
                  image {
                    large
                  }
                }
                voiceActors(language: JAPANESE) {
                  id
                  name {
                    full
                  }
                  image {
                    large
                  }
                }
              }
            }
            coverImage {
              large
              extraLarge
            }
            genres
            averageScore
            status
            episodes
          }
        }
      `
    
      try {
        const response = await axios.post(
          anilist_base_url,
          { query, variables: { id } },
          { headers: { 'Content-Type': 'application/json' } }
        )
        const anime = response.data.data.Media as AniListAnimeData
        setCachedData((prev) => ({ ...prev, [id]: anime }))
        return anime
      } catch (error) {
        console.error('Failed to fetch anime: ', error)
        return null
      }
    }    

    const searchAnime = async (
      searchQuery: string,
      selectedGenres: number[],
      status: string,
      selectedType: string[]
    ): Promise<AniListAnimeData[]> => {
      const genresFilter = selectedGenres.length > 0 ? `genre_in: [${selectedGenres.map(genre => `"${genre}"`).join(', ')}]` : ''
      const statusFilter = status !== 'all' ? `status: ${status.toUpperCase()}` : ''
      const formatFilter = selectedType.length > 0 ? `format_in: [${selectedType.map(type => `"${type.toUpperCase()}"`).join(', ')}]` : ''
    
      const query = `
        query {
          Page(page: 1, perPage: 15) {
            media(
              type: ANIME,
              isAdult: false,
              search: "${searchQuery}",
              ${genresFilter},
              ${statusFilter},
              ${formatFilter}
            ) {
              id
              title { romaji english }
              coverImage { large }
              averageScore
              episodes
              genres
              status
            }
          }
        }
      `
    
      try {
        const response = await axios.post(
          anilist_base_url,
          { query },
          { headers: { 'Content-Type': 'application/json' } }
        )
        const searchResults = response.data.data.Page.media as AniListAnimeData[]
        searchResults.forEach((anime) => {
          setCachedData((prev) => ({ ...prev, [anime.id]: anime }))
        })
        return searchResults
      } catch (error) {
        console.error('Failed to fetch anime:', error)
        return []
      }
    }
    

    const fetchFromAniList = async (query: string): Promise<AniListAnimeData[]> => {
      try {
        const response = await axios.post(
          anilist_base_url,
          { query },
          { headers: { 'Content-Type': 'application/json' } }
        )
        return response.data.data.Page.media as AniListAnimeData[]
      } catch (error) {
        console.error('Failed to fetch from AniList:', error)
        return []
      }
    }

    const getPopularAnime = async (): Promise<AniListAnimeData[]> => {
      const query = `
        query {
          Page(page: 1, perPage: 15) {
            media(type: ANIME, sort: POPULARITY_DESC, isAdult: false) {
              id
              title { romaji english }
              coverImage { large }
              averageScore
              episodes
              genres
              status
            }
          }
        }
      `
      return await fetchFromAniList(query)
    }

    const getNewAnimeReleases = async (): Promise<AniListAnimeData[]> => {
      const query = `
        query {
          Page(page: 1, perPage: 15) {
            media(type: ANIME, sort: START_DATE_DESC, status: RELEASING, isAdult: false) {
              id
              title { romaji english }
              coverImage { large }
              averageScore
              episodes
              genres
              status
            }
          }
        }
      `
      return await fetchFromAniList(query)
    }

    const getTopRatedAnime = async (): Promise<AniListAnimeData[]> => {
      const query = `
        query {
          Page(page: 1, perPage: 15) {
            media(type: ANIME, sort: SCORE_DESC, isAdult: false) {
              id
              title { romaji english }
              coverImage { large }
              averageScore
              episodes
              genres
              status
            }
          }
        }
      `
      return await fetchFromAniList(query)
    }

    return (
      <AnimeContext.Provider
        value={{
          searchAnime,
          getAnimeById,
          getPopularAnime,
          getNewAnimeReleases,
          getTopRatedAnime,
        }}
      >
        {children}
      </AnimeContext.Provider>
    )
  }
