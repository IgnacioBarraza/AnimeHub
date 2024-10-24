import { ChevronDown } from 'lucide-react'
import { Link } from 'react-router-dom'
import { MobileNavProps } from '@/utils/propsInterface'
import { NavItem } from './navItem'
import { ThemeButton } from './themeButton'

export default function MobileNav({
  isProfileDropdownOpen,
  toggleProfileDropdown,
  dropdownRef,
  isLoggedIn,
  setIsLoggedIn,
  closeMenu
}: MobileNavProps) {

  const handleLinkClick = () => {
    closeMenu()               // Closes the mobile nav
    if (isProfileDropdownOpen) {
      toggleProfileDropdown()  // Closes the profile dropdown if it's open
    }
  }

  return (
    <div className="md:hidden bg-background-lighter py-4">
      <div className="container mx-auto px-4">
        <nav className="flex flex-col space-y-4">
          <NavItem href="/home" onClick={handleLinkClick}>Home</NavItem>
          <NavItem href="/home/manga" onClick={handleLinkClick}>Manga</NavItem>
          <NavItem href="/home/anime-news" onClick={handleLinkClick}>Anime News</NavItem>
          <NavItem href="/home/manga-news" onClick={handleLinkClick}>Manga News</NavItem>
          <NavItem href="/help" onClick={handleLinkClick}>Help</NavItem>
          <NavItem href="/credits" onClick={handleLinkClick}>Credits</NavItem>

          <div className="relative" ref={dropdownRef}>
            <button
              onClick={toggleProfileDropdown}
              className="flex items-center justify-between w-full text-foreground hover:text-primary"
            >
              Profile
              <ChevronDown
                className={`w-4 h-4 transition-transform ${
                  isProfileDropdownOpen ? 'transform rotate-180' : ''
                }`}
              />
            </button>
            {isProfileDropdownOpen && (
              <div className="mt-2 py-2 w-full bg-background-light rounded-md shadow-lg">
                {isLoggedIn ? (
                      <>
                        <Link
                          to="/account"
                          onClick={handleLinkClick}
                          className="block px-4 py-2 text-sm hover:bg-background-lighter"
                        >
                          My Account
                        </Link>
                        <Link
                          to="/settings"
                          onClick={handleLinkClick}
                          className="block px-4 py-2 text-sm hover:bg-background-lighter"
                        >
                          Settings
                        </Link>
                        <button
                          onClick={() => {
                            setIsLoggedIn(false)
                            handleLinkClick()
                          }}
                          className="w-full text-left px-4 py-2 text-sm hover:bg-background-lighter"
                        >
                          Log Out
                        </button>
                      </>
                    ) : (
                      <>
                        <Link
                          to="/login"
                          onClick={handleLinkClick}
                          className="block px-4 py-2 text-sm hover:bg-background-lighter"
                        >
                          Login
                        </Link>
                      </>
                    )}
                <ThemeButton onClick={handleLinkClick}/>
              </div>
            )}
          </div>
        </nav>
      </div>
    </div>
  )
}
