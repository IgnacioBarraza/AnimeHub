import { ContextProviderProps, LocationContextProps } from '@/utils/interfaces'
import { createContext, useState, useEffect } from 'react'
import {
  Location,
  useLocation as useReactRouterLocation,
} from 'react-router-dom'

export const LocationContext = createContext<LocationContextProps | undefined>(
  undefined
)

export const LocationProvider = ({ children }: ContextProviderProps) => {
  const location = useReactRouterLocation()
  const [currentLocation, setCurrentLocation] = useState<Location>(location)

  useEffect(() => {
    setCurrentLocation(location)
  }, [location])

  return (
    <LocationContext.Provider value={{ location: currentLocation }}>
      {children}
    </LocationContext.Provider>
  )
}
