import { AnimeInfoProps } from '@/utils/propsInterface'
import {
  formatDate,
  formatDescriptionWithLimit,
  getStatusColor,
  statusDict,
} from '@/utils/utils'
import { Calendar, Clock } from 'lucide-react'
import { useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import CharacterList from './characterList'
import AnimeChapters from './animeChapters'
import ExternalLinks from './externalLinks'
import AnimeHeader from './animeHeader'

export default function AnimeInfo({ anime }: AnimeInfoProps) {
  const location = useLocation()
  const navigate = useNavigate()

  const [showFullDescription, setShowFullDescription] = useState(false)
  const descriptionLimit = 400

  const handleGoBack = () => {
    const previousLocation = localStorage.getItem('prevLocation')
    if (previousLocation) {
      const decodedLocation = decodeURIComponent(previousLocation)
      console.log(decodedLocation)
      navigate(decodedLocation)
    }
  }

  const hasSearchParam = new URLSearchParams(location.search).has('search')

  const formattedDescription = formatDescriptionWithLimit(
    anime.description || '',
    descriptionLimit,
    showFullDescription
  )

  return (
    <div className="flex flex-col mx-auto">
      <AnimeHeader anime={anime} />
      <div className="flex flex-col md:flex-row gap-8 mt-4 px-4 md:px-0">
        <div className="md:w-1/3">
          <ExternalLinks anime={anime} />
          {hasSearchParam && (
            <button
              onClick={handleGoBack}
              className="mt-4 bg-blue-500 text-white px-4 py-2 rounded-full hover:bg-blue-700 transition duration-300"
            >
              Go Back to Search
            </button>
          )}
          {anime.streamingEpisodes && anime.streamingEpisodes.length > 0 && (
            <AnimeChapters anime={anime} />
          )}
        </div>
        <div className="md:w-2/3">
          <div
            className="text-text-muted mb-4"
            dangerouslySetInnerHTML={{ __html: formattedDescription }}
          />
          {!showFullDescription && anime.description.length > descriptionLimit && (
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
                  {formatDate(anime.startDate)}
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
