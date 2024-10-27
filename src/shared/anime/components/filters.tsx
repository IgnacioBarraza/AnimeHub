import { Checkbox } from '@/components/ui/checkbox'
import { ScrollArea } from '@/components/ui/scroll-area'
import { Genre } from '@/utils/interfaces'
import { AnimeFiltersProps } from '@/utils/propsInterface'
import { useEffect, useState } from 'react'

export default function Filters({
  selectedGenres,
  selectedType,
  toggleGenre,
  setStatus,
  toggleType,
  status,
  rating,
  setRating,
  clearFilters,
}: AnimeFiltersProps) {
  const [genres, setGenres] = useState<Genre[]>([])
  const type = [
    { name: 'Tv', id: 'tv' },
    { name: 'Movie', id: 'movie' },
    { name: 'Ova', id: 'ova' },
    { name: 'Special', id: 'special' },
    { name: 'Ona', id: 'ona' },
    { name: 'Music', id: 'music' },
    { name: 'Cm', id: 'cm' },
    { name: 'Pv', id: 'pv' },
    { name: 'Tv Special', id: 'tv_special' },
  ]

  useEffect(() => {
    fetchGenres()
  }, [])

  const fetchGenres = async () => {
    try {
      const response = await fetch('https://api.jikan.moe/v4/genres/anime')
      const data = await response.json()
      setGenres(data.data)
    } catch (err) {
      console.error('Failed to fetch genres:', err)
    }
  }

  return (
    <div className="space-y-4">
      <div>
        <h3 className="font-semibold mb-2">Genres</h3>
        <ScrollArea className="h-[200px]">
          {genres.map((genre) => (
            <div
              key={genre.mal_id}
              className="flex items-center space-x-2 mb-2"
            >
              <Checkbox
                id={`genre-${genre.mal_id}`}
                checked={selectedGenres.includes(genre.mal_id)}
                onCheckedChange={() => toggleGenre(genre.mal_id)}
              />
              <label
                htmlFor={`genre-${genre.mal_id}`}
                className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
              >
                {genre.name}
              </label>
            </div>
          ))}
        </ScrollArea>
      </div>
      <div>
        <h3 className="font-semibold mb-2">Type</h3>
        <div className="grid grid-cols-2 gap-2">
          {type.map((type) => (
            <button
              key={type.id}
              onClick={() => toggleType(type.id)}
              className={`px-3 py-1 rounded-full text-sm ${
                selectedType.includes(type.id)
                  ? 'bg-blue-600 text-white'
                  : 'bg-background-light'
              }`}
            >
              {type.name}
            </button>
          ))}
        </div>
      </div>
      <div>
        <h3 className="font-semibold mb-2 text-text">Status</h3>
        <select
          value={status}
          onChange={(e) => setStatus(e.target.value)}
          className="w-full bg-background-light text-text px-3 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          <option value="all">All</option>
          <option value="airing">Airing</option>
          <option value="complete">Completed</option>
          <option value="upcoming">Upcoming</option>
        </select>
      </div>
      <div>
        <h3 className="font-semibold mb-2">Rating</h3>
        <select
          value={rating}
          onChange={(e) => setRating(e.target.value)}
          className="w-full bg-background-light text-text px-3 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          <option value="all">All</option>
          <option value="pg">PG - Children</option>
          <option value="pg13">PG-13 - Teens 13 or older</option>
          <option value="g">G - All Ages</option>
          <option value="r17">R - 17+ (violence & profanity)</option>
          <option value="r">R+ - Mild Nudity</option>
        </select>
      </div>
      <button
        onClick={clearFilters}
        className="w-full bg-red-600 text-white px-4 py-2 rounded-md hover:bg-red-700 transition duration-300"
      >
        Clear Filters
      </button>
    </div>
  )
}
