import { Badge } from '@/components/ui/badge'
import { AnimeInfoProps } from '@/utils/propsInterface'
import {
  formatDescriptionWithLimit,
  getStatusColor,
  platformColors,
  statusDict,
} from '@/utils/utils'
import { Calendar, Clock, Play } from 'lucide-react'
import { useState } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import CharacterList from './characterList'

export default function AnimeInfo({ anime }: AnimeInfoProps) {
  const location = useLocation()
  const navigate = useNavigate()
  const initialEpisodeLimit = 6

  const [showFullDescription, setShowFullDescription] = useState(false)
  const [episodeLimit, setEpisodeLimit] = useState(initialEpisodeLimit) // initial count of visible episodes
  const descriptionLimit = 400

  const handleGoBack = () => {
    const previousLocation = localStorage.getItem('prevLocation')
    if (previousLocation) {
      const decodedLocation = decodeURIComponent(previousLocation)
      navigate(decodedLocation)
    }
  }

  const hasSearchParam = new URLSearchParams(location.search).has('search')

  const formattedDescription = formatDescriptionWithLimit(
    anime.description || '',
    descriptionLimit,
    showFullDescription
  )

  // Sort episodes in ascending order by episode number
  // Sort episodes in ascending order by episode number, with a fallback to an empty array
  const sortedEpisodes = [...(anime.streamingEpisodes || [])].sort((a, b) => {
    const episodeNumberA = parseInt(a.title.match(/\d+/)?.[0] || '0')
    const episodeNumberB = parseInt(b.title.match(/\d+/)?.[0] || '0')
    return episodeNumberA - episodeNumberB
  })

  const handleShowMoreEpisodes = () => {
    setEpisodeLimit((prevLimit) => prevLimit + initialEpisodeLimit)
  }

  return (
    <div className="flex flex-col mx-auto">
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
              <Badge key={index} className="mr-1 text-white lg:text-md">{genre}</Badge>
            ))}
          </div>
        </div>
      </div>
      <div className="flex flex-col md:flex-row gap-8 mt-4 px-4 md:px-0">
        <div className="md:w-1/3">
          {anime.externalLinks.length > 0 && (
            <span className="text-text mt-4 font-bold">Where to watch:</span>
          )}
          <div className="flex flex-wrap gap-2 mt-4 ">
            {anime.externalLinks.length > 0 &&
              anime.externalLinks
                ?.filter((link) => link.icon)
                .map((link, index) => (
                  <Link
                    key={index}
                    to={link.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`flex items-center text-white px-4 py-2 rounded-full transition duration-300 ${
                      platformColors[link.site] || 'bg-black'
                    }`}
                  >
                    <img
                      src={link.icon}
                      alt={`${link.site} icon`}
                      className="w-5 h-5 mr-2"
                    />
                    {link.site}
                  </Link>
                ))}
          </div>
          {hasSearchParam && (
            <button
              onClick={handleGoBack}
              className="mt-4 bg-blue-500 text-white px-4 py-2 rounded-full hover:bg-blue-700 transition duration-300"
            >
              Go Back to Search
            </button>
          )}
          {anime.streamingEpisodes && anime.streamingEpisodes.length > 0 && (
            <div className="mt-6">
              <h2 className="text-text font-bold text-lg mb-2">Episodes:</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2">
                {sortedEpisodes.slice(0, episodeLimit).map((episode, index) => (
                  <button
                    key={index}
                    onClick={() =>
                      window.open(episode.url, '_blank', 'noopener,noreferrer')
                    }
                    className="relative group overflow-hidden rounded-lg"
                  >
                    <img
                      src={episode.thumbnail}
                      alt=""
                      className="w-full h-auto object-cover transition-transform duration-300 group-hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      <Play className="w-12 h-12 text-white" />
                    </div>
                    <div className="absolute bottom-0 left-0 right-0 p-2 bg-black bg-opacity-75">
                      <span className="text-sm text-white truncate block">
                        {episode.title}
                      </span>
                    </div>
                  </button>
                ))}
              </div>
              {/* Show "View all episodes" button if there are more episodes */}
              {episodeLimit < sortedEpisodes.length && (
                <button
                  onClick={handleShowMoreEpisodes}
                  className="mt-4 text-blue-500 hover:underline"
                >
                  View more episodes
                </button>
              )}
            </div>
          )}
        </div>
        <div className="md:w-2/3">
          <div
            className="text-text-muted mb-4"
            dangerouslySetInnerHTML={{ __html: formattedDescription }}
          />
          {!showFullDescription && (
            <button
              onClick={() => setShowFullDescription(true)}
              className="text-blue-500 hover:underline"
            >
              Read more
            </button>
          )}
          <div className="grid grid-cols-2 gap-4 mb-2">
            {anime.startDate.year && (
              <div className="flex items-center">
                <Calendar className="w-5 h-5 mr-2" />
                <span>
                  {anime.startDate.day}/{anime.startDate.month}/
                  {anime.startDate.year}
                </span>
              </div>
            )}
            <div className="flex items-center">
              <Clock
                className={`w-5 h-5 mr-2 ${getStatusColor(anime.status)}`}
              />
              <span>{statusDict[anime.status] || 'Unknown'}</span>
            </div>
          </div>
          <CharacterList anime={anime} />
        </div>
      </div>
    </div>
  )
}
