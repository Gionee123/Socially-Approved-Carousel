import React from 'react'
import { Link } from 'react-router-dom'

const NotFoundPage: React.FC = () => {
  return (
    <main className="flex-1 min-h-screen bg-gray-950 flex flex-col items-center justify-center text-center px-4">
      <h1 className="text-8xl font-extrabold text-orange-400 mb-4">404</h1>
      <p className="text-2xl text-white font-semibold mb-2">Page Not Found</p>
      <p className="text-gray-400 mb-8">Oops! The page you're looking for doesn't exist.</p>
      <Link
        to="/"
        className="bg-orange-500 hover:bg-orange-400 text-white font-semibold px-6 py-3 rounded-xl transition-colors"
      >
        Go Back Home
      </Link>
    </main>
  )
}

export default NotFoundPage
