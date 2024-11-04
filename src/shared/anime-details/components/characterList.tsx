import { useState } from 'react'
import { AnimeInfoProps } from '@/utils/propsInterface'

export default function CharacterList({ anime }: AnimeInfoProps) {
  const [showAll, setShowAll] = useState(false)

  const mainCharacters = anime.characters.edges.filter(
    (character) => character.role === 'MAIN'
  )
  const otherCharacters = anime.characters.edges.filter(
    (character) => character.role !== 'MAIN'
  )

  const displayedCharacters = showAll ? mainCharacters.concat(otherCharacters) : mainCharacters.slice(0, 4)

  return (
    <div className="mt-4 mb-2">
      <p className="mb-2 text-xl">
        <strong>Characters:</strong>
      </p>
      <div className="p-4 space-y-4">
        {displayedCharacters.map((character) => (
          <div
            key={character.node.id}
            className="bg-background-light rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-200"
          >
            <div className="flex flex-col md:flex-row items-center p-4">
              <div className="flex items-center flex-1">
                <div className="w-12 h-12 md:w-16 md:h-16 rounded-full overflow-hidden flex-shrink-0">
                  <img
                    src={character.node.image.large}
                    alt={character.node.name.full}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="ml-4 text-center md:text-left">
                  <h3 className="text-lg font-semibold text-text">{character.node.name.full}</h3>
                  <p className="text-sm text-gray-500">
                    {character.role.charAt(0) + character.role.slice(1).toLowerCase()}
                  </p>
                </div>
              </div>
              <div className="flex flex-wrap justify-center gap-4 mt-4 md:mt-0">
                {character.voiceActors.map((actor) => (
                  <div key={actor.id} className="flex flex-col items-center md:flex-row">
                    <div className="text-center md:text-right md:mr-4">
                      <p className="text-sm font-medium text-text">{actor.name.full}</p>
                      <p className="text-xs text-gray-500">Japanese</p>
                    </div>
                    <div className="w-12 h-12 md:w-16 md:h-16 rounded-full overflow-hidden flex-shrink-0 mt-2 md:mt-0">
                      <img
                        src={actor.image.large}
                        alt={actor.name.full}
                        className="w-full h-full object-cover"
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        ))}
        {otherCharacters.length > 0 && (
          <button
            onClick={() => setShowAll(!showAll)}
            className="mt-4 px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary-dark transition-colors duration-200"
          >
            {showAll ? 'Show Less' : 'Show More'}
          </button>
        )}
      </div>
    </div>
  )
}
