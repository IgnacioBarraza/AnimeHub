import { MangaDexData } from '@/utils/interfaces' // Import Manga interface
import { ChevronLeft, ChevronRight, Clock } from 'lucide-react'
import { useRef, useState } from 'react'
import { useNavigate } from 'react-router-dom'

export default function MangaSeriesScroll({
  title,
  series,
}: {
  title: string
  series: MangaDexData[]
}) {
  const [scrollPosition, setScrollPosition] = useState(0)
  const navigate = useNavigate()
  const sliderRef = useRef<HTMLDivElement | null>(null)

  const scroll = (direction: 'left' | 'right') => {
    if (sliderRef.current) {
      const scrollAmount = direction === 'left' ? -200 : 200
      sliderRef.current.scrollBy({ left: scrollAmount, behavior: 'smooth' })
      setScrollPosition(sliderRef.current.scrollLeft + scrollAmount)
    }
  }

  const goToMangaDetail = (id: string) => {
    navigate(`manga-details?id=${id}`)
  }

  return (
    <div className="relative mb-8">
      <h2 className="text-2xl font-bold mb-4 text-foreground">{title}</h2>
      <div className="relative overflow-hidden">
        <div
          ref={sliderRef}
          className="flex space-x-4 overflow-x-auto scrollbar-hide"
          style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
        >
          {series.map((item) => {
            const coverArt = item.relationships.find(
              (rel) => rel.type === 'cover_art'
            )?.attributes?.fileName

            return (
              <div key={item.id} className="flex-none w-48">
                <button
                  className="relative h-64 w-full mb-2"
                  onClick={() => goToMangaDetail(item.id)}
                >
                  <img
                    src={
                      coverArt
                        ? `https://uploads.mangadex.org/covers/${item.id}/${coverArt}`
                        : '/placeholder.svg' // Fallback in case coverArt is undefined
                    }
                    alt={`${item.attributes.title.en || item.attributes.title['ja-ro']} Manga Cover`}
                    className="w-full h-full rounded"
                  />
                </button>
                <h3 className="font-semibold text-foreground">
                  {item.attributes.title.en || item.attributes.title['ja-ro']}
                </h3>
                <div className="flex items-center">
                  <Clock className="w-4 h-4 mr-1" />
                  <span className="text-sm text-muted-foreground">
                    {item.attributes.status}
                  </span>
                </div>
                <div className="text-xs text-muted-foreground mt-1">
                  {item.attributes.tags
                    .slice(0, 3) // Limit to the first 3 tags
                    .map((genre) => genre.attributes.name.en)
                    .join(', ')}
                </div>
              </div>
            )
          })}
        </div>
      </div>
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
  )
}
