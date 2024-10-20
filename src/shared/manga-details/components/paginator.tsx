import { PaginationProps } from '@/utils/interfaces'
import { ChevronLeft, ChevronRight } from 'lucide-react'

export const Pagination = ({ currentPage, onPageChange, totalPages }: PaginationProps) => {
  const pageNumbers = Array.from({ length: totalPages }, (_, i) => i + 1)
  return (
    <div className="flex justify-between mt-4">
      <button
        onClick={() => onPageChange(Math.max(currentPage - 1, 1))}
        disabled={currentPage === 1}
        className="text-text bg-background-light p-2 rounded-full shadow-md disabled:opacity-50"
      >
        <ChevronLeft className="w-5 h-5" />
      </button>
      <div className="flex space-x-2">
        {pageNumbers.map((page) => (
          <button
            key={page}
            onClick={() => onPageChange(page)}
            className={`px-3 py-1 rounded ${
              currentPage === page
                ? 'bg-background-light p-2 text-text'
                : 'disabled:opacity-50'
            }`}
          >
            {page}
          </button>
        ))}
      </div>
      <button
        onClick={() => onPageChange(Math.min(currentPage + 1, totalPages))}
        disabled={currentPage === totalPages}
        className="text-text bg-background-light p-2 rounded-full shadow-md disabled:opacity-50"
      >
        <ChevronRight className="w-5 h-5" />
      </button>
    </div>
  )
}
