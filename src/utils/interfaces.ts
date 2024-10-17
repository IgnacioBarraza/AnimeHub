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

export interface MangaApiResponse {
  data: Manga[]; // The array of anime/manga results
  pagination: {
    last_visible_page: number; // The last page number available
    has_next_page: boolean; // Whether there's a next page of results
  };
}


// export const categoriesDummy: Category[] = [
//   {
//     title: 'Popular',
//     series: [
//       { id: '1', title: 'Jujutsu Kaisen', rating: 8.5, genres: ['Action', 'Supernatural', 'School'], imageUrl: 'https://cdn.myanimelist.net/images/manga/3/210341.webp' },
//       { id: '2', title: 'One Piece', rating: 9.2, genres: ['Action', 'Adventure', 'Fantasy'], imageUrl: 'https://cdn.myanimelist.net/images/manga/2/253146.webp' },
//       { id: '3', title: 'Kanojo mo kanojo', rating: 6.9, genres: ['Comedy', 'Romance', 'School'], imageUrl: 'https://cdn.myanimelist.net/images/manga/3/279849.webp' },
//       { id: '4', title: 'Dragon Ball', rating: 8.4, genres: ['Action', 'Comedy', 'Adventure'], imageUrl: 'https://cdn.myanimelist.net/images/manga/1/267793.webp' },
//       { id: '5', title: 'Shingeki no kyojin', rating: 8.6, genres: ['Action', 'Drama', 'Military'], imageUrl: 'https://cdn.myanimelist.net/images/manga/2/37846.webp' },
//       { id: '6', title: 'Shingeki no kyojin', rating: 8.6, genres: ['Action', 'Drama', 'Military'], imageUrl: 'https://cdn.myanimelist.net/images/manga/2/37846.webp' },
//       { id: '7', title: 'Shingeki no kyojin', rating: 8.6, genres: ['Action', 'Drama', 'Military'], imageUrl: 'https://cdn.myanimelist.net/images/manga/2/37846.webp' },
//       { id: '8', title: 'Shingeki no kyojin', rating: 8.6, genres: ['Action', 'Drama', 'Military'], imageUrl: 'https://cdn.myanimelist.net/images/manga/2/37846.webp' },
//       { id: '9', title: 'Shingeki no kyojin', rating: 8.6, genres: ['Action', 'Drama', 'Military'], imageUrl: 'https://cdn.myanimelist.net/images/manga/2/37846.webp' },
//       { id: '10', title: 'Shingeki no kyojin', rating: 8.6, genres: ['Action', 'Drama', 'Military'], imageUrl: 'https://cdn.myanimelist.net/images/manga/2/37846.webp' },
//       { id: '11', title: 'Shingeki no kyojin', rating: 8.6, genres: ['Action', 'Drama', 'Military'], imageUrl: 'https://cdn.myanimelist.net/images/manga/2/37846.webp' },
//     ]
//   },
//   {
//     title: 'New Releases',
//     series: [
//       { id: '6', title: 'Demon Slayer', rating: 8.7, genres: ['Action', 'Supernatural'], imageUrl: '/placeholder.svg' },
//       { id: '7', title: 'My Hero Academia', rating: 8.0, genres: ['Action', 'Superhero'], imageUrl: '/placeholder.svg' },
//       { id: '8', title: 'Tokyo Revengers', rating: 8.1, genres: ['Action', 'Time Travel'], imageUrl: '/placeholder.svg' },
//       { id: '9', title: 'Haikyuu!!', rating: 8.7, genres: ['Sports', 'Comedy'], imageUrl: '/placeholder.svg' },
//       { id: '10', title: 'Black Clover', rating: 7.9, genres: ['Action', 'Fantasy'], imageUrl: '/placeholder.svg' },
//     ]
//   },
//   {
//     title: 'Top Rated',
//     series: [
//       { id: '11', title: 'Fullmetal Alchemist: Brotherhood', rating: 9.1, genres: ['Action', 'Adventure'], imageUrl: '/placeholder.svg' },
//       { id: '12', title: 'Death Note', rating: 9.0, genres: ['Mystery', 'Psychological'], imageUrl: '/placeholder.svg' },
//       { id: '13', title: 'Steins;Gate', rating: 9.1, genres: ['Sci-Fi', 'Thriller'], imageUrl: '/placeholder.svg' },
//       { id: '14', title: 'Hunter x Hunter', rating: 9.1, genres: ['Action', 'Adventure'], imageUrl: '/placeholder.svg' },
//       { id: '15', title: 'Gintama', rating: 8.9, genres: ['Action', 'Comedy'], imageUrl: '/placeholder.svg' },
//     ]
//   },
// ]