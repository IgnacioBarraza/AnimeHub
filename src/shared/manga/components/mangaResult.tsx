import { MangaDexData } from '@/utils/interfaces'
import { MangaResultProps } from '@/utils/propsInterface'
import { Book } from 'lucide-react'
import { Link } from 'react-router-dom'

export default function MangaResult(manga: MangaResultProps) {
  const mangaData = manga.manga
  const getCoverImage = (manga: MangaDexData) => {
    const coverArt = manga.relationships.find((rel) => rel.type === 'cover_art')
    return coverArt
      ? `https://uploads.mangadex.org/covers/${manga.id}/${coverArt.attributes.fileName}`
      : '/placeholder.svg?height=80&width=60&text=No%20Image'
  }

  return (
    <Link to={`/home/manga-details?id=${mangaData.id}`}>
      <div
        key={mangaData.id}
        className="bg-background-light p-4 rounded-md mb-4 flex items-center"
      >
        <img
          src={getCoverImage(mangaData)}
          alt={mangaData.attributes.title.en || 'Manga cover'}
          width={60}
          height={80}
          className="mr-4 rounded object-cover"
        />
        <div className="flex-grow">
          <h3 className="font-semibold">
            {mangaData.attributes.title.en || 'Unknown Title'}
          </h3>
          <div className="flex items-center text-sm text-gray-400">
            <Book className="w-4 h-4 mr-1" />
            <span>{mangaData.type}</span>
            {mangaData.attributes.status && (
              <>
                <span className="mx-2">•</span>
                <span>{mangaData.attributes.status}</span>
              </>
            )}
          </div>
        </div>
      </div>
    </Link>
  )
}
