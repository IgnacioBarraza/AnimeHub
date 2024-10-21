import { Menu, User, X } from 'lucide-react'
import { useEffect, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import { NavItem } from './components/navItem'
import { ThemeButton } from './components/themeButton'
import AnimeHubLogo from './components/logo'
import SearchComponent from './components/search'
import { useLocationContext } from '@/hooks/locationHook'
import MobileNav from './components/mobileNav'

export default function Navbar() {
  const [isProfileDropdownOpen, setIsProfileDropdownOpen] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const dropdownRef = useRef<HTMLDivElement>(null)
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const { location } = useLocationContext()

  const isLoginOrNotFound =
    location.pathname === '/login' || location.pathname === '/not-found'

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen)
  }

  const closeMobileMenu = () => {
    setIsMobileMenuOpen(false)
  }

  const toggleProfileDropdown = () => {
    setIsProfileDropdownOpen(!isProfileDropdownOpen)
  }

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

  return (
    <header className="bg-background-lighter py-4 sticky top-0 z-10">
      <div className="container mx-auto px-4 flex items-center justify-between">
        <Link to="/" className="text-2xl font-bold flex items-center">
          <AnimeHubLogo className="w-8 h-8 mr-2" />
          Otaku Oasis
        </Link>

        {!isLoginOrNotFound && (
          <>
            <nav className="hidden md:flex space-x-4">
              <NavItem href="/home">Home</NavItem>
              <NavItem href="/manga">Manga</NavItem>
              <NavItem href="/anime-news">Anime News</NavItem>
              <NavItem href="/manga-news">Manga News</NavItem>
              <NavItem href="/help">Help</NavItem>
              <NavItem href="/credits">Credits</NavItem>
            </nav>

            <div className="hidden md:flex items-center space-x-4">
              <SearchComponent />
              <div className="relative" ref={dropdownRef}>
                <button
                  onClick={toggleProfileDropdown}
                  className="flex items-center focus:outline-none"
                >
                  <User className="w-6 h-6" />
                </button>
                {isProfileDropdownOpen && (
                  <div className="absolute right-0 mt-2 w-48 bg-background-light rounded-md shadow-lg py-1">
                    {isLoggedIn ? (
                      <>
                        <Link
                          to="/account"
                          className="block px-4 py-2 text-sm hover:bg-background-lighter"
                        >
                          My Account
                        </Link>
                        <Link
                          to="/settings"
                          className="block px-4 py-2 text-sm hover:bg-background-lighter"
                        >
                          Settings
                        </Link>
                        <button
                          onClick={() => setIsLoggedIn(false)}
                          className="w-full text-left px-4 py-2 text-sm hover:bg-background-lighter"
                        >
                          Log Out
                        </button>
                      </>
                    ) : (
                      <>
                        <Link
                          to="/login"
                          onClick={toggleProfileDropdown}
                          className="block px-4 py-2 text-sm hover:bg-background-lighter"
                        >
                          Login
                        </Link>
                      </>
                    )}

                    <ThemeButton onClick={toggleProfileDropdown}/>
                  </div>
                )}
              </div>
            </div>

            <button className="md:hidden" onClick={toggleMobileMenu}>
              {isMobileMenuOpen ? (
                <X className="w-6 h-6 text-foreground" />
              ) : (
                <Menu className="w-6 h-6 text-foreground" />
              )}
            </button>
          </>
        )}
      </div>

      {isMobileMenuOpen && (
        <MobileNav
          isProfileDropdownOpen={isProfileDropdownOpen}
          toggleProfileDropdown={toggleProfileDropdown}
          dropdownRef={dropdownRef}
          isLoggedIn={isLoggedIn}
          setIsLoggedIn={() => {}}
          closeMenu={closeMobileMenu} 
        />
      )}
    </header>
  )
}
