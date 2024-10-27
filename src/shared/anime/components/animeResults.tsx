import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import { AnimeResultProps } from '@/utils/propsInterface'
import { Star } from 'lucide-react'
import { Link } from 'react-router-dom'

export default function AnimeResults({anime, searchQuery}: AnimeResultProps) {
  return (
    <Card key={anime.mal_id} className="bg-background-light rounded-md mb-4 border-none">
      <CardHeader>
        <div className="flex items-start">
          <img
            src={anime.images.webp.image_url}
            alt={anime.title}
            className="w-24 h-36 object-cover rounded-md mr-4"
          />
          <div>
            <CardTitle>{anime.title}</CardTitle>
            <div>
              <div className="flex items-center mt-1">
                <Star className="w-4 h-4 text-yellow-400 mr-1" />
                <span>{anime.score}</span>
              </div>
              <div className="mt-1">
                Episodes: {anime.episodes || 'Unknown'}
              </div>
              <div className="mt-1">
                Status: {anime.airing ? 'Airing' : 'Finished'}
              </div>
            </div>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <span className="text-sm text-muted-foreground">{anime.synopsis}</span>
      </CardContent>
      <CardFooter>
        <Link
          to={`anime-details?search=${searchQuery}&id=${anime.mal_id}`}
          
        >
          See More Details
        </Link>
      </CardFooter>
    </Card>
  )
}
