import Login from '@/auth/login'
import Register from '@/auth/register'
import Home from '@/shared/home/home'
import Layout from '@/shared/layout'
import Page404 from '@/shared/page404'
import { Navigate } from 'react-router-dom'

const routes = [
  {
    path: '/login',
    component: <Login />
  },
  {
    path: '/register',
    component: <Register />
  },
  {
    path: '/home',
    component: <Layout />,
    routes: [
      {
        path: '',
        component: <Home />
      }
    ]
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