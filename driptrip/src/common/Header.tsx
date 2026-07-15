import React from 'react'
import { Link } from 'react-router-dom'

const Header: React.FC = () => {
  return (
    <header className="w-full bg-gray-900 text-white px-6 py-4 flex items-center justify-between shadow-md">
      <Link to="/" className="text-xl font-bold tracking-wide text-orange-400 hover:text-orange-300 transition-colors">
        Socially Approved
      </Link>
      <nav className="flex gap-6 text-sm font-medium">
        <Link to="/" className="hover:text-orange-400 transition-colors">Home</Link>
        <Link to="/login" className="hover:text-orange-400 transition-colors">Login</Link>
      </nav>
    </header>
  )
}

export default Header
