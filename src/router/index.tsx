import { Routes, Route, BrowserRouter } from 'react-router-dom'
import Page404 from '../shared/page404'
import ProtectedRoute from '../routes/protectedRoute'
import { RouteConfig, RouterProps } from '@/utils/interfaces'

export default function Router({routes}: RouterProps) {
  // Function to recursively render routes
  const renderRoutes = (routes: RouteConfig[]) => {
    return routes.map((route: RouteConfig) => {
      // Check if route requires protection
      const element = route.protection ? (
        <ProtectedRoute roles={route.protection.roles}>
          {route.component}
        </ProtectedRoute>
      ) : (
        route.component
      )

      return (
        <Route key={route.path} path={route.path} element={element}>
          {route.routes && renderRoutes(route.routes)}
        </Route>
      )
    })
  }

  return (
    <BrowserRouter>
      <Routes>
        {renderRoutes(routes)}
        <Route path="*" element={<Page404 />} />
      </Routes>
    </BrowserRouter>
  )
}
