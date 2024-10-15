import Layout from '@/shared/layout'
import Page404 from '@/shared/page404'
import { Navigate } from 'react-router-dom'

const routes = [
  {
    path: '/login',
    // component:
  },
  {
    path: '/register',
    // component:
  },
  {
    path: '/home',
    component: <Layout />,
    routes: [
      {
        path: '',
        // component: 
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