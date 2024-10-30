import { Link } from 'react-router-dom'
import { useTheme } from '@/hooks/themeHook'
import { useMangaContext } from '@/hooks/mangaHook'
import { useEffect, useState, Suspense, lazy } from 'react'
import { AniListAnimeData, MangaDexData } from '@/utils/interfaces'
import { SkeletonLoader } from './components/skeletonLoader'
import { useAnimeContext } from '@/hooks/animeHook'

const MangaSeriesScroll = lazy(() => import('./components/mangaSection'))
const AnimeSeriesScroll = lazy(() => import('./components/animeSection'))

export default function Home() {
  const { theme } = useTheme()
  const { getPopularManga, getNewReleases, getMoreFollowedManga } =
    useMangaContext()
  const { getNewAnimeReleases, getPopularAnime, getTopRatedAnime } = useAnimeContext()
  const [popularManga, setPopularManga] = useState<MangaDexData[]>([])
  const [newReleases, setNewReleases] = useState<MangaDexData[]>([])
  const [moreFollowed, setmoreFollowedManga] = useState<MangaDexData[]>([])
  const [newAnimeReleases, setNewAnimeReleases] = useState<AniListAnimeData[]>([])
  const [popularAnime, setPopularAnime] = useState<AniListAnimeData[]>([])
  const [mostRatedAnime, setMostRatedAnime] = useState<AniListAnimeData[]>([])
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    async function fetchManga() {
      setIsLoading(true)
      const popular = await getPopularManga()
      const newReleases = await getNewReleases()
      const moreFollowed = await getMoreFollowedManga()
      const newAnimeReleases = await getNewAnimeReleases()
      const popularAnime = await getPopularAnime()
      const ratedAnime = await getTopRatedAnime()

      setPopularManga(popular)
      setNewReleases(newReleases)
      setmoreFollowedManga(moreFollowed)
      setNewAnimeReleases(newAnimeReleases)
      setPopularAnime(popularAnime)
      setMostRatedAnime(ratedAnime)
      setIsLoading(false)
    }

    fetchManga()
  }, [getPopularManga, getNewReleases, getMoreFollowedManga, getNewAnimeReleases, getPopularAnime, getTopRatedAnime])

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
      {isLoading ? (
        <>
          <SkeletonLoader title="Popular Manga" />
          <SkeletonLoader title="Popular Anime" />
          <SkeletonLoader title="New Manga Releases" />
          <SkeletonLoader title="New Anime Releases" />
          <SkeletonLoader title="Most Followed Manga" />
          <SkeletonLoader title="Top Rated Anime" />
        </>
      ) : (
        <Suspense fallback={<SkeletonLoader title="Loading series..." />} >
          <MangaSeriesScroll title="Popular Manga" series={popularManga} />
          <AnimeSeriesScroll title="Popular Anime" series={popularAnime} />
          <MangaSeriesScroll title="New Manga Releases" series={newReleases} />
          <AnimeSeriesScroll title="New Anime Releases" series={newAnimeReleases} />
          <MangaSeriesScroll title="Most Followed Manga" series={moreFollowed} />
          <AnimeSeriesScroll title="Top Rated Anime" series={mostRatedAnime} />
        </Suspense>
      )}
    </div>
  )
}
