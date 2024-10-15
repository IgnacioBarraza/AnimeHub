import { Home } from 'lucide-react'

export default function Page404() {
  return (
    <div className="flex min-h-[100dvh] flex-col items-center justify-center bg-background px-4 py-12 sm:px-6 lg:px-8">
      <div className="mx-auto text-center">
        {/* <FontAwesomeIcon icon={faTriangleExclamation} className="mx-auto h-12 w-12 text-primary" /> */}
        <h1 className="mt-4 text-3xl font-bold tracking-tight text-foreground sm:text-8xl">404</h1>
        <h1 className="mt-4 text-3xl font-bold tracking-tight text-foreground sm:text-4xl">Oops, page not found!</h1>
        <p className="mt-4 text-muted-foreground">
          The page you are looking for doesn't exist.
        </p>
        <div className="mt-6">
        <a 
          href="/" 
          className="inline-flex items-center px-6 py-3 bg-primary text-primary-foreground rounded-full hover:bg-primary-600 transition-colors duration-300"
        >
          <Home className="w-5 h-5 mr-2" />
          Go to Homepage
        </a>
        </div>
      </div>
    </div>
  )
}
