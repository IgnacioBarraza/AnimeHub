import { useTheme } from '@/hooks/themeHook'
import { Moon, Search, Sun, User } from 'lucide-react'
import { useEffect, useRef, useState } from 'react'

export default function Navbar() {
  const [isProfileDropdownOpen, setIsProfileDropdownOpen] = useState(false)
  const dropdownRef = useRef(null)
  const { theme, toggleTheme } = useTheme()

  useEffect(() => {
    function handleClickOutside(event) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsProfileDropdownOpen(false)
      }
    }

    document.addEventListener('mousedown', handleClickOutside)
    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [])

  return (
    <header className="bg-background-lighter py-4 sticky top-0 z-10">
      <div className="container mx-auto px-4 flex items-center justify-between">
        <a href="/" className="text-2xl font-bold flex items-center">
          <svg
            className="w-8 h-8 mr-2 top-2/4"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M7 4v16M17 4v16M3 8h4m10 0h4M3 12h18M3 16h4m10 0h4M4 20h16a1 1 0 001-1V5a1 1 0 00-1-1H4a1 1 0 00-1 1v14a1 1 0 001 1z"
            />
          </svg>
          Anime Hub
        </a>
        <nav className="hidden md:flex space-x-4">
          <a className="hover:text-gray-300" href="/">
            Home
          </a>
          <a className="hover:text-gray-300" href="/recommendations">
            Recommendations
          </a>
          <a className="hover:text-gray-300" href="/anime-news">
            Anime News
          </a>
          <a className="hover:text-gray-300" href="/manga-news">
            Manga News
          </a>
          <a className="hover:text-gray-300" href="/help">
            Help
          </a>
        </nav>
        <div className="flex items-center space-x-4">
          <div className="relative">
            <input
              type="search"
              placeholder="Search manga..."
              className="bg-[#2A2A2A] text-white pl-10 pr-4 py-2 rounded-full focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <Search className="absolute left-3 hrefp-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
          </div>
          <div className="relative" ref={dropdownRef}>
            <button
              onClick={() => setIsProfileDropdownOpen(!isProfileDropdownOpen)}
              className="flex items-center focus:outline-none"
            >
              <User className="w-6 h-6" />
            </button>
            {isProfileDropdownOpen && (
              <div className="absolute right-0 mt-2 w-48 bg-background-light rounded-md shadow-lg py-1">
                <button
                    onClick={toggleTheme}
                    className="w-full text-left px-4 py-2 text-sm hover:bg-background-lighter flex items-center"
                  >
                    {theme === 'dark' ? (
                      <>
                        <Sun className="w-4 h-4 mr-2" />
                        Light Theme
                      </>
                    ) : (
                      <>
                        <Moon className="w-4 h-4 mr-2" />
                        Dark Theme
                      </>
                    )}
                  </button>
                <a
                  href="/account"
                  className="block px-4 py-2 text-sm hover:bg-[#3A3A3A]"
                >
                  My Account
                </a>
                <a
                  href="/settings"
                  className="block px-4 py-2 text-sm hover:bg-[#3A3A3A]"
                >
                  Settings
                </a>
                <a
                  href="/logout"
                  className="block px-4 py-2 text-sm hover:bg-[#3A3A3A]"
                >
                  Log Out
                </a>
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  )
}
