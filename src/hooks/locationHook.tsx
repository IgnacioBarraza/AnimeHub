import { LocationContext } from '@/context/locationContext'
import { LocationContextProps } from '@/utils/interfaces'
import { useContext } from 'react'

export const useLocationContext = (): LocationContextProps => {
  const context = useContext(LocationContext)
  if (!context)
    throw new Error('useLocationContext must be used within a LocationProvider')

  return context
}
