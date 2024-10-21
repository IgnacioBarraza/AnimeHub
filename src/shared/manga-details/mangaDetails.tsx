import { useEffect, useState } from 'react'
import { Link, useSearchParams } from 'react-router-dom'
import { useMangaContext } from '@/hooks/mangaHook'
import { MangaDexData } from '@/utils/interfaces'
import { MangaInfo } from './components/mangaInfo'
import { SkeletonLoader } from './components/skeletonLoader'

export default function MangaDetails() {
  const [searchParams] = useSearchParams()
  const [manga, setManga] = useState<MangaDexData | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const { getStoredMangaById, getMangaDexIdByTitle } = useMangaContext()
  const id = searchParams.get('id')

  useEffect(() => {
    const fetchManga = async () => {
      setIsLoading(true)
      if (id) {
        const storedManga = getStoredMangaById(id)
        if (storedManga) setManga(storedManga)
      }
      setIsLoading(false)
    }
    fetchManga()
  }, [id, getStoredMangaById, getMangaDexIdByTitle])

  if (isLoading) {
    return (
      <div className="container mx-auto px-4 py-8">
        <SkeletonLoader />
      </div>
    )
  }

  if (!manga || id === null) {
    return (
      <div className="text-center mt-8">
        <h2 className="text-2xl font-bold mb-6">Manga Not Found</h2>
        <Link
          to="/manga"
          className="px-6 py-3 bg-primary text-white font-medium rounded-md hover:bg-primary/90"
        >
          Browse manga
        </Link>
      </div>
    )
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <MangaInfo manga={manga} mangaDexId={manga.id} />
    </div>
  )
}
