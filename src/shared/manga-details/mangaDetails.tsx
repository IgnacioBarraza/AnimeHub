import {
  BookOpen,
  Calendar,
  ChevronLeft,
  ChevronRight,
  Clock,
  Star,
} from 'lucide-react'
import { useRef, useState } from 'react'
import { useSearchParams } from 'react-router-dom'
import { LastChapters } from './components/lastChapters'
import { categoriesDummy, Category, Manga } from '@/utils/interfaces' // Adjust the import based on your file structure

export default function MangaDetails() {
  const [searchParams] = useSearchParams()
  const [scrollPosition, setScrollPosition] = useState(0)
  const sliderRef = useRef<HTMLDivElement | null>(null)
  const id = searchParams.get('id')

  const scroll = (direction: 'left' | 'right') => {
    if (sliderRef.current) {
      const scrollAmount = direction === 'left' ? -200 : 200
      sliderRef.current.scrollBy({ left: scrollAmount, behavior: 'smooth' })
      setScrollPosition(sliderRef.current.scrollLeft + scrollAmount)
    }
  }

  const findMangaById = (
    mangaData: Category[],
    id: string | null
  ): Manga | null => {
    if (!id) return null // Return null if id is not provided

    // Iterate through the data structure to find the manga by id
    for (const category of mangaData) {
      const manga = category.series.find((manga) => manga.id === id)
      if (manga) return manga // Return the found manga
    }

    return null // Return null if not found
  }

  const manga = findMangaById(categoriesDummy, id)
  console.log(manga)

  return (
    <div className="container mx-auto px-4 py-8">
      {manga ? (
        <div className="flex flex-col md:flex-row gap-8 mx-auto">
          <div className="md:w-1/3">
            <img
              src={manga.imageUrl}
              alt={`${manga.title} Manga Cover`}
              width={300}
              height={450}
              className="w-full rounded-lg shadow-lg"
            />
            <div className="mt-4 flex justify-between items-center">
              <button className="bg-blue-600 text-white px-4 py-2 rounded-full hover:bg-blue-700 transition duration-300">
                Read Now
              </button>
              <div className="flex items-center">
                <Star className="w-5 h-5 text-yellow-400 mr-1" />
                <span className="font-bold">{manga.rating}</span>
              </div>
            </div>
          </div>
          <div className="md:w-2/3">
            <h1 className="text-4xl font-bold mb-4">{manga.title}</h1>
            <p className="text-text-muted mb-4">
              {`Follow the adventures of ${manga.title}...`}{' '}
              {/* Update this description as needed */}
            </p>
            <div className="grid grid-cols-2 gap-4 mb-6">
              <div className="flex items-center">
                <BookOpen className="w-5 h-5 mr-2" />
                <span>{`${manga.genres.length} chapters`}</span>
              </div>
              <div className="flex items-center">
                <Clock className="w-5 h-5 mr-2" />
                <span>Ongoing</span>
              </div>
              <div className="flex items-center">
                <Calendar className="w-5 h-5 mr-2" />
                <span>1997 - Present</span>
              </div>
              <div className="flex items-center">
                <span className="font-semibold mr-2">Genre:</span>
                <span>{manga.genres.join(', ')}</span> {/* Display genres */}
              </div>
            </div>
            <LastChapters />
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
