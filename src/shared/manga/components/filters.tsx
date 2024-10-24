import { MangaFiltersProps } from '@/utils/interfaces'

export default function Filters({ sortBy, clearFilters, selectedDemographic, selectedGenres, selectedStatus, setSortBy, toggleGenre, toggleStatus, toggleDemographics }: MangaFiltersProps) {
  const genres = [
    { name: 'Action', id: '391b0423-d847-456f-aff0-8b0cfc03066b' },
    { name: 'Adventure', id: '87cc87cd-a395-47af-b27a-93258283ef6c' },
    { name: 'Comedy', id: '4d32cc48-9f00-4cca-9b5a-a839f0764984' },
    { name: 'Drama', id: 'b9af3a63-f058-46de-a9a0-e0c13906197a' },
    { name: 'Fantasy', id: 'cdc58593-87dd-415e-bbc0-2ec27bf404cc' },
    { name: 'Horror', id: '39730448-9a5f-48a2-85b0-a70db87b1233' },
    { name: 'Mystery', id: '07251805-a27e-4d59-b488-f0bfbec15168' },
    { name: 'Romance', id: '423e2eae-a7a2-4a8b-ac03-a8351462d71d' },
    { name: 'Sci-Fi', id: '256c8bd9-4904-4360-bf4f-508a76d67183' },
    { name: 'Slice of Life', id: 'e5301a23-ebd9-49dd-a0cb-2add944c7fe9' },
  ]

  const statuses = ['ongoing', 'completed', 'hiatus', 'cancelled']

  const demographics = [
    { name: 'Shounen', id: 'e5ba7043-03e8-4475-bde2-6ab592c0538f' },
    { name: 'Shoujo', id: 'a3c67850-4684-404e-9b7f-c69850ee5da6' },
    { name: 'Seinen', id: 'f8f62932-27da-4fe4-8ee1-6779a8c5edba' },
    { name: 'Josei', id: 'a6c63c4c-4f34-4ba4-9496-f4ad4c03a03a' },
    { name: 'None', id: 'none' },
  ]

  return (
    <div className="space-y-4">
      <div>
        <h3 className="font-semibold mb-2">Genres</h3>
        <div className="grid grid-cols-2 gap-2">
          {genres.map((genre) => (
            <button
              key={genre.id}
              onClick={() => toggleGenre(genre.id)}
              className={`px-3 py-1 rounded-full text-sm ${
                selectedGenres.includes(genre.id)
                  ? 'bg-blue-600 text-white'
                  : 'bg-background-light'
              }`}
            >
              {genre.name}
            </button>
          ))}
        </div>
      </div>
      <div>
        <h3 className="font-semibold mb-2">Status</h3>
        <div className="grid grid-cols-2 gap-2">
          {statuses.map((status) => (
            <button
              key={status}
              onClick={() => toggleStatus(status)}
              className={`px-3 py-1 rounded-full text-sm ${
                selectedStatus.includes(status)
                  ? 'bg-blue-600 text-white'
                  : 'bg-background-light'
              }`}
            >
              {status.charAt(0).toUpperCase() + status.slice(1)}
            </button>
          ))}
        </div>
      </div>
      <div>
        <h3 className="font-semibold mb-2">Demographic</h3>
        <div className="grid grid-cols-2 gap-2">
          {demographics.map((demographic) => (
            <button
              key={demographic.id}
              onClick={() => toggleDemographics(demographic.id)}
              className={`px-3 py-1 rounded-full text-sm ${
                selectedDemographic.includes(demographic.id)
                  ? 'bg-blue-600 text-white'
                  : 'bg-background-light'
              }`}
            >
              {demographic.name}
            </button>
          ))}
        </div>
      </div>
      <div>
        <h3 className="font-semibold mb-2">Sort By</h3>
        <select
          value={sortBy}
          onChange={(e) => setSortBy(e.target.value)}
          className="w-full bg-background-light text-text px-3 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          <option value="relevance">Relevance</option>
          <option value="latestUploadedChapter">Latest</option>
          <option value="followedCount">Popularity</option>
          <option value="rating">Rating</option>
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
