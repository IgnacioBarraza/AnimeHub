import { Card, CardContent, CardTitle } from '@/components/ui/card'
import { MangaDexData } from '@/utils/interfaces'
import { MangaResultProps } from '@/utils/propsInterface'
import { Book } from 'lucide-react'
import { Link } from 'react-router-dom'

export default function MangaResult({manga, searchQuery}: MangaResultProps) {
  const getCoverImage = (manga: MangaDexData) => {
    const coverArt = manga.relationships.find((rel) => rel.type === 'cover_art')
    return coverArt
      ? `https://uploads.mangadex.org/covers/${manga.id}/${coverArt.attributes.fileName}`
      : '/placeholder.svg?height=80&width=60&text=No%20Image'
  }

  return (
    <Link to={`/home/manga-details?search=${searchQuery}&id=${manga.id}`}>
      <Card
        key={manga.id}
        className="relative bg-background-light rounded-md mb-4 border-none overflow-hidden group"
        style={{ width: '200px', height: '288px' }}
      >
        <div
          style={{
            backgroundImage: `url(${getCoverImage(manga)})`,
          }}
          className="absolute inset-0 w-full h-full bg-cover bg-center rounded-md"
        />
        <div className="absolute inset-0 bg-black opacity-40 rounded-md group-hover:opacity-0 transition-opacity duration-300" />
          <CardContent className="relative z-10 flex flex-col justify-end p-2 h-full">
            <CardTitle className="text-white text-sm font-bold">
              {manga.attributes.title.en || 'Unknown Title'}
            </CardTitle>
            <div className="flex items-center mt-1 text-white text-xs group-hover:opacity-0 group-hover:hidden transition-opacity duration-300">
              <Book className="w-4 h-4 mr-1" />
              <span>{manga.type}</span>
              {manga.attributes.status && (
                <>
                  <span className="mx-2">•</span>
                  <span>{manga.attributes.status}</span>
                </>
              )}
            </div>
          </CardContent>
      </Card>
    </Link>
  )
}
