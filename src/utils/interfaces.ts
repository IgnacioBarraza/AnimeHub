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

export interface AnimeData {
  mal_id: number
  url: string
  images: {
    jpg: ImageFormat
    webp: ImageFormat
  }
  trailer: Trailer
  approved: boolean
  titles: Title[]
  title: string
  title_english: string
  title_japanese: string
  title_synonyms: string[]
  type: string
  source: string
  episodes: number | null
  status: string
  airing: boolean
  aired: {
    from: string
    to: string | null
    prop: {
      from: DateProp
      to: DateProp
    }
    string: string
  }
  duration: string
  rating: string
  score: number
  scored_by: number
  rank: number
  popularity: number
  members: number
  favorites: number
  synopsis: string
  background: string
  season: string
  year: number
  broadcast: Broadcast
  producers: Producer[]
  licensors: Producer[]
  studios: Producer[]
  genres: Genre[]
  explicit_genres: Genre[]
  themes: Genre[]
  demographics: Genre[]
  theme: {
    openings: string[]
    endings: string[]
  }
}

interface ImageFormat {
  image_url: string
  small_image_url: string
  large_image_url: string
}

interface Trailer {
  youtube_id: string
  url: string
  embed_url: string
  images: {
    image_url: string
    small_image_url: string
    medium_image_url: string
    large_image_url: string
    maximum_image_url: string
  }
}

interface Title {
  type: string
  title: string
}

interface DateProp {
  day: number | null
  month: number | null
  year: number | null
}

interface Broadcast {
  day: string
  time: string
  timezone: string
  string: string
}

interface Producer {
  mal_id: number
  type: string
  name: string
  url: string
}

export interface Genre {
  mal_id: number
  type: string
  name: string
  url: string
}

export interface JikanMoeApiResponse {
  result: string
  response: string
  data: AnimeData[]
  limit: number
  offset: number
  total: number
}

export interface AniListAnimeData {
  id: number
  title: {
    romaji: string
    english?: string
  }
  coverImage: {
    large: string
  }
  averageScore?: number
  episodes?: number
  genres?: string[]
  status?: 'FINISHED' | 'RELEASING' | 'NOT_YET_RELEASED' | 'CANCELLED'
}