import React from 'react'

const Footer: React.FC = () => {
  return (
    <footer className="w-full bg-gray-900 text-gray-400 text-center py-4 mt-auto text-sm">
      <p>© {new Date().getFullYear()} Socially Approved. All rights reserved.</p>
    </footer>
  )
}

export default Footer
