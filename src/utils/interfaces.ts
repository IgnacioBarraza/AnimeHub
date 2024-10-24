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
