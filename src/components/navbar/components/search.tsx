import { Search } from 'lucide-react'

export default function SearchComponent() {
  return (
    <div className="relative">
      <input
        type="search"
        placeholder="Search manga..."
        className="bg-background-light text-text pl-10 pr-4 py-2 rounded-full focus:outline-none focus:ring-2 focus:ring-blue-500"
      />
      <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
    </div>
  )
}
