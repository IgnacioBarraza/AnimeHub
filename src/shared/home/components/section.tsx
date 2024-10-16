import { Series } from '@/utils/interfaces'
import { ChevronLeft, ChevronRight, Star } from 'lucide-react'
import { useRef, useState } from 'react'
import { useNavigate } from 'react-router-dom'

export default function SeriesScroll({
  title,
  series
}: {
  title: string
  series: Series[]
}) {
  const [scrollPosition, setScrollPosition] = useState(0)
  const navigate = useNavigate()
  // Create a ref for the slider
  const sliderRef = useRef<HTMLDivElement | null>(null)

  const scroll = (direction: 'left' | 'right') => {
    if (sliderRef.current) {
      const scrollAmount = direction === 'left' ? -200 : 200
      sliderRef.current.scrollBy({ left: scrollAmount, behavior: 'smooth' })
      setScrollPosition(sliderRef.current.scrollLeft + scrollAmount)
    }
  }

  const goToMangaDetail = (id: string) => {
    console.log(id)
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
          {series.map((item) => (
            <div key={item.id} className="flex-none w-48">
              <button className="relative h-64 w-full mb-2" onClick={() => goToMangaDetail(item.id)}>
                <img
                  src={item.imageUrl}
                  alt={item.title}
                  className="w-full h-full object-cover rounded-md"
                />
              </button>
              <h3 className="font-semibold text-foreground">{item.title}</h3>
              <div className="flex items-center">
                <Star className="w-4 h-4 text-yellow-400 mr-1" />
                <span className="text-sm text-muted-foreground">
                  {item.rating.toFixed(1)}
                </span>
              </div>
              <div className="text-xs text-muted-foreground mt-1">
                {item.genres.join(', ')}
              </div>
            </div>
          ))}
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
