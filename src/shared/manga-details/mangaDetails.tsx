import {
  BookOpen,
  Calendar,
  ChevronLeft,
  ChevronRight,
  Clock,
  Star,
} from 'lucide-react'
import { useRef, useState } from 'react'
import { Link, useSearchParams } from 'react-router-dom'

export default function MangaDetails() {
  const [searchParams] = useSearchParams()
  const [scrollPosition, setScrollPosition] = useState(0)
  // const navigate = useNavigate()
  // Create a ref for the slider
  const sliderRef = useRef<HTMLDivElement | null>(null)
  const id = searchParams.get('id')
  console.log(id)

  const scroll = (direction: 'left' | 'right') => {
    if (sliderRef.current) {
      const scrollAmount = direction === 'left' ? -200 : 200
      sliderRef.current.scrollBy({ left: scrollAmount, behavior: 'smooth' })
      setScrollPosition(sliderRef.current.scrollLeft + scrollAmount)
    }
  }
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex flex-col md:flex-row gap-8 mx-auto">
        <div className="md:w-1/3">
          <img
            src="/placeholder.svg"
            alt="One Piece Manga Cover"
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
              <span className="font-bold">9.2</span>
            </div>
          </div>
        </div>
        <div className="md:w-2/3">
          <h1 className="text-4xl font-bold mb-4">One Piece</h1>
          <p className="text-gray-300 mb-4">
            Follow the adventures of Monkey D. Luffy and his pirate crew in
            their search for the ultimate treasure, the One Piece.
          </p>
          <div className="grid grid-cols-2 gap-4 mb-6">
            <div className="flex items-center">
              <BookOpen className="w-5 h-5 mr-2" />
              <span>1000+ chapters</span>
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
              <span>Action, Adventure, Fantasy</span>
            </div>
          </div>
          <h2 className="text-2xl font-bold mb-2">Latest Chapters</h2>
          <ul className="space-y-2">
            <li className="bg-[#2A2A2A] p-3 rounded-lg flex justify-between items-center">
              <span>Chapter 1000: The New Era</span>
              <Link className="text-blue-400 hover:underline" to="#">
                Read
              </Link>
            </li>
            <li className="bg-[#2A2A2A] p-3 rounded-lg flex justify-between items-center">
              <span>Chapter 999: The Sake I Brewed to Drink with You</span>
              <Link className="text-blue-400 hover:underline" to="#">
                Read
              </Link>
            </li>
            <li className="bg-[#2A2A2A] p-3 rounded-lg flex justify-between items-center">
              <span>Chapter 998: Ruffian Meets Ruffian</span>
              <Link className="text-blue-400 hover:underline" to="#">
                Read
              </Link>
            </li>
          </ul>
        </div>
      </div>
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
