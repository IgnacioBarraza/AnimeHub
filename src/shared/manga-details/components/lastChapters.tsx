import { useMangaContext } from '@/hooks/mangaHook'
import { LastChaptersProps, Chapter } from '@/utils/interfaces'
import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'

export const LastChapters = ({ mangaDexId }: LastChaptersProps) => {
  const { fetchLastChapters } = useMangaContext()
  const [chapters, setChapters] = useState<Chapter[]>([]) // Use the Chapter interface
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchChapters = async () => {
      if (mangaDexId) {
        const lastChapters = await fetchLastChapters(mangaDexId)
        setChapters(lastChapters)
        setLoading(false)
      }
    }

    fetchChapters()
  }, [mangaDexId, fetchLastChapters])

  if (loading) {
    return <div>Loading...</div>
  }

  if (chapters.length === 0) {
    return <div>No chapters found.</div>
  }

  return (
    <div>
      <h2 className="text-2xl font-bold mb-2">Latest Chapters</h2>
      <ul className="space-y-2">
        {chapters.map((chapter) => (
          <li key={chapter.id} className="bg-background-light p-3 rounded-lg flex justify-between items-center">
            <span>
              Chapter {chapter.attributes.chapter}: {chapter.attributes.title || 'Untitled'}
            </span>
            <Link
              className="text-blue-400 hover:underline"
              to={`https://mangadex.org/chapter/${chapter.id}`}
              target="_blank"
              rel="noopener noreferrer"
            >
              Read
            </Link>
          </li>
        ))}
      </ul>
    </div>
  )
}
