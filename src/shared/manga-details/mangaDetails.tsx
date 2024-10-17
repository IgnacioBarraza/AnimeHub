import {
  BookOpen,
  Calendar,
  ChevronLeft,
  ChevronRight,
  Clock,
  Star,
} from 'lucide-react'
import { useEffect, useRef, useState } from 'react'
import { Link, useSearchParams } from 'react-router-dom'
import { LastChapters } from './components/lastChapters'
import { useMangaContext } from '@/hooks/mangaHook'
import { Manga } from '@/utils/interfaces'
import '@/App.css'

export default function MangaDetails() {
  const [searchParams] = useSearchParams()
  const [scrollPosition, setScrollPosition] = useState(0)
  const [manga, setManga] = useState<Manga | null>(null)
  const [mangaDexId, setMangaDexId] = useState<string | null>(null)
  const { getStoredMangaById, getMangaDexIdByTitle } = useMangaContext()
  const sliderRef = useRef<HTMLDivElement | null>(null)
  const id = searchParams.get('id')

  useEffect(() => {
    const fetchManga = async () => {
      if (id) {
        const storedManga = getStoredMangaById(id)
        if (storedManga) {
          // Await the MangaDex ID retrieval
          const fetchedMangaDexId = await getMangaDexIdByTitle(
            storedManga.title
          )
          if (fetchedMangaDexId) {
            setMangaDexId(fetchedMangaDexId)
          }
          setManga(storedManga)
        }
      }
    }

    fetchManga() // Call the async function
  }, [id, getStoredMangaById, getMangaDexIdByTitle])

  const scroll = (direction: 'left' | 'right') => {
    if (sliderRef.current) {
      const scrollAmount = direction === 'left' ? -200 : 200
      sliderRef.current.scrollBy({ left: scrollAmount, behavior: 'smooth' })
      setScrollPosition(sliderRef.current.scrollLeft + scrollAmount)
    }
  }

  const extractYear = (dateString: string) => {
    const date = new Date(dateString)
    return date.getFullYear()
  }

  return (
    <div className="container mx-auto px-4 py-8">
      {manga ? (
        <div className="flex flex-col md:flex-row gap-8 mx-auto">
          <div className="md:w-1/3">
            <img
              src={manga.images.webp.large_image_url}
              alt={`${manga.title} Manga Cover`}
              className="w-full rounded-lg shadow-lg"
            />
            <div className="mt-4 flex justify-between items-center">
              {mangaDexId && (
                <Link
                  to={`https://mangadex.org/title/${mangaDexId}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-blue-600 text-white px-4 py-2 rounded-full hover:bg-blue-700 transition duration-300"
                >
                  Read Now
                </Link>
              )}
              {manga.score && (
                <div className="flex items-center">
                  <Star className="w-5 h-5 text-yellow-400 mr-1" />
                  <span className="font-bold">{manga.score}</span>
                </div>
              )}
            </div>
          </div>
          <div className="md:w-2/3">
            <h1 className="text-4xl font-bold mb-4">{manga.title}</h1>
            <p className="text-text-muted mb-4">{manga.synopsis}</p>
            <div className="grid grid-cols-2 gap-4 mb-6">
              {manga.chapters && (
                <div className="flex items-center">
                  <BookOpen className="w-5 h-5 mr-2" />
                  <span>{`${manga.chapters} chapters`}</span>
                </div>
              )}
              <div className="flex items-center">
                <Clock className="w-5 h-5 mr-2" />
                <span>{manga.status}</span>
              </div>
              <div className="flex items-center">
                <Calendar className="w-5 h-5 mr-2" />
                <span>
                  <span>{`${extractYear(manga.published.from)} - ${
                    manga.published.to
                      ? extractYear(manga.published.to)
                      : 'Present'
                  }`}</span>
                </span>
              </div>
              <div className="flex items-center">
                <span className="font-semibold mr-2">Genre:</span>
                <span>
                  {manga.genres.map((genre) => genre.name).join(', ')}
                </span>
              </div>
            </div>
            {mangaDexId && <LastChapters mangaDexId={mangaDexId} />}
          </div>
        </div>
      ) : (
        <div className="text-center mt-8">
          <h2 className="text-2xl font-bold">Manga Not Found</h2>
        </div>
      )}
      <div className="relative mt-12">
        <h2 className="text-2xl font-bold mb-4">Similar Manga</h2>
        <div
          ref={sliderRef}
          className="flex space-x-4 overflow-x-auto scrollbar-hide"
          style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
        >
          {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12].map((i) => (
            <div key={i} className="flex-none w-48">
              <button className="relative h-64 w-full mb-2">
                <img
                  src="/placeholder.svg"
                  alt=""
                  className="w-full h-full object-cover rounded-md"
                />
              </button>
              <h3 className="font-semibold text-foreground">Manga {i}</h3>
              <div className="flex items-center">
                <Star className="w-4 h-4 text-yellow-400 mr-1" />
                <span className="text-sm text-muted-foreground">8.{i}</span>
              </div>
              <div className="text-xs text-muted-foreground mt-1">
                Action, Adventure
              </div>
            </div>
          ))}
          <button
            onClick={() => scroll('left')}
            className="absolute left-0 top-1/2 transform -translate-y-1/2 bg-background-light p-2 rounded-full shadow-md"
            style={{ display: scrollPosition > 0 ? 'block' : 'none' }}
          >
            <ChevronLeft className="w-6 h-6 text-foreground" />
          </button>
          <button
            onClick={() => scroll('right')}
            className="absolute right-0 top-1/2 transform -translate-y-1/2 bg-background-light p-2 rounded-full shadow-md"
          >
            <ChevronRight className="w-6 h-6 text-foreground" />
          </button>
        </div>
      </div>
    </div>
  )
}
