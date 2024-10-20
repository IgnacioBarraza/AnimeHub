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

// interfaces.ts
export interface Manga {
  id: string;
  title: string;
  rating: number;
  genresData: string[];
  imageUrl: string;
}

export interface Category {
  title: string;
  series: Manga[];
}

export interface MobileNavProps {
  isProfileDropdownOpen: boolean
  toggleProfileDropdown: () => void
  dropdownRef: RefObject<HTMLDivElement>
  isLoggedIn: boolean
  setIsLoggedIn: (logged: boolean) => void
  closeMenu: () => void
}

// Interface for images in different formats (jpg and webp)
interface ImageFormats {
  image_url: string;
  small_image_url: string;
  large_image_url: string;
}

// Interface for the "images" object in the response
interface Images {
  jpg: ImageFormats;
  webp: ImageFormats;
}

// Interface for each title entry in "titles" array
interface Title {
  type: string;
  title: string;
}

// Interface for "published" field
interface PublishedDates {
  day: number;
  month: number;
  year: number;
}

// Interface for "published" field containing from and to dates
interface Published {
  from: string;
  to: string;
  prop: {
    from: PublishedDates;
    to: PublishedDates;
  };
  string: string;
}

// Interface for the "authors" array
interface Author {
  mal_id: number;
  type: string;
  name: string;
  url: string;
}

// Interface for the "genres" array
interface Genre {
  mal_id: number;
  type: string;
  name: string;
  url: string;
}

// Main interface for the response
export interface Manga {
  mal_id: number;
  url: string;
  images: Images;
  titles: Title[];
  title: string;
  title_english: string;
  title_japanese: string;
  type: string;
  chapters: number;
  volumes: number;
  status: string;
  publishing: boolean;
  published: Published;
  score: number;
  scored_by: number;
  rank: number;
  popularity: number;
  members: number;
  favorites: number;
  synopsis: string;
  background: string;
  authors: Author[];
  genres: Genre[];
}

interface MangaAttributes {
  title: Record<string, string>
  altTitles: Record<string, string>[]
  description: Record<string, string>
  isLocked: boolean
  links: Record<string, string>
  originalLanguage: string
  lastVolume: string
  lastChapter: string
  publicationDemographic: string
  status: string
  year: number
  contentRating: string
  chapterNumbersResetOnNewVolume: boolean
  availableTranslatedLanguages: string[]
  latestUploadedChapter: string
  tags: MangaTag[]
  state: string
  version: number
  createdAt: string
  updatedAt: string
}

interface MangaTag {
  id: string
  type: string
  attributes: TagAttributes
  relationships: TagRelationship[]
}

interface TagAttributes {
  name: Record<string, string>
  description: Record<string, string>
  group: string
  version: number
}

interface TagRelationship {
  id: string
  type: string
  related: string
  attributes: Record<string, unknown>
}

interface MangaRelationship {
  id: string
  type: string
  related: string
  attributes: Record<string, unknown>
}

export interface MangaDexData {
  id: string
  type: string
  attributes: MangaAttributes
  relationships: MangaRelationship[]
}

export interface MangadexApiResponse {
  result: string
  response: string
  data: MangaDexData[]
  limit: number
  offset: number
  total: number
}

export interface LastChaptersProps {
  mangaDexId: string // Expecting MangaDex ID as a prop
}

interface ChapterAttributes {
  volume: string
  chapter: string
  title: string
  translatedLanguage: string
  externalUrl: string | null
  publishAt: string
  readableAt: string
  createdAt: string
  updatedAt: string
  pages: number
  version: number
}

export interface Chapter {
  id: string
  type: string
  attributes: ChapterAttributes
  relationships: Array<{
    id: string
    type: string
  }>
}

export interface LastChaptersResponse {
  result: string
  response: string
  data: Chapter[] // Array of chapters
  limit: number
  offset: number
  total: number
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