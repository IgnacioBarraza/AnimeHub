import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { ExternalLink } from 'lucide-react'

export default function Credits() {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8 text-center">Credits</h1>
      <div className="grid gap-8 md:grid-cols-2">
        <Card className='bg-background-light border-none'>
          <CardHeader>
            <CardTitle className="text-2xl">MangaDex</CardTitle>
            <CardDescription>Manga Information Provider</CardDescription>
          </CardHeader>
          <CardContent>
            <p className="mb-4">
              We extend our heartfelt gratitude to MangaDex for providing their comprehensive manga database API. 
              Their service has been instrumental in bringing you accurate and up-to-date manga information.
            </p>
            <Button asChild className='bg-orange-500 hover:bg-orange-700'>
              <a href="https://mangadex.org" target="_blank" rel="noopener noreferrer" className="inline-flex items-center text-black">
                Visit MangaDex
                <ExternalLink className="ml-2 h-4 w-4" />
              </a>
            </Button>
          </CardContent>
        </Card>

        <Card className='bg-background-light border-none'>
          <CardHeader>
            <CardTitle className="text-2xl">Jikan Moe</CardTitle>
            <CardDescription>Anime Information Provider</CardDescription>
          </CardHeader>
          <CardContent>
            <p className="mb-4">
              We're deeply appreciative of Jikan Moe for their excellent anime database API. 
              Their service has been crucial in providing our users with rich and detailed anime information.
            </p>
            <Button asChild>
              <a href="https://jikan.moe" target="_blank" rel="noopener noreferrer" className="inline-flex items-center">
                Visit Jikan Moe
                <ExternalLink className="ml-2 h-4 w-4" />
              </a>
            </Button>
          </CardContent>
        </Card>
      </div>

      <div className="mt-12 text-center">
        <h2 className="text-2xl font-semibold mb-4">About Otaku Oasis</h2>
        <p className="max-w-2xl mx-auto">
          Otaku Oasis is dedicated to providing a comprehensive platform for anime and manga enthusiasts. 
          We strive to offer accurate and up-to-date information to our users, and this wouldn't be possible 
          without the support of services like MangaDex and Jikan Moe. We encourage our users to visit and 
          support these platforms directly.
        </p>
      </div>

      <footer className="mt-12 text-center text-sm text-muted-foreground">
        <p>© {new Date().getFullYear()} Otaku Oasis. All rights reserved.</p>
        <p>Anime and manga data provided by MangaDex and Jikan Moe.</p>
      </footer>
    </div>
  )
}
