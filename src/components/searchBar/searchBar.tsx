import { SearchBarProps } from '@/utils/propsInterface'
import { Search, X } from 'lucide-react'

export default function SearchBar({ searchQuery, setSearchQuery, isAnimeOrMangaSearch }: SearchBarProps) {
  const clearSearch = () => {
    setSearchQuery('')
  }
  return (
    <div className="relative mb-4">
      <input
        type="text"
        placeholder={`Search for ${isAnimeOrMangaSearch}...`}
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        className="w-full bg-background-light text-text px-4 py-2 pr-10 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
      />
      {searchQuery ? <button onClick={() => clearSearch()}><X className="absolute right-3 top-1/2 transform -translate-y-1/2 text-text"/></button> : <Search className="absolute right-3 top-1/2 transform -translate-y-1/2 text-text" />}
    </div>
  )
}
