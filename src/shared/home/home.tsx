import { useState, useEffect } from 'react'

export default function Home() {
  const [theme, setTheme] = useState('dark')

  useEffect(() => {
    document.documentElement.classList.toggle('dark', theme === 'dark')
    document.documentElement.classList.toggle('light', theme === 'light')
  }, [theme])

  const toggleTheme = () => {
    setTheme(prevTheme => prevTheme === 'dark' ? 'light' : 'dark')
  }

  return (
    <div className="">
      <button 
          onClick={toggleTheme}
          className="bg-primary text-white px-4 py-2 rounded"
        >
          Toggle Theme
        </button>
        <p className="mt-4">
          Current theme: {theme}
        </p>
    </div>
  )
}
