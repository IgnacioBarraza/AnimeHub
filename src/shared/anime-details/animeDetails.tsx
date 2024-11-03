import { SkeletonLoader } from '@/components/SkeletonLoader/skeletonLoader'
import { useAnimeContext } from '@/hooks/animeHook'
import { AniListAnimeData } from '@/utils/interfaces'
import { useEffect, useState } from 'react'
import { Link, useSearchParams } from 'react-router-dom'
import AnimeInfo from './components/animeInfo'

export default function AnimeDetails() {
  const [searchParams] = useSearchParams()
  const [anime, setAnime] = useState<AniListAnimeData | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const { getAnimeById } = useAnimeContext()
  const id = searchParams.get('id')

  useEffect(() => {
    const fetchAnime = async () => {
      setIsLoading(true)
      if (id) {
        const animeInfo = await getAnimeById(Number(id))
        if (animeInfo) {
          setAnime(animeInfo)
        }
      }
      setIsLoading(false)
    }
    fetchAnime()
  }, [id, getAnimeById])

  if (isLoading) {
    return (
      <div className="container mx-auto px-4 py-8">
        <SkeletonLoader />
      </div>
    )
  }

  if (!anime || id === null) {
    return (
      <div className="text-center mt-8">
        <h2 className="text-2xl font-bold mb-6">Anime Not Found</h2>
        <Link
          to="/anime"
          className="px-6 py-3 bg-primary text-white font-medium rounded-md hover:bg-primary/90"
        >
          Browse animes
        </Link>
      </div>
    )
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <AnimeInfo anime={anime} />
    </div>
  )
}
