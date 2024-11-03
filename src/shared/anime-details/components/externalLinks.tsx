import { AnimeInfoProps } from '@/utils/propsInterface'
import { platformColors } from '@/utils/utils'
import { Link } from 'react-router-dom'

export default function ExternalLinks({ anime }: AnimeInfoProps) {
  return (
    <div>
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
    </div>
  )
}
