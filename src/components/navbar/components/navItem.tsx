import { NavItemProps } from '@/utils/propsInterface'
import { Link, useLocation } from 'react-router-dom'

export const NavItem = ({ href, children, onClick }: NavItemProps) => {
  const location = useLocation()
  const isActive = (path: string) => location.pathname === path
  return (
    <div className="relative group">
      <Link
        to={href}
        className={`hover:text-gray-300 relative ${
          isActive(href) ? 'font-bold text-text' : ''
        }`}
        onClick={onClick}
      >
        {children}
      </Link>
      {isActive(href) && (
        <div className="hidden md:block absolute left-1/4 bottom-0 w-1/2 h-1 bg-blue-500 rounded-full mt-1"></div>
      )}
    </div>
  )
}
