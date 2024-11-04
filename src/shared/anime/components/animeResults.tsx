import { Card, CardContent, CardTitle } from '@/components/ui/card'
import { AnimeResultProps } from '@/utils/propsInterface'
import { statusDict } from '@/utils/utils'
import { Star } from 'lucide-react'
import { Link } from 'react-router-dom'

export default function AnimeResults({ anime, searchQuery }: AnimeResultProps) {
  return (
    <Link to={`/home/anime-details?search=${searchQuery}&id=${anime.id}`}>
      <Card
        key={anime.id}
        className="relative bg-background-light rounded-md mb-4 border-none overflow-hidden group"
        style={{ width: '200px', height: '288px' }}
      >
        <div
          style={{
            backgroundImage: `url(${anime.coverImage.extraLarge})`,
          }}
          className="absolute inset-0 w-full h-full bg-cover bg-center rounded-md"
        />
        <div className="absolute inset-0 bg-black opacity-40 rounded-md group-hover:opacity-0 transition-opacity duration-300" />
        <CardContent className="relative z-10 flex flex-col justify-end p-2 h-full">
          <CardTitle className="text-white text-sm font-semibold">
            {anime.title.romaji || anime.title.english}
          </CardTitle>
          <div className="group-hover:opacity-0 group-hover:hidden transition-opacity duration-300">
            {anime.averageScore && (
              <div className="flex items-center mt-1 text-white text-xs">
                <Star className="w-4 h-4 text-yellow-400 mr-1" />
                <span>{anime.averageScore + '%' || 'N/A'}</span>
              </div>
            )}
            <div className="mt-1 text-white text-xs">
              Status: {statusDict[anime.status]}
            </div>
            <div className="text-muted-foreground text-white mt-1 text-xs">
              {anime.genres?.slice(0, 3).join(', ')}
            </div>
          </div>
        </CardContent>
      </Card>
    </Link>
  )
}
