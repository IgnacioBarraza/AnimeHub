import { useMangaContext } from '@/hooks/mangaHook'
import { MangaDexData } from '@/utils/interfaces'
import { ChevronDown, Filter, Search } from 'lucide-react'
import { useEffect, useState } from 'react'
import MangaResult from './components/mangaResult'
import Filters from './components/filters'

export default function Manga() {
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedGenres, setSelectedGenres] = useState<string[]>([])
  const [selectedStatus, setSelectedStatus] = useState<string[]>([])
  const [selectedDemographic, setSelectedDemographic] = useState<string[]>([])
  const [sortBy, setSortBy] = useState<string>('relevance')
  const [isFilterOpen, setIsFilterOpen] = useState<boolean>(false)
  const [searchResults, setSearchResults] = useState<MangaDexData[]>([])
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const { searchManga } = useMangaContext()


  const toggleGenre = (genreId: string) => {
    setSelectedGenres(prev => 
      prev.includes(genreId) ? prev.filter(g => g !== genreId) : [...prev, genreId]
    )
  }

  const toggleStatus = (status: string) => {
    setSelectedStatus(prev => 
      prev.includes(status) ? prev.filter(s => s !== status) : [...prev, status]
    )
  }

  const toggleDemographic = (demographicId: string) => {
    setSelectedDemographic(prev => 
      prev.includes(demographicId) ? prev.filter(d => d !== demographicId) : [...prev, demographicId]
    )
  }

  const clearFilters = () => {
    setSelectedGenres([])
    setSelectedStatus([])
    setSelectedDemographic([])
    setSortBy('relevance')
  }

  useEffect(() => {
    if (searchQuery) {
      searchMangaQuery()
    }
  }, [searchQuery, selectedGenres, selectedStatus, selectedDemographic, sortBy])

  const searchMangaQuery = async () => {
    setIsLoading(true)
    setError(null)
    try {
      const response = await searchManga(searchQuery, selectedGenres, selectedStatus, selectedDemographic, sortBy)
      setSearchResults(response)
    } catch (err) {
      console.error(err)
      setError('An error occurred while fetching data. Please try again.')
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div>
      <h1 className="text-3xl font-bold mb-6">Search Manga</h1>
      <div className="flex flex-col md:flex-row gap-6">
        <div className="md:w-1/3">
          <div className="bg-background-lighter p-6 rounded-lg shadow-lg">
            <div className="relative mb-4">
              <input
                type="text"
                placeholder="Search manga..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full bg-background-light text-text px-4 py-2 pr-10 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <Search className="absolute right-3 top-1/2 transform -translate-y-1/2 text-text" />
            </div>
            <div className="mb-4">
              <button
                onClick={() => setIsFilterOpen(!isFilterOpen)}
                className="flex items-center justify-between w-full bg-background-light px-4 py-2 rounded-md"
              >
                <span className="flex items-center">
                  <Filter className="w-5 h-5 mr-2" />
                  Filters
                </span>
                <ChevronDown
                  className={`w-5 h-5 transition-transform ${
                    isFilterOpen ? 'transform rotate-180' : ''
                  }`}
                />
              </button>
            </div>
            {isFilterOpen && (
              <Filters 
                sortBy={sortBy} 
                clearFilters={clearFilters} 
                toggleDemographics={toggleDemographic}
                toggleGenre={toggleGenre}
                toggleStatus={toggleStatus}
                setSortBy={setSortBy}
                selectedDemographic={selectedDemographic}
                selectedGenres={selectedGenres}
                selectedStatus={selectedStatus}
                />
            )}
          </div>
        </div>
        <div className="md:w-2/3">
          <div className="bg-background-lighter p-6 rounded-lg shadow-lg">
            <h2 className="text-xl font-semibold mb-4">Search Results</h2>
            {isLoading && <p>Loading...</p>}
            {error && <p className="text-red-500">{error}</p>}
            {searchResults.map((manga) => (
              <MangaResult manga={manga} key={manga.id}/>
            ))}
            {searchResults.length === 0 && !isLoading && !error && (
              <p>No results found. Try adjusting your search or filters.</p>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
