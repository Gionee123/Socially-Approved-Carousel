import React from 'react'

interface LoadingProps {
  size?: 'sm' | 'md' | 'lg'
  fullScreen?: boolean
}

const sizeMap = {
  sm: 'w-6 h-6 border-2',
  md: 'w-10 h-10 border-4',
  lg: 'w-16 h-16 border-4',
}

const Loading: React.FC<LoadingProps> = ({ size = 'md', fullScreen = false }) => {
  const spinner = (
    <div
      className={`${sizeMap[size]} rounded-full border-orange-400 border-t-transparent animate-spin`}
      role="status"
      aria-label="Loading..."
    />
  )

  if (fullScreen) {
    return (
      <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm">
        {spinner}
      </div>
    )
  }

  return (
    <div className="flex items-center justify-center w-full h-full">
      {spinner}
    </div>
  )
}

export default Loading
