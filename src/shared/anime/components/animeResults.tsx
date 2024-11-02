import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { AnimeResultProps } from '@/utils/propsInterface'
import { statusDict } from '@/utils/utils'
import { Star } from 'lucide-react'
import { Link } from 'react-router-dom'

export default function AnimeResults({ anime, searchQuery }: AnimeResultProps) {
  return (
    <Card
      key={anime.id}
      className="bg-background-light rounded-md mb-4 border-none"
    >
      <CardHeader className="flex items-center">
        <img
          src={anime.coverImage.extraLarge}
          alt={anime.title.romaji || anime.title.english || 'Anime Cover'}
          className="w-24 h-36 object-cover rounded-md"
        />
      </CardHeader>
      <CardContent className="flex flex-col justify-between">
        <div>
          <CardTitle>{anime.title.romaji || anime.title.english}</CardTitle>
          <div>
            {anime.averageScore && (
              <div className="flex items-center mt-1">
                <Star className="w-4 h-4 text-yellow-400 mr-1" />
                <span>{anime.averageScore+'%' || 'N/A'}</span>
              </div>
            )}
            <div className="mt-1">Status: {statusDict[anime.status]}</div>
            <div className="text text-muted-foreground mt-1">
              {anime.genres?.slice(0, 4).map((genre) => genre).join(', ')}
            </div>
          </div>
        </div>
      </CardContent>
      <CardFooter>
        <Link to={`/home/anime-details?search=${searchQuery}&id=${anime.id}`}>
          See More Details
        </Link>
      </CardFooter>
    </Card>
  )
}
