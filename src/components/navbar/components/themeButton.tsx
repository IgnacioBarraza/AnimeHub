import { useTheme } from '@/hooks/themeHook'
import { ThemeButtonProps } from '@/utils/propsInterface'
import { Moon, Sun } from 'lucide-react'

export const ThemeButton = ({ onClick }: ThemeButtonProps) => {
  const { theme, toggleTheme } = useTheme()

  const handleClick = () => {
    toggleTheme()
    onClick()
  }

  return (
    <button
      onClick={handleClick}
      className="w-full text-left px-4 py-2 text-sm hover:bg-background-lighter flex items-center"
    >
      {theme === 'dark' ? (
        <>
          <Sun className="w-4 h-4 mr-2" />
          Light Theme
        </>
      ) : (
        <>
          <Moon className="w-4 h-4 mr-2" />
          Dark Theme
        </>
      )}
    </button>
  )
}
