import { AnimeInfoProps } from '@/utils/propsInterface'

export default function CharacterList({ anime }: AnimeInfoProps) {
  return (
    <div className="mt-4 mb-2">
      <p className="mb-2 text-xl">
        <strong>Main Characters:</strong>
      </p>
      <div className="p-4 space-y-4">
      {anime.characters.edges.map((character) => (
        <div
          key={character.node.id}
          className="bg-background-light rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-200"
        >
          <div className="flex items-center p-4">
            <div className="flex items-center flex-1">
              <div className="w-16 h-16 rounded-full overflow-hidden flex-shrink-0">
                <img
                  src={character.node.image.large}
                  alt={character.node.name.full}
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="ml-4">
                <h3 className="text-lg font-semibold text-text">{character.node.name.full}</h3>
                <p className="text-sm text-gray-500">Main</p>
              </div>
            </div>
            <div className="flex items-center gap-4">
              {character.voiceActors.map((actor) => (
                <div key={actor.id} className="flex items-center">
                  <div className="mr-4 text-right">
                    <p className="text-sm font-medium text-text">{actor.name.full}</p>
                    <p className="text-xs text-gray-500">Japanese</p>
                  </div>
                  <div className="w-16 h-16 rounded-full overflow-hidden flex-shrink-0">
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
    </div>
    </div>
  )
}
