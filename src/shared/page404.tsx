import { Home } from 'lucide-react';
import { useEffect, useState } from 'react';

export default function Page404() {
  const [isLoading, setIsLoading] = useState<boolean>(true)

  useEffect(() => {
    const img = new Image()
    img.src = ''
    img.onload = () => setIsLoading(false)
  }, [])
  return (
    <div className="min-h-screen bg-background flex flex-col items-center justify-center p-4">
      <div className="text-center">
        <h1 className="text-4xl md:text-6xl font-bold text-primary mb-4">404</h1>
        <p className="text-xl md:text-2xl text-foreground mb-8">Oops! Page not found</p>
        {isLoading ? (
          <div className="w-64 h-64 md:w-96 md:h-96 bg-background-lighter animate-pulse rounded-lg mb-8"></div>
        ) : (
          <img
            src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/404-anime-girl-RLMNxDXBXBXhgTDkDXNQPPSFRBGLRf.png"
            alt="Anime girl looking confused"
            className="w-64 h-64 md:w-96 md:h-96 object-cover rounded-lg mb-8 mx-auto"
          />
        )}
        <a 
          href="/" 
          className="inline-flex items-center px-6 py-3 bg-primary text-primary-foreground rounded-full hover:bg-primary-600 transition-colors duration-300"
        >
          <Home className="w-5 h-5 mr-2" />
          Go to Homepage
        </a>
      </div>
    </div>
  )
}
