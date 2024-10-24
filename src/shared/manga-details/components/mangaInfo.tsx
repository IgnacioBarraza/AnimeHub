import { Calendar, Clock, User } from 'lucide-react'
import { Link } from 'react-router-dom'
import { LastChapters } from './lastChapters'
import { MangaInfoProps } from '@/utils/propsInterface'
import { getStatusColor, languageFlags, languageTranslate } from '@/utils/utils'
import { Badge } from '@/components/ui/badge'
import { useState } from 'react'

export const MangaInfo = ({ manga, mangaDexId }: MangaInfoProps) => {
  const [showFullDescription, setShowFullDescription] = useState(false)
  const descriptionLimit = 300

  const coverArt = manga.relationships.find((rel) => rel.type === 'cover_art')
    ?.attributes?.fileName

  const authors = manga.relationships
    .filter((rel) => rel.type === 'author')
    .map((author) => author.attributes.name) as string[]

  const originalLanguageFlag =
    languageTranslate[manga.attributes.originalLanguage] || '🏳️'

  return (
    <div className="flex flex-col md:flex-row gap-8 mx-auto">
      <div className="md:w-1/3">
        <img
          src={
            coverArt
              ? `https://uploads.mangadex.org/covers/${manga.id}/${coverArt}`
              : '/placeholder.svg'
          }
          alt={`${manga.attributes.title.en || manga.attributes.title['ja-ro']} Manga Cover`}
          className="w-full rounded-lg shadow-lg"
        />
        <div className="mt-4 flex justify-between items-center">
          {mangaDexId && (
            <Link
              to={`https://mangadex.org/title/${mangaDexId}`}
              target="_blank"
              rel="noopener noreferrer"
              className="bg-orange-500 text-white px-4 py-2 rounded-full hover:bg-orange-700 transition duration-300"
            >
              Read Now on Mangadex
            </Link>
          )}
        </div>
      </div>
      <div className="md:w-2/3">
        <h1 className="text-4xl font-bold mb-4">{manga.attributes.title.en || manga.attributes.title['ja-ro']}</h1>
        <div className="mt-4 mb-2">
          <p className="mb-2 text-xl">
            <strong>Authors:</strong>
          </p>
          <div className="flex flex-wrap gap-2">
            {authors.length > 0 &&
              authors.map((author) => (
                <Badge key={author} variant="secondary" className="text-lg">
                  <User className="w-5 h-5 mr-1" /> {author}
                </Badge>
              ))}
          </div>
        </div>
        <p className="text-text-muted mb-4">
          {showFullDescription
            ? manga.attributes.description.en
            : `${manga.attributes.description.en.slice(
                0,
                descriptionLimit
              )}...`}
          {!showFullDescription && (
            <button
              onClick={() => setShowFullDescription(true)}
              className="text-blue-500 hover:underline"
            >
              Read more
            </button>
          )}
        </p>
        <div className="grid grid-cols-2 gap-4 mb-2">
          <div className="flex items-center">
            <Calendar className="w-5 h-5 mr-2" />
            <span>
              <span>{manga.attributes.year}</span>
            </span>
          </div>
          <div className="flex items-end">
            <Clock className={`w-5 h-5 mr-2 ${getStatusColor(manga.attributes.status)}`} />
            <span>{manga.attributes.status || 'Unknown'}</span>
          </div>
          <div className="flex items-end mb-4">
            <span className="text-lg">Original language:</span>
            <img
              src={languageFlags[manga.attributes.originalLanguage]}
              alt=""
              className="w-6 h-6 mr-1 ml-1"
            />
            <span className="text-xl">{originalLanguageFlag}</span>
          </div>
        </div>
        <div className="flex items-start mb-4">
          <span className="font-semibold mr-2">Genre:</span>
          <span>
            {manga.attributes.tags
              .map((genre) => genre.attributes.name.en)
              .join(', ')}
          </span>
        </div>
        <div className="mt-4 mb-2">
          <p>
            <strong>Available Languages:</strong>
          </p>
          <div className="flex flex-wrap gap-2 mt-2">
            {manga.attributes.altTitles.map((lang, index) => {
              const languageCode = Object.keys(lang)[0]
              const flag = languageFlags[languageCode]
              const altTitle = lang[languageCode]

              // Check if flag and translatedName are defined before rendering
              if (flag && altTitle) {
                return (
                  <Badge key={index} variant="secondary" className="text-sm">
                    <img
                      src={flag}
                      alt={`${languageCode} flag`}
                      className="mr-2"
                    />{' '}
                    <span>{altTitle}</span>
                  </Badge>
                )
              }
              return null // Return null if flag or translatedName is undefined
            })}
          </div>
        </div>
        {mangaDexId && <LastChapters mangaDexId={mangaDexId} />}
      </div>
    </div>
  )
}
