import { ReactNode } from 'react'
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