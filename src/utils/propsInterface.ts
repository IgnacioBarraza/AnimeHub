import { ReactNode, RefObject } from 'react'
import { AniListAnimeData, Genre, MangaDexData, RouteConfig, ValidAnimeStatus, ValidAnimeTypes } from './interfaces'
import { Location } from 'react-router-dom'


export interface ProtectedRouteProps {
  roles?: string[]
  children?: ReactNode
}

export interface RouterProps {
  routes: RouteConfig[]
}

export interface ContextProviderProps {
  children: ReactNode;
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

export interface MobileNavProps {
  isProfileDropdownOpen: boolean
  toggleProfileDropdown: () => void
  dropdownRef: RefObject<HTMLDivElement>
  isLoggedIn: boolean
  setIsLoggedIn: (logged: boolean) => void
  closeMenu: () => void
}

export interface LastChaptersProps {
  mangaDexId: string
}

export interface MangaInfoProps {
  manga: MangaDexData
  mangaDexId: string | null
}

export interface PaginationProps {
  currentPage: number
  totalPages: number
  onPageChange: (page: number) => void
}

export interface SkeletonLoaderProps {
  title: string
}

export interface RegisterStepsProps {
  email: string
  password: string
}

export interface RegisterProps {
  onSubmit: (email: string, password: string) => void
}

export interface MangaResultProps {
  manga: MangaDexData
  searchQuery: string
}

export interface MangaFiltersProps {
  selectedGenres: string[]
  selectedStatus: string[]
  selectedDemographic: string[]
  sortBy: string
  clearFilters: () => void
  toggleGenre: (id: string) => void
  toggleStatus: (status: string) => void
  toggleDemographics: (id: string) => void
  setSortBy: (sortBy: string) => void
}

export interface SearchBarProps {
  searchQuery: string
  setSearchQuery: (query: string) => void
  isAnimeOrMangaSearch: string
}

export interface AnimeFiltersProps {
  selectedGenres: string[]
  selectedType: ValidAnimeTypes[]
  status: ValidAnimeStatus
  clearFilters: () => void
  toggleGenre: (genre: string) => void
  toggleType: (type: ValidAnimeTypes) => void
  setStatus: (status: ValidAnimeStatus) => void
  genres: Genre[]
}

export interface AnimeResultProps {
  anime: AniListAnimeData
  searchQuery: string
}

export interface AnimeInfoProps {
  anime: AniListAnimeData
}