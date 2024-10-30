import { Checkbox } from '@/components/ui/checkbox'
import { ScrollArea } from '@/components/ui/scroll-area'
import { useAnimeContext } from '@/hooks/animeHook'
import { Genre, ValidAnimeStatus, ValidAnimeTypes } from '@/utils/interfaces'
import { AnimeFiltersProps } from '@/utils/propsInterface'
import { useEffect, useState } from 'react'

export default function Filters({
  selectedGenres,
  selectedType,
  toggleGenre,
  setStatus,
  toggleType,
  status,
  clearFilters,
}: AnimeFiltersProps) {
  const { getAnimeGenres } = useAnimeContext()
  const [genres, setGenres] = useState<Genre[]>([])

  const types: { name: string; id: ValidAnimeTypes }[] = [
    { name: 'TV', id: 'tv' },
    { name: 'Movie', id: 'movie' },
    { name: 'OVA', id: 'ova' },
    { name: 'Special', id: 'special' },
    { name: 'ONA', id: 'ona' },
    { name: 'Music', id: 'music' },
  ]

  // Updated statuses according to AniList API
  const statuses = [
    { name: 'Currently Airing', id: 'RELEASING' },
    { name: 'Finished Airing', id: 'FINISHED' },
    { name: 'Not Yet Aired', id: 'NOT_YET_RELEASED' },
    { name: 'Canceled', id: 'CANCELLED' },
  ]

  useEffect(() => {
    fetchGenres()
  }, [])

  const fetchGenres = async () => {
    const response = await getAnimeGenres()
    if (response) {
      const fetchedGenres = response.data.GenreCollection
      if (Array.isArray(fetchedGenres)) {
        const genreObjects: Genre[] = fetchedGenres.map((genre, index) => ({
          id: index,
          name: genre,
        }))
        setGenres(genreObjects)
      }
    }
  }

  return (
    <div className="space-y-4">
      <div>
        <h3 className="font-semibold mb-2">Genres</h3>
        <ScrollArea className="h-[200px]">
          {genres.map((genre) => (
            <div
              key={genre.id}
              className="flex items-center space-x-2 mb-2"
            >
              <Checkbox
                id={`genre-${genre.id}`}
                checked={selectedGenres.includes(genre.id)}
                onCheckedChange={() => toggleGenre(genre.id)}
              />
              <label
                htmlFor={`genre-${genre.id}`}
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
          {types.map((type) => (
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
          onChange={(e) => setStatus(e.target.value as ValidAnimeStatus)}
          className="w-full bg-background-light text-text px-3 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          {statuses.map((statusOption) => (
            <option key={statusOption.id} value={statusOption.id}>
              {statusOption.name}
            </option>
          ))}
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
