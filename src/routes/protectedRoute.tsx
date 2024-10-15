import { ProtectedRouteProps } from '@/utils/interfaces'
import { useEffect } from 'react'
import { Outlet, useNavigate, useLocation } from 'react-router-dom'

function ProtectedRoute({ roles = [], children}: ProtectedRouteProps) {
  const navigate = useNavigate()
  const location = useLocation()

  const isAuth = !!localStorage.getItem('token')
  const storedUserRole = localStorage.getItem('userRole')

  useEffect(() => {
    if (!isAuth) {
      navigate('/login', { state: { from: location.pathname + location.search } })
    } else if (roles.length && storedUserRole && !roles.includes(storedUserRole)) {
      navigate('/home')
    }
  }, [isAuth, roles, storedUserRole, location, navigate])

  return isAuth ? (children ? children : <Outlet />) : null
}

export default ProtectedRoute