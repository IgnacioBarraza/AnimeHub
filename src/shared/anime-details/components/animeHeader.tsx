import { AnimeInfoProps } from '@/utils/propsInterface'
import { Badge } from '@/components/ui/badge'

export default function AnimeHeader({ anime }: AnimeInfoProps) {
  return (
    <div
      className="relative rounded-lg h-64 w-full bg-cover bg-center"
      style={{
        backgroundImage: `url(${anime.bannerImage})`,
      }}
    >
      <div className="absolute inset-0 bg-black bg-opacity-50 rounded-lg"></div>
      <div className="relative z-10 flex items-start h-full p-4">
        <img
          src={anime.coverImage.extraLarge}
          alt={`${anime.title.english || anime.title.romaji} Cover`}
          className="w-40 h-auto rounded-lg shadow-lg"
        />
        <div className="ml-6 text-white">
          <h1 className="text-lg lg:text-4xl font-bold mb-2">
            {anime.title.english || anime.title.romaji}
          </h1>
          {anime.genres.map((genre, index) => (
            <Badge key={index} className="mr-1 text-white lg:text-md">
              {genre}
            </Badge>
          ))}
        </div>
      </div>
    </div>
  )
}
