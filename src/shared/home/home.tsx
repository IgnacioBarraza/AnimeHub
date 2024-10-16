import { categoriesDummy, Category } from '@/utils/interfaces'
import SeriesScroll from './components/section'

export default function Home() {
  const categories: Category[] = categoriesDummy

  return (
    <div className="w-10/12 mx-auto px-4 py-8">
      <section className="mb-12 flex flex-col md:flex-row items-center">
        <div className="flex-1 pr-0 md:pr-8 mb-6 md:mb-0">
          <h1 className="text-4xl font-bold mb-4">Discover new mangas</h1>
          <p className="text-xl text-muted-foreground mb-6">
            Explore a vast collection of captivating manga, from action-packed
            adventures to heartwarming romance dramas.
          </p>
          <button className="px-6 py-3 bg-primary text-primary-foreground rounded-md hover:bg-primary/90">
            Browse manga
          </button>
        </div>
        <div className="flex-1">
          <img
            src="/home-placeholder.webp"
            alt="Anime character"
            className="w-full h-auto rounded-lg shadow-lg"
          />
        </div>
      </section>
      {categories.map((category, index) => (
        <SeriesScroll
          key={index}
          title={category.title}
          series={category.series}
        />
      ))}
    </div>
  )
}
