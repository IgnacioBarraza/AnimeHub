import { ReactNode, RefObject } from 'react'
import { Location } from 'react-router-dom'

export interface ProtectedRouteProps {
  roles?: string[]
  children?: ReactNode
}

export interface RouteConfig {
  path: string
  component: ReactNode
  protection?: {
    roles: string[]
  }
  routes?: RouteConfig[] // For nested routes
}

export interface RouterProps {
  routes: RouteConfig[]
}

export interface ContextProviderProps {
  children: ReactNode; // Define the type for children
}

export interface LocationContextProps {
  location: Location
}

export interface NavItemProps {
  href: string
  children: ReactNode
  onClick?: () => void
}

export interface ThemeButtonProps {
  onClick: () => void
}

export type Series = {
  id: string
  title: string
  rating: number
  genres: string[]
  imageUrl: string
}

interface CategorySeries {
  id: string;
  title: string;
  rating: number;
  genres: string[];
  imageUrl: string;
}

export interface Category {
  title: string;
  series: CategorySeries[];
}

export interface MobileNavProps {
  isProfileDropdownOpen: boolean
  toggleProfileDropdown: () => void
  dropdownRef: RefObject<HTMLDivElement>
  isLoggedIn: boolean
  setIsLoggedIn: (logged: boolean) => void
  closeMenu: () => void
}

export const categoriesDummy: Category[] = [
  {
    title: 'Popular',
    series: [
      { id: '1', title: 'Jujutsu Kaisen', rating: 8.5, genres: ['Action', 'Supernatural', 'School'], imageUrl: '/placeholder.svg' },
      { id: '2', title: 'One Piece', rating: 9.2, genres: ['Action', 'Adventure', 'Fantasy'], imageUrl: '/placeholder.svg' },
      { id: '3', title: 'Kanojo mo kanojo', rating: 6.9, genres: ['Comedy', 'Romance', 'School'], imageUrl: '/placeholder.svg' },
      { id: '4', title: 'Dragon Ball', rating: 8.4, genres: ['Action', 'Comedy', 'Adventure'], imageUrl: '/placeholder.svg' },
      { id: '5', title: 'Shingeki no kyojin', rating: 8.6, genres: ['Action', 'Drama', 'Military'], imageUrl: '/placeholder.svg' },
      { id: '6', title: 'Shingeki no kyojin', rating: 8.6, genres: ['Action', 'Drama', 'Military'], imageUrl: '/placeholder.svg' },
      { id: '7', title: 'Shingeki no kyojin', rating: 8.6, genres: ['Action', 'Drama', 'Military'], imageUrl: '/placeholder.svg' },
      { id: '8', title: 'Shingeki no kyojin', rating: 8.6, genres: ['Action', 'Drama', 'Military'], imageUrl: '/placeholder.svg' },
      { id: '9', title: 'Shingeki no kyojin', rating: 8.6, genres: ['Action', 'Drama', 'Military'], imageUrl: '/placeholder.svg' },
      { id: '10', title: 'Shingeki no kyojin', rating: 8.6, genres: ['Action', 'Drama', 'Military'], imageUrl: '/placeholder.svg' },
      { id: '11', title: 'Shingeki no kyojin', rating: 8.6, genres: ['Action', 'Drama', 'Military'], imageUrl: '/placeholder.svg' },
    ]
  },
  {
    title: 'New Releases',
    series: [
      { id: '6', title: 'Demon Slayer', rating: 8.7, genres: ['Action', 'Supernatural'], imageUrl: '/placeholder.svg' },
      { id: '7', title: 'My Hero Academia', rating: 8.0, genres: ['Action', 'Superhero'], imageUrl: '/placeholder.svg' },
      { id: '8', title: 'Tokyo Revengers', rating: 8.1, genres: ['Action', 'Time Travel'], imageUrl: '/placeholder.svg' },
      { id: '9', title: 'Haikyuu!!', rating: 8.7, genres: ['Sports', 'Comedy'], imageUrl: '/placeholder.svg' },
      { id: '10', title: 'Black Clover', rating: 7.9, genres: ['Action', 'Fantasy'], imageUrl: '/placeholder.svg' },
    ]
  },
  {
    title: 'Top Rated',
    series: [
      { id: '11', title: 'Fullmetal Alchemist: Brotherhood', rating: 9.1, genres: ['Action', 'Adventure'], imageUrl: '/placeholder.svg' },
      { id: '12', title: 'Death Note', rating: 9.0, genres: ['Mystery', 'Psychological'], imageUrl: '/placeholder.svg' },
      { id: '13', title: 'Steins;Gate', rating: 9.1, genres: ['Sci-Fi', 'Thriller'], imageUrl: '/placeholder.svg' },
      { id: '14', title: 'Hunter x Hunter', rating: 9.1, genres: ['Action', 'Adventure'], imageUrl: '/placeholder.svg' },
      { id: '15', title: 'Gintama', rating: 8.9, genres: ['Action', 'Comedy'], imageUrl: '/placeholder.svg' },
    ]
  },
]