import { MangaContext } from '@/context/mangaContext'
import { useContext } from 'react'

export const useMangaContext = () => {
  const context = useContext(MangaContext)
  if (!context) {
    throw new Error('useMangaContext must be used within a MangaProvider')
  }
  return context
}
