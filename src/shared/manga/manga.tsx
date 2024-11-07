import { useMangaContext } from '@/hooks/mangaHook'
import { MangaDexData } from '@/utils/interfaces'
import { AlertCircle, ChevronDown, Filter } from 'lucide-react'
import { useEffect, useState } from 'react'
import MangaResult from './components/mangaResult'
import Filters from './components/filters'
import SearchBar from '@/components/searchBar/searchBar'
import { useLocation } from 'react-router-dom'
import { ScrollArea } from '@/components/ui/scroll-area'
import { CardContent, CardHeader } from '@/components/ui/card'
import { Skeleton } from '@/components/ui/skeleton'

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
  const location = useLocation()

  const toggleGenre = (genreId: string) => {
    setSelectedGenres((prev) =>
      prev.includes(genreId)
        ? prev.filter((g) => g !== genreId)
        : [...prev, genreId]
    )
  }

  const toggleStatus = (status: string) => {
    setSelectedStatus((prev) =>
      prev.includes(status)
        ? prev.filter((s) => s !== status)
        : [...prev, status]
    )
  }

  const toggleDemographic = (demographicId: string) => {
    setSelectedDemographic((prev) =>
      prev.includes(demographicId)
        ? prev.filter((d) => d !== demographicId)
        : [...prev, demographicId]
    )
  }

  const clearFilters = () => {
    setSelectedGenres([])
    setSelectedStatus([])
    setSelectedDemographic([])
    setSortBy('relevance')
  }

  useEffect(() => {
    const delayDebounceFn = setTimeout(() => {
      if (searchQuery) {
        searchMangaQuery()
      } else {
        setSearchResults([])
      }
    }, 500)

    return () => clearTimeout(delayDebounceFn)
  }, [searchQuery, selectedGenres, selectedStatus, selectedDemographic, sortBy])

  useEffect(() => {
    const queryParams = new URLSearchParams()
    if (searchQuery) {
      queryParams.set('search', searchQuery)
    }
    if (selectedGenres.length) {
      queryParams.set('genres', selectedGenres.join(','))
    }
    if (selectedStatus.length) {
      queryParams.set('status', selectedStatus.join(','))
    }
    if (selectedDemographic.length) {
      queryParams.set('demographic', selectedDemographic.join(','))
    }
    if (sortBy) {
      queryParams.set('sort', sortBy)
    }

    const newUrl = `${window.location.pathname}?${queryParams.toString()}`

    // Store the URL as a plain string in localStorage
    window.history.replaceState(null, '', newUrl)
    localStorage.setItem('prevLocation', encodeURIComponent(newUrl))
  }, [searchQuery, selectedGenres, selectedStatus, selectedDemographic, sortBy])

  useEffect(() => {
    const urlParams = new URLSearchParams(location.search)
    const search = urlParams.get('search') || ''
    const genres = urlParams.get('genres')?.split(',') || []
    const status = urlParams.get('status')?.split(',') || []
    const demographic = urlParams.get('demographic')?.split(',') || []
    const sort = urlParams.get('sort') || 'relevance'

    setSearchQuery(search)
    setSelectedGenres(genres)
    setSelectedStatus(status)
    setSelectedDemographic(demographic)
    setSortBy(sort)

    if (search) {
      searchMangaQuery()
    }
  }, [])

  const searchMangaQuery = async () => {
    setIsLoading(true)
    setError(null)
    try {
      const response = await searchManga(
        searchQuery,
        selectedGenres,
        selectedStatus,
        selectedDemographic,
        sortBy
      )
      setSearchResults(response)
    } catch (err) {
      console.error(err)
      setError('An error occurred while fetching data. Please try again.')
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className='container mx-auto px-4 py-8'>
      <h1 className="text-3xl font-bold mb-6">Search Manga</h1>
      <div className="flex flex-col md:flex-row gap-6">
        <div className="md:w-1/3">
          <div className="bg-background-lighter p-6 rounded-lg shadow-lg">
            <SearchBar
              searchQuery={searchQuery}
              setSearchQuery={setSearchQuery}
              isAnimeOrMangaSearch='a manga'
            />
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
          <ScrollArea className="h-[610px]">
            <div className="grid grid-cols-1 sm:grid-cols-3 lg:grid-cols-4 gap-4">
              {isLoading ? (
                Array(3)
                  .fill(0)
                  .map((_, index) => (
                    <div
                      key={index}
                      className="bg-background-light rounded-md mb-4"
                    >
                      <CardHeader>
                        <Skeleton className="h-4 w-[250px]" />
                        <Skeleton className="h-4 w-[200px]" />
                      </CardHeader>
                      <CardContent>
                        <Skeleton className="h-[100px] w-full" />
                      </CardContent>
                    </div>
                  ))
              ) : error ? (
                <div className="text-red-500 flex items-center">
                  <AlertCircle className="mr-2" />
                  {error}
                </div>
              ) : searchResults.length > 0 && searchQuery.length > 1 ? (
                searchResults.map((manga) => (
                  <MangaResult
                    manga={manga}
                    key={manga.id}
                    searchQuery={searchQuery}
                  />
                ))
              ) : (
                <p className="text-center text-muted-foreground">
                  No results found. Try adjusting your search or filters.
                </p>
              )}
            </div>
          </ScrollArea>
        </div>
      </div>
    </div>
  )
}
