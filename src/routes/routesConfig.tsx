import Auth from '@/auth/auth'
import AnimeDetails from '@/shared/anime-details/animeDetails'
import Anime from '@/shared/anime/anime'
import Credits from '@/shared/credits/credits'
import Home from '@/shared/home/home'
import Layout from '@/shared/layout'
import MangaDetails from '@/shared/manga-details/mangaDetails'
import Manga from '@/shared/manga/manga'
import Page404 from '@/shared/page404'
import { Navigate } from 'react-router-dom'

const routes = [
  {
    path: '/login',
    component: <Auth />
  },
  {
    path: '/home',
    component: <Layout />,
    routes: [
      {
        path: '',
        component: <Home />
      },
      {
        path: 'manga-details',
        component: <MangaDetails />
      },
      {
        path: 'manga',
        component: <Manga />
      },
      {
        path: 'anime',
        component: <Anime />
      },
      {
        path: 'anime-details',
        component: <AnimeDetails />
      }
    ]
  },
  {
    path: '/credits',
    component: <Credits />
  },
  {
    path: '/not-found',
    component: <Page404 />
  },
  {
    path: '/',
    component: <Navigate to={'/home'} />
  },
  {
    path: '*',
    component: <Navigate to={'/not-found'} />
  }
]

export default routes