import { ReactNode } from 'react'

export interface RouteConfig {
  path: string
  component: ReactNode
  protection?: {
    roles: string[]
  }
  routes?: RouteConfig[] // For nested routes
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

export interface RegisterFormData {
  email: string
  password: string
}

export interface RegisterStepsFormData extends RegisterFormData{
  nickname: string
  profilePicture: string | ArrayBuffer | null
  favoriteGenres: string[]
  languagePreference: string
}

export interface Genre {
  id: number
  name: string
}


export interface AniListAnimeData {
  id: number
  title: {
    romaji: string
    english?: string
    native: string
  }
  description?: string
  trailer?: {
    id: string
    site: string
    thumbnail?: string
  }
  streamingEpisodes?: {
    title: string
    thumbnail: string
    url: string
    site: string
  }[]
  characters: {
    edges: {
      node: {
        id: number
        name: {
          full: string
        }
        image: {
          large: string
        }
      }
      voiceActors: {
        id: number
        name: {
          full: string
        }
        image: {
          large: string
        }
      }[]
    }[]
  }
  coverImage: {
    large: string
    extraLarge: string
  }
  airingSchedule: {
    notYetAired: boolean
  }
  externalLinks: {
    icon: string
    site: string
    url: string
  }[]
  startDate: {
    year: number
    month: number
    day: number
  }
  bannerImage?: string
  genres: string[]
  averageScore?: number
  status: 'FINISHED' | 'RELEASING' | 'NOT_YET_RELEASED' | 'CANCELLED'
  episodes?: number
}


export type ValidAnimeTypes = 'tv' | 'tv_short' | 'movie' | 'special' | 'ova' | 'ona' | 'music'
export type ValidAnimeStatus = 'RELEASING' | 'FINISHED' | 'NOT_YET_RELEASED' | 'CANCELLED'

export const validTypes: Record<ValidAnimeTypes, string> = {
  tv: 'TV',
  tv_short: 'TV_SHORT',
  movie: 'MOVIE',
  special: 'SPECIAL',
  ova: 'OVA',
  ona: 'ONA',
  music: 'MUSIC',
}

export const statusMap: { [key: string]: ValidAnimeStatus } = {
  CURRENT: 'RELEASING',
  FINISHED: 'FINISHED',
  NOT_YET_AIRED: 'NOT_YET_RELEASED',
  CANCELED: 'CANCELLED',
}

// Interface for the main API response
interface AniListResponse<T> {
  data: T
}

// Interface for the genre collection data
interface GenreCollectionData {
  GenreCollection: string[] // Array of genres as strings
}

// Combine them to define the full response type
export type GenreResponse = AniListResponse<GenreCollectionData>