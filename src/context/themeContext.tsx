import { ContextProviderProps } from '@/utils/interfaces'
import { createContext, useState, useEffect } from 'react'

interface ThemeContextProps {
  theme: 'light' | 'dark'
  toggleTheme: () => void
}

export const ThemeContext = createContext<ThemeContextProps | undefined>(
  undefined
)

export function ThemeProvider({ children }: ContextProviderProps) {
  const [theme, setTheme] = useState<'light' | 'dark'>(() => {
    if (typeof window !== 'undefined') {
      // Ensure this code only runs on the client
      const savedTheme = localStorage.getItem('theme')
      return savedTheme ? (savedTheme as 'light' | 'dark') : 'dark'
    }
    return 'dark' // Default to 'dark' when server rendering or no access to localStorage
  })

  useEffect(() => {
    if (typeof window !== 'undefined') {
      // Apply the theme class to the <html> element
      document.documentElement.className = theme
      // Save the current theme to localStorage
      localStorage.setItem('theme', theme)
    }
  }, [theme])

  const toggleTheme = () => {
    setTheme((prevTheme) => (prevTheme === 'dark' ? 'light' : 'dark'))
  }

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  )
}
