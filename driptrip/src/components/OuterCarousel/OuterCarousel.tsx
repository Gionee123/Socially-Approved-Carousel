import React, { useRef, useState, useEffect, useCallback } from 'react'
import { FiChevronLeft, FiChevronRight, FiPlay, FiPause, FiVolume2, FiVolumeX } from 'react-icons/fi'
import type { Video } from '../../data/dummyVideos'
import InnerModal from '../InnerModal/InnerModal'

/* ─── Video Card ──────────────────────────────────────────────── */
const VideoCard: React.FC<{ video: Video; onClick: () => void }> = ({ video, onClick }) => {
  const cardRef = useRef<HTMLDivElement>(null)
  const videoRef = useRef<HTMLVideoElement>(null)
  const [isVisible, setIsVisible] = useState(false)
  const [isHovered, setIsHovered] = useState(false)
  const [isMuted, setIsMuted] = useState(true)
  const [isPlaying, setIsPlaying] = useState(true)

  useEffect(() => {
    const observer = new IntersectionObserver(([e]) => setIsVisible(e.isIntersecting), {
      threshold: 0.1,
    })
    if (cardRef.current) observer.observe(cardRef.current)
    return () => observer.disconnect()
  }, [])

  useEffect(() => {
    if (videoRef.current) {
      if (isHovered && isPlaying) {
        videoRef.current.play().catch(() => {})
      } else {
        videoRef.current.pause()
      }
    }
  }, [isHovered, isPlaying])

  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.muted = isMuted
    }
  }, [isMuted])

  const togglePlay = (e: React.MouseEvent) => {
    e.stopPropagation()
    setIsPlaying(!isPlaying)
  }

  const toggleMute = (e: React.MouseEvent) => {
    e.stopPropagation()
    setIsMuted(!isMuted)
  }

  return (
    <div
      ref={cardRef}
      onClick={onClick}
      onMouseEnter={() => {
        setIsHovered(true)
        setIsPlaying(true)
      }}
      onMouseLeave={() => {
        setIsHovered(false)
      }}
      className="flex-shrink-0 relative cursor-pointer rounded-2xl overflow-hidden group transition-transform duration-300 hover:scale-105 hover:shadow-2xl"
      style={{ width: '176px', height: '313px' }}
    >
      {/* Video preview or thumbnail */}
      {isVisible && isHovered ? (
        <video
          ref={videoRef}
          src={video.videoUrl}
          poster={video.thumbnail}
          className="w-full h-full object-cover animate-fade-in"
          loop
          playsInline
          muted={isMuted}
        />
      ) : isVisible ? (
        <img
          src={video.thumbnail}
          alt={video.title}
          className="w-full h-full object-cover"
          loading="lazy"
        />
      ) : (
        <div className="w-full h-full bg-gray-800 animate-pulse" />
      )}

      {/* Gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" />

      {/* Hover Controls */}
      {isHovered && (
        <div className="absolute top-2 right-2 flex items-center gap-1.5 z-10">
          <button
            onClick={toggleMute}
            className="p-1.5 bg-black/60 hover:bg-black/80 rounded-full text-white transition-colors"
            title={isMuted ? 'Unmute' : 'Mute'}
          >
            {isMuted ? <FiVolumeX size={13} /> : <FiVolume2 size={13} />}
          </button>
          <button
            onClick={togglePlay}
            className="p-1.5 bg-black/60 hover:bg-black/80 rounded-full text-white transition-colors"
            title={isPlaying ? 'Pause' : 'Play'}
          >
            {isPlaying ? <FiPause size={13} /> : <FiPlay size={13} />}
          </button>
        </div>
      )}

      {/* Play icon on hover (only show if video is not currently active/hovered) */}
      {!isHovered && (
        <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-200">
          <div className="w-12 h-12 bg-black/50 rounded-full flex items-center justify-center backdrop-blur-sm">
            <FiChevronRight className="text-white ml-1" size={22} />
          </div>
        </div>
      )}
    </div>
  )
}

/* ─── Outer Carousel ──────────────────────────────────────────── */
const OuterCarousel: React.FC<{ videos: Video[] }> = ({ videos }) => {
  const scrollRef = useRef<HTMLDivElement>(null)
  const [modalOpen, setModalOpen] = useState(false)
  const [selectedIndex, setSelectedIndex] = useState(0)
  const [canScrollLeft, setCanScrollLeft] = useState(false)
  const [canScrollRight, setCanScrollRight] = useState(true)

  const updateBtns = useCallback(() => {
    const el = scrollRef.current
    if (!el) return
    setCanScrollLeft(el.scrollLeft > 4)
    setCanScrollRight(el.scrollLeft + el.clientWidth < el.scrollWidth - 4)
  }, [])

  useEffect(() => {
    const el = scrollRef.current
    if (!el) return
    el.addEventListener('scroll', updateBtns, { passive: true })
    updateBtns()
    return () => el.removeEventListener('scroll', updateBtns)
  }, [updateBtns])

  const scroll = (dir: 'left' | 'right') =>
    scrollRef.current?.scrollBy({ left: dir === 'left' ? -400 : 400, behavior: 'smooth' })

  const openModal = (idx: number) => {
    setSelectedIndex(idx)
    setModalOpen(true)
  }

  return (
    <section className="relative py-8">
      {/* Section heading */}
      <div className="flex items-center justify-between mb-5 px-4 md:px-8">
        <div>
          <h2 className="text-2xl md:text-3xl font-extrabold text-white tracking-tight">
            🎯 Socially Approved
          </h2>
          <p className="text-gray-400 text-sm mt-1">See what fitness lovers are buying right now</p>
        </div>
        <span className="text-orange-400 text-sm font-semibold cursor-pointer hover:text-orange-300 transition-colors">
          View All →
        </span>
      </div>

      {/* Carousel wrapper */}
      <div className="relative">
        {/* Left arrow */}
        <button
          onClick={() => scroll('left')}
          className={`absolute left-1 top-1/2 -translate-y-1/2 z-10 bg-white hover:bg-orange-50 rounded-full w-10 h-10 flex items-center justify-center shadow-xl transition-all duration-200 hover:scale-110 ${canScrollLeft ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}
        >
          <FiChevronLeft size={20} className="text-gray-800" />
        </button>

        {/* Scrollable track */}
        <div
          ref={scrollRef}
          className="flex gap-4 overflow-x-auto px-4 md:px-8 pb-3 scroll-smooth"
          style={{ scrollbarWidth: 'none' }}
        >
          {videos.map((video, idx) => (
            <VideoCard key={video.id} video={video} onClick={() => openModal(idx)} />
          ))}
        </div>

        {/* Right arrow */}
        <button
          onClick={() => scroll('right')}
          className={`absolute right-1 top-1/2 -translate-y-1/2 z-10 bg-white hover:bg-orange-50 rounded-full w-10 h-10 flex items-center justify-center shadow-xl transition-all duration-200 hover:scale-110 ${canScrollRight ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}
        >
          <FiChevronRight size={20} className="text-gray-800" />
        </button>

        {/* Left fade edge */}
        <div className="pointer-events-none absolute left-0 top-0 h-full w-16 bg-gradient-to-r from-gray-950 to-transparent" />
        {/* Right fade edge */}
        <div className="pointer-events-none absolute right-0 top-0 h-full w-16 bg-gradient-to-l from-gray-950 to-transparent" />
      </div>

      {/* Inner Modal */}
      {modalOpen && (
        <InnerModal
          videos={videos}
          initialIndex={selectedIndex}
          onClose={() => setModalOpen(false)}
        />
      )}
    </section>
  )
}

export default OuterCarousel
