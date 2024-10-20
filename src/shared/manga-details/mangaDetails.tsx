import { useEffect, useState } from 'react'
import { useSearchParams } from 'react-router-dom'
import { useMangaContext } from '@/hooks/mangaHook'
import { MangaDexData } from '@/utils/interfaces'
import { MangaInfo } from './components/mangaInfo'

export default function MangaDetails() {
  const [searchParams] = useSearchParams()
  const [manga, setManga] = useState<MangaDexData | null>(null)
  const { getStoredMangaById, getMangaDexIdByTitle } = useMangaContext()
  const id = searchParams.get('id')

  useEffect(() => {
    const fetchManga = async () => {
      if (id) {
        const storedManga = getStoredMangaById(id)
        if (storedManga) setManga(storedManga)
      }
    }
    fetchManga()
  }, [id, getStoredMangaById, getMangaDexIdByTitle])

  return (
    <div className="container mx-auto px-4 py-8">
      {manga ? (
        <MangaInfo manga={manga} mangaDexId={manga.id}/>
      ) : (
        <div className="text-center mt-8">
          <h2 className="text-2xl font-bold">Manga Not Found</h2>
        </div>
      )}
    </div>
  )
}
