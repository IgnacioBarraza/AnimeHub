import { AnimeInfoProps } from '@/utils/propsInterface'
import { Play } from 'lucide-react'
import { useState } from 'react'

export default function AnimeChapters({ anime }: AnimeInfoProps) {
  const initialEpisodeLimit = 6
  const [episodeLimit, setEpisodeLimit] = useState(initialEpisodeLimit) 

  const sortedEpisodes = [...(anime.streamingEpisodes || [])].sort((a, b) => {
    const episodeNumberA = parseInt(a.title.match(/\d+/)?.[0] || '0')
    const episodeNumberB = parseInt(b.title.match(/\d+/)?.[0] || '0')
    return episodeNumberA - episodeNumberB
  })

  const handleShowMoreEpisodes = () => {
    setEpisodeLimit((prevLimit) => prevLimit + initialEpisodeLimit)
  }
  return (
    <div className="mt-6">
      <h2 className="text-text font-bold text-lg mb-2">Episodes:</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
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
              alt={`Watch ${episode.title}`}
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
      {episodeLimit < sortedEpisodes.length && (
        <button
          onClick={handleShowMoreEpisodes}
          className="mt-4 text-blue-500 hover:underline"
        >
          View more episodes
        </button>
      )}
    </div>
  )
}
