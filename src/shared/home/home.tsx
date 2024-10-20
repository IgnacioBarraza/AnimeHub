import SeriesScroll from './components/section'
import { Link } from 'react-router-dom'
import { useTheme } from '@/hooks/themeHook'
import { useMangaContext } from '@/hooks/mangaHook'
import { useEffect, useState } from 'react'
import { MangaDexData } from '@/utils/interfaces'

export default function Home() {
  const { theme } = useTheme()
  const { getPopularManga, getNewReleases, getTopRatedManga } =
    useMangaContext()
  const [popularManga, setPopularManga] = useState<MangaDexData[]>([])
  const [newReleases, setNewReleases] = useState<MangaDexData[]>([])
  const [topRatedManga, setTopRatedManga] = useState<MangaDexData[]>([])

  useEffect(() => {
    async function fetchManga() {
      const popular = await getPopularManga()
      const newReleases = await getNewReleases()
      const topRated = await getTopRatedManga()

      setPopularManga(popular)
      setNewReleases(newReleases)
      setTopRatedManga(topRated)
    }

    fetchManga()
  }, [getPopularManga, getNewReleases, getTopRatedManga])

  return (
    <div className="w-10/12 mx-auto px-4 py-8">
      <section className="mb-12 flex flex-col md:flex-row items-center">
        <div className="flex-1 pr-0 md:pr-8 mb-6 md:mb-0">
          <h1 className="text-4xl font-bold mb-4">Discover new mangas</h1>
          <p className="text-xl text-muted-foreground mb-6">
            Explore a vast collection of captivating manga, from action-packed
            adventures to heartwarming romance dramas.
          </p>
          <Link
            to="/manga"
            className="px-6 py-3 bg-primary text-white font-medium rounded-md hover:bg-primary/90"
          >
            Browse manga
          </Link>
        </div>
        <div className="flex-1">
          <img
            src={
              theme === 'dark'
                ? '/home-placeholder.webp'
                : '/home-placeholder-light.webp'
            }
            alt="Anime character"
            className="w-full h-auto rounded-lg shadow-lg"
          />
        </div>
      </section>
      <SeriesScroll title="Popular Manga" series={popularManga} />
      <SeriesScroll title="New Releases" series={newReleases} />
      <SeriesScroll title="Top Rated" series={topRatedManga} />
    </div>
  )
}
