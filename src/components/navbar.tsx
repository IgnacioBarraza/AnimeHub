import { Moon, Search, Sun, User } from 'lucide-react'
import { useEffect, useRef, useState } from 'react'
import { useTheme } from '@/hooks/themeHook'
import { Link, useLocation } from 'react-router-dom'

export default function Navbar() {
  const [isProfileDropdownOpen, setIsProfileDropdownOpen] = useState(false)
  const dropdownRef = useRef<HTMLDivElement>(null)
  const { theme, toggleTheme } = useTheme()
  const location = useLocation()

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsProfileDropdownOpen(false)
      }
    }

    document.addEventListener('mousedown', handleClickOutside)
    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [])

  const isActive = (path: string) => location.pathname === path

  return (
    <header className="bg-background-lighter py-4 sticky top-0 z-10">
      <div className="container mx-auto px-4 flex items-center justify-between">
        <Link to="/" className="text-2xl font-bold flex items-center">
          <svg
            className="w-8 h-8 mr-2"
            version="1.1"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 75 75"
          >
            <path
              d="M0 0 C0.66 0.33 1.32 0.66 2 1 C2.21192221 6.19209404 1.5912689 10.126739 0 15 C0.99 14.938125 1.98 14.87625 3 14.8125 C8.52439071 14.82368298 13.01740143 16.80121947 17.6875 19.625 C23.10405076 25.18794403 25.3143639 30.10678103 25.375 37.9375 C25.20298879 43.59402242 25.20298879  43.59402242 24 46 C18.80790596 46.21192221 14.873261 45.5912689 10 44 C10.0928125 45.485 10.0928125 45.485 10.1875 47 C10.17631702 52.52439071 8.19878053 57.01740143 5.375 61.6875 C-0.18794403 67.10405076 -5.10678103 69.3143639 -12.9375 69.375 C-18.59402242 69.20298879 -18.59402242 69.20298879 -21 68 C-21.21192221 62.80790596 -20.5912689 58.873261 -19 54 C-19.99 54.061875 -20.98 54.12375 -22 54.1875 C-27.52439071 54.17631702 -32.01740143 52.19878053 -36.6875 49.375 C-42.10405076 43.81205597 -44.3143639 38.89321897 -44.375 31.0625 C-44.20298879 25.40597758 -44.20298879 25.40597758 -43 23 C-37.80790596 22.78807779 -33.873261 23.4087311 -29 25 C-29.061875 24.01 -29.12375 23.02 -29.1875 22 C-29.17631702 16.47560929 -27.19878053 11.98259857 -24.375 7.3125 C-17.07647361 0.20604009 -10.01996781 -1.00630954 0 0 Z M-18.25 12.1875 C-22.53913918 19.08075939 -22.17382402 25.25910644 -21 33 C-26.63281599 33.2396943 -31.54538831 32.38529821 -37 31 C-36.7109023 35.81829497 -35.94978031 39.11766887 -32.5625 42.70703125 C-27.57275065 46.83604884 -22.8219238 47.19384961 -16.5 46.6875 C-14.6645173 46.47623776 -12.83017252 46.25317387 -11 46 C-10.7603057 51.63281599 -11.61470179 56.54538831 -13 62 C-8.18170503 61.7109023 -4.88233113 60.94978031 -1.29296875 57.5625 C2.83604884 52.57275065 3.19384961 47.8219238 2.6875 41.5 C2.47623776 39.6645173 2.25317387 37.83017252 2 36 C7.63281599 35.7603057 12.54538831 36.61470179 18 38 C17.7109023 33.18170503 16.94978031 29.88233113 13.5625 26.29296875 C8.57275065 22.16395116 3.8219238 21.80615039 -2.5 22.3125 C-4.3354827 22.52376224 -6.16982748 22.74682613 -8 23 C-8.2396943 17.36718401 -7.38529821 12.45461169 -6 7 C-11.33498975 7 -14.42664399 8.47034833 -18.25 12.1875 Z"
              fill="currentColor"
              transform="translate(47,3)"
            />
            <path
              d="M0 0 C2.5 0.125 2.5 0.125 3.5 1.125 C3.625 3.625 3.625 3.625 3.5 6.125 C2.5 7.125 2.5 7.125 0 7.25 C-2.5 7.125 -2.5 7.125 -3.5 6.125 C-3.625 3.625 -3.625 3.625 -3.5 1.125 C-2.5 0.125 -2.5 0.125 0 0 Z"
              fill="currentColor"
              transform="translate(37.5,33.875)"
            />
          </svg>
          Anime Hub
        </Link>
        <nav className="hidden md:flex space-x-4">
          <Link
            to="/home"
            className={`hover:text-gray-300 relative ${
              isActive('/home') ? 'font-bold text-text' : ''
            }`}
          >
            Home
            {isActive('/home') && (
              <div className="absolute left-0 bottom-0 w-full h-1 bg-blue-500 rounded-full mt-1"></div>
            )}
          </Link>
          <Link
            to="/recommendations"
            className={`hover:text-gray-300 relative ${
              isActive('/recommendations') ? 'font-bold text-white' : ''
            }`}
          >
            Recommendations
            {isActive('/recommendations') && (
              <div className="absolute left-0 bottom-0 w-full h-1 bg-blue-500 rounded-full mt-1"></div>
            )}
          </Link>
          <Link
            to="/anime-news"
            className={`hover:text-gray-300 relative ${
              isActive('/anime-news') ? 'font-bold text-white' : ''
            }`}
          >
            Anime News
            {isActive('/anime-news') && (
              <div className="absolute left-0 bottom-0 w-full h-1 bg-blue-500 rounded-full mt-1"></div>
            )}
          </Link>
          <Link
            to="/manga-news"
            className={`hover:text-gray-300 relative ${
              isActive('/manga-news') ? 'font-bold text-white' : ''
            }`}
          >
            Manga News
            {isActive('/manga-news') && (
              <div className="absolute left-0 bottom-0 w-full h-1 bg-blue-500 rounded-full mt-1"></div>
            )}
          </Link>
          <Link
            to="/help"
            className={`hover:text-gray-300 relative ${
              isActive('/help') ? 'font-bold text-white' : ''
            }`}
          >
            Help
            {isActive('/help') && (
              <div className="absolute left-0 bottom-0 w-full h-1 bg-blue-500 rounded-full mt-1"></div>
            )}
          </Link>
        </nav>
        <div className="flex items-center space-x-4">
          <div className="relative">
            <input
              type="search"
              placeholder="Search manga..."
              className="bg-background-light text-text pl-10 pr-4 py-2 rounded-full focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
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
                <Link
                  to="/account"
                  className="block px-4 py-2 text-sm hover:bg-[#3A3A3A]"
                >
                  My Account
                </Link>
                <Link
                  to="/settings"
                  className="block px-4 py-2 text-sm hover:bg-[#3A3A3A]"
                >
                  Settings
                </Link>
                <Link
                  to="/logout"
                  className="block px-4 py-2 text-sm hover:bg-[#3A3A3A]"
                >
                  Log Out
                </Link>
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  )
}
