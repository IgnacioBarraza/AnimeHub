import { CardContent, CardHeader } from '@/components/ui/card'
import { ScrollArea } from '@/components/ui/scroll-area'
import { Skeleton } from '@/components/ui/skeleton'
import { AniListAnimeData, Genre, ValidAnimeStatus, ValidAnimeTypes } from '@/utils/interfaces'
import { AlertCircle, ChevronDown, Filter } from 'lucide-react'
import { useEffect, useState } from 'react'
import Filters from './components/filters'
import SearchBar from '@/components/searchBar/searchBar'
import AnimeResults from './components/animeResults'
import { useAnimeContext } from '@/hooks/animeHook'
import { useLocation } from 'react-router-dom'

export default function Anime() {
  const [searchQuery, setSearchQuery] = useState('')
  const [animeResults, setAnimeResults] = useState<AniListAnimeData[]>([])
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [selectedGenres, setSelectedGenres] = useState<string[]>([])
  const [selectedType, setSelectedType] = useState<ValidAnimeTypes[]>([])
  const [status, setStatus] = useState<ValidAnimeStatus>('RELEASING')
  const [genres, setGenres] = useState<Genre[]>([])
  const [isFilterOpen, setIsFilterOpen] = useState(false)
  const { searchAnime, getAnimeGenres } = useAnimeContext()
  const location = useLocation()

  const searchAnimeQuery = async () => {
    // Clear results if the search query is empty
    if (!searchQuery.trim()) {
      setAnimeResults([])
      return
    }

    setIsLoading(true)
    setError(null)

    try {
      const response = await searchAnime(
        searchQuery,
        selectedGenres,
        status,
        selectedType
      )
      setAnimeResults(response)
    } catch (err) {
      console.error(err)
      setError('Failed to fetch anime data. Please try again later.')
    } finally {
      setIsLoading(false)
    }
  }

  useEffect(() => {
    const delayDebounceFn = setTimeout(() => {
      if (searchQuery) {
        searchAnimeQuery()
      } else {
        // Clear results immediately when searchQuery is empty
        setAnimeResults([])
      }
    }, 500)

    return () => clearTimeout(delayDebounceFn)
  }, [searchQuery, selectedGenres, status, selectedType])

  useEffect(() => {
    const queryParams = new URLSearchParams()
    if (searchQuery) {
      queryParams.set('search', searchQuery)
    }
    if (selectedGenres.length) {
      queryParams.set('genres', selectedGenres.join(','))
    }
    if (selectedType.length) {
      queryParams.set('type', selectedType.join(','))
    }
    if (status) {
      queryParams.set('status', status)
    }

    const newUrl = `${window.location.pathname}?${queryParams.toString()}`

    window.history.replaceState(null, '', newUrl)
    localStorage.setItem('prevLocation', encodeURIComponent(newUrl))
  }, [searchQuery, selectedGenres, status, selectedType])

  useEffect(() => {
    const urlParams = new URLSearchParams(location.search)
    const search = urlParams.get('search') || ''
    const genres = urlParams.get('genres')?.split(',') || []
    const type = (urlParams.get('type')?.split(',') || []) as ValidAnimeTypes[]
    const status = (urlParams.get('status') || 'RELEASING') as ValidAnimeStatus

    setSearchQuery(search)
    setSelectedGenres(genres)
    setSelectedType(type)
    setStatus(status)

    if (search) {
      searchAnimeQuery()
    }
  }, [])

  const toggleGenre = (genreId: string) => {
    setSelectedGenres((prev) =>
      prev.includes(genreId)
        ? prev.filter((id) => id !== genreId)
        : [...prev, genreId]
    )
  }

  useEffect(() => {
    if (genres.length === 0) {
      fetchGenres()
    }
  }, [])

  const fetchGenres = async () => {
    const response = await getAnimeGenres()
    if (response) {
      const fetchedGenres = response
      if (Array.isArray(fetchedGenres)) {
        const genreObjects: Genre[] = fetchedGenres.map((genre, index) => ({
          id: index + 1,
          name: genre,
        }))
        setGenres(genreObjects)
      }
    }
  }

  const toggleType = (type: ValidAnimeTypes) => {
    setSelectedType((prev) =>
      prev.includes(type) ? prev.filter((s) => s !== type) : [...prev, type]
    )
  }

  const clearFilters = () => {
    setSelectedGenres([])
    setSelectedType([])
    setStatus('RELEASING')
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">Anime Search</h1>
      <div className="flex flex-col md:flex-row gap-6">
        <div className="md:w-1/3">
          <div className="bg-background-lighter p-6 rounded-lg shadow-lg">
            <SearchBar
              searchQuery={searchQuery}
              setSearchQuery={setSearchQuery}
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
                selectedGenres={selectedGenres}
                selectedType={selectedType}
                status={status}
                clearFilters={clearFilters}
                toggleGenre={toggleGenre}
                toggleType={toggleType}
                setStatus={setStatus}
                genres={genres}
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
              ) : animeResults.length > 0 && searchQuery.length > 1 ? (
                animeResults.map((anime) => (
                  <AnimeResults
                    anime={anime}
                    searchQuery={searchQuery}
                    key={anime.id}
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
