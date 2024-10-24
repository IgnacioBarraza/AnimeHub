import { useMangaContext } from '@/hooks/mangaHook'
import { Chapter } from '@/utils/interfaces'
import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { Pagination } from './paginator'
import { LastChaptersProps } from '@/utils/propsInterface'

const CHAPTERS_PER_PAGE = 4

export const LastChapters = ({ mangaDexId }: LastChaptersProps) => {
  const { fetchLastChapters } = useMangaContext()
  const [chapters, setChapters] = useState<Chapter[]>([]) // Use the Chapter interface
  const [loading, setLoading] = useState(true)
  const [currentPage, setCurrentPage] = useState(1)

  useEffect(() => {
    const fetchChapters = async () => {
      if (mangaDexId) {
        const lastChapters = await fetchLastChapters(mangaDexId)
        lastChapters.sort((a, b) => {
          const chapterA = parseFloat(a.attributes.chapter)
          const chapterB = parseFloat(b.attributes.chapter)
          return chapterB - chapterA // Descending order
        })
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

  // Calculate the chapters for the current page
  const totalChapters = chapters.length
  const totalPages = Math.ceil(totalChapters / CHAPTERS_PER_PAGE)
  const startIndex = (currentPage - 1) * CHAPTERS_PER_PAGE
  const endIndex = startIndex + CHAPTERS_PER_PAGE
  const chaptersToDisplay = chapters.slice(startIndex, endIndex)

  return (
    <div>
      <h2 className="text-2xl font-bold mb-2">Chapters</h2>
      <ul className="space-y-2">
        {chaptersToDisplay.map((chapter) => (
          <li
            key={chapter.id}
            className="bg-background-light p-3 rounded-lg flex justify-between items-center"
          >
            <span>
              Chapter {chapter.attributes.chapter}:{' '}
              {chapter.attributes.title || 'Untitled'}
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

      {/* Pagination Controls */}
      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={setCurrentPage}
      />
    </div>
  )
}
