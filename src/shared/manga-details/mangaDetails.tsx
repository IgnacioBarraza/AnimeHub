import {
  ChevronLeft,
  ChevronRight,
  Star,
} from 'lucide-react'
import { useEffect, useRef, useState } from 'react'
import { useSearchParams } from 'react-router-dom'
import { useMangaContext } from '@/hooks/mangaHook'
import { MangaDexData } from '@/utils/interfaces'
import { MangaInfo } from './components/mangaInfo'

export default function MangaDetails() {
  const [searchParams] = useSearchParams()
  const [scrollPosition, setScrollPosition] = useState(0)
  const [manga, setManga] = useState<MangaDexData | null>(null)
  const { getStoredMangaById, getMangaDexIdByTitle } = useMangaContext()
  const sliderRef = useRef<HTMLDivElement | null>(null)
  const id = searchParams.get('id')

  useEffect(() => {
    const fetchManga = async () => {
      if (id) {
        const storedManga = getStoredMangaById(id)
        if (storedManga) setManga(storedManga)
      }
    }
    fetchManga()
  }, [id, getStoredMangaById, getMangaDexIdByTitle])

  const scroll = (direction: 'left' | 'right') => {
    if (sliderRef.current) {
      const scrollAmount = direction === 'left' ? -200 : 200
      sliderRef.current.scrollBy({ left: scrollAmount, behavior: 'smooth' })
      setScrollPosition(sliderRef.current.scrollLeft + scrollAmount)
    }
  }

  return (
    <div className="container mx-auto px-4 py-8">
      {manga ? (
        <MangaInfo manga={manga} mangaDexId={manga.id}/>
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
