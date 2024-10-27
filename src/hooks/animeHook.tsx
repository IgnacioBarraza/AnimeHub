import { AnimeContext } from '@/context/animeContext'
import { useContext } from 'react'

export const useAnimeContext = () => {
  const context = useContext(AnimeContext)
  if (!context) {
    throw new Error('useAnimeContext must be used within a AnimeProvider')
  }
  return context
}
