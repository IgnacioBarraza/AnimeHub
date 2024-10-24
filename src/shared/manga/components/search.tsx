import { SearchBarProps } from '@/utils/propsInterface'
import { Search } from 'lucide-react'

export default function SearchBar({searchQuery, setSearchQuery}: SearchBarProps) {
  return (
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
  )
}
