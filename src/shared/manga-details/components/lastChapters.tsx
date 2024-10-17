import { Link } from 'react-router-dom'

export const LastChapters = () => {
  return (
    <div>
      <h2 className="text-2xl font-bold mb-2">Latest Chapters</h2>
      <ul className="space-y-2">
        <li className="bg-background-light p-3 rounded-lg flex justify-between items-center">
          <span>Chapter 1000: The New Era</span>
          <Link className="text-blue-400 hover:underline" to="#">
            Read
          </Link>
        </li>
        <li className="bg-background-light p-3 rounded-lg flex justify-between items-center">
          <span>Chapter 999: The Sake I Brewed to Drink with You</span>
          <Link className="text-blue-400 hover:underline" to="#">
            Read
          </Link>
        </li>
        <li className="bg-background-light p-3 rounded-lg flex justify-between items-center">
          <span>Chapter 998: Ruffian Meets Ruffian</span>
          <Link className="text-blue-400 hover:underline" to="#">
            Read
          </Link>
        </li>
      </ul>
    </div>
  )
}
