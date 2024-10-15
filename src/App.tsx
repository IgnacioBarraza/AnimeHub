import Navbar from './components/navbar'
import { ThemeProvider } from './context/themeContext'
import Router from './router'
import routes from './routes/routesConfig'

function App() {
  return (
    <ThemeProvider>
      <div className="min-h-screen bg-background text-text">
        <Navbar />
        <Router routes={routes} />
      </div>
    </ThemeProvider>
  )
}

export default App
