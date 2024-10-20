import { Calendar, Clock } from 'lucide-react'
import { Link } from 'react-router-dom'
import { LastChapters } from './lastChapters'
import { MangaInfoProps } from '@/utils/interfaces'
import { languageFlags, languageTranslate } from '@/utils/utils'
import { Badge } from '@/components/ui/badge'

export const MangaInfo = ({ manga, mangaDexId }: MangaInfoProps) => {
  const coverArt = manga.relationships.find((rel) => rel.type === 'cover_art')
    ?.attributes?.fileName

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
          alt={`${manga.attributes.title.en} Manga Cover`}
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
        <h1 className="text-4xl font-bold mb-4">{manga.attributes.title.en}</h1>
        <p className="text-text-muted mb-4">
          {manga.attributes.description.en}
        </p>
        <div className="grid grid-cols-2 gap-4 mb-2">
          <div className="flex items-center">
            <Calendar className="w-5 h-5 mr-2" />
            <span>
              <span>{manga.attributes.year}</span>
            </span>
          </div>
          <div className="flex items-end">
            <Clock className="w-5 h-5 mr-2" />
            <span>{manga.attributes.status || 'Unknow'}</span>
          </div>
          <div className="flex items-end mb-4">
            <span className='text-lg'>Original language:</span>
            <img src={languageFlags[manga.attributes.originalLanguage]} alt="" className='w-6 h-6 mr-1 ml-1'/>
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
        <div className="mt-4">
          <p>
            <strong>Available Languages:</strong>
          </p>
          <div className="flex flex-wrap gap-2 mt-2">
            {manga.attributes.altTitles.map((lang, index) => {
              const languageCode = Object.keys(lang)[0]
              const flag = languageFlags[languageCode] || '🏳️'
              return (
                <Badge key={index} variant="secondary" className="text-sm">
                  <img src={flag} alt={`${languageFlags[flag]} flag`} className='mr-2' /> <span>{languageTranslate[languageCode]}</span>
                </Badge>
              )
            })}
          </div>
        </div>
        {mangaDexId && <LastChapters mangaDexId={mangaDexId} />}
      </div>
    </div>
  )
}
