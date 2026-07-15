import React, { useState, useEffect, useRef, useCallback } from 'react'
import { FiX, FiChevronLeft, FiChevronRight, FiSend } from 'react-icons/fi'
import {
  FaHeart, FaRegHeart, FaShareAlt,
  FaVolumeUp, FaVolumeMute, FaPlay, FaCommentDots
} from 'react-icons/fa'
import type { Video } from '../../data/dummyVideos'
import axios from 'axios'

/* ─── Types ───────────────────────────────────────────────────── */
interface InnerModalProps {
  videos: Video[]
  initialIndex: number
  onClose: () => void
}

interface VideoPlayerCardProps {
  video: Video
  isActive: boolean
  isMuted: boolean
  liked: boolean
  likeCount: number
  commentCount: number
  onLike: () => void
  onOpenComments: () => void
}

/* ─── Video Player Card ───────────────────────────────────────── */
const VideoPlayerCard: React.FC<VideoPlayerCardProps> = ({
  video, isActive, isMuted, liked, likeCount, commentCount, onLike, onOpenComments
}) => {
  const videoRef = useRef<HTMLVideoElement>(null)
  const [isPlaying, setIsPlaying] = useState(false)
  const [progress, setProgress] = useState(0)
  const [isLoading, setIsLoading] = useState(true)
  const [copied, setCopied] = useState(false)

  /* auto-play / pause when isActive changes */
  useEffect(() => {
    const vid = videoRef.current
    if (!vid) return
    if (isActive) {
      vid.play().then(() => setIsPlaying(true)).catch(() => { })
    } else {
      vid.pause()
      vid.currentTime = 0
      setIsPlaying(false)
      setProgress(0)
    }
  }, [isActive])

  /* sync mute */
  useEffect(() => {
    if (videoRef.current) videoRef.current.muted = isMuted
  }, [isMuted])

  const handleTimeUpdate = () => {
    const vid = videoRef.current
    if (!vid || !vid.duration) return
    setProgress((vid.currentTime / vid.duration) * 100)
  }

  const togglePlay = (e: React.MouseEvent) => {
    e.stopPropagation()
    const vid = videoRef.current
    if (!vid) return
    if (isPlaying) { vid.pause(); setIsPlaying(false) }
    else { vid.play().then(() => setIsPlaying(true)).catch(() => { }) }
  }

  const handleShare = async (e: React.MouseEvent) => {
    e.stopPropagation()
    const shareData = {

      url: typeof window !== "undefined" ? window.location.href : "",
    };

    if (typeof navigator !== "undefined" && navigator.share) {
      try {
        await navigator.share(shareData);
      } catch (err) {
        console.warn("Share failed or cancelled:", err);
      }
    } else {
      try {
        await navigator.clipboard.writeText(shareData.url);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
      } catch (err) {
        console.error("Failed to copy link:", err);
      }
    }
  };


  return (
    <div className="relative w-full h-full rounded-2xl overflow-hidden bg-black shadow-2xl">
      {/* Video element */}
      <video
        ref={videoRef}
        src={video.videoUrl}
        className="w-full h-full object-cover"
        loop
        playsInline
        muted={isMuted}
        preload="metadata"
        onTimeUpdate={handleTimeUpdate}
        onWaiting={() => setIsLoading(true)}
        onPlaying={() => setIsLoading(false)}
        onCanPlay={() => setIsLoading(false)}
        onLoadedData={() => setIsLoading(false)}
        onClick={isActive ? togglePlay : undefined}
      />

      {/* Loading spinner */}
      {isLoading && isActive && (
        <div className="absolute inset-0 flex items-center justify-center bg-black/40 z-10">
          <div className="w-10 h-10 border-4 border-white/30 border-t-white rounded-full animate-spin" />
        </div>
      )}

      {/* Progress bar — top */}
      <div className="absolute top-0 left-0 right-0 h-[3px] bg-white/30 z-20">
        <div
          className="h-full bg-white transition-all duration-100"
          style={{ width: `${progress}%` }}
        />
      </div>

      {/* Creator info — top left */}
      <div className="absolute top-4 left-3 flex items-center gap-2 z-20">
        <img
          src={video.creatorAvatar}
          alt={video.creator}
          className="w-8 h-8 rounded-full border-2 border-white object-cover"
        />
        <span className="text-white text-xs font-semibold drop-shadow-lg">
          @{video.creator}
        </span>
      </div>

      {/* Play / Pause center tap */}
      {isActive && !isLoading && (
        <button
          onClick={togglePlay}
          className="absolute inset-0 flex items-center justify-center z-10 group"
        >
          {!isPlaying && (
            <div className="w-16 h-16 bg-black/50 rounded-full flex items-center justify-center backdrop-blur-sm group-hover:scale-110 transition-transform">
              <FaPlay className="text-white ml-1" size={22} />
            </div>
          )}
        </button>
      )}

      {/* Right side actions */}
      {isActive && (
        <div className="absolute right-3 top-1/2 -translate-y-1/2 flex flex-col items-center gap-5 z-20">
          {/* Like */}
          <button onClick={(e) => { e.stopPropagation(); onLike() }} className="flex flex-col items-center gap-1 group">
            {liked
              ? <FaHeart className="text-red-500 group-hover:scale-125 transition-transform" size={26} />
              : <FaRegHeart className="text-white group-hover:scale-125 transition-transform" size={26} />}
            <span className="text-white text-xs font-semibold">{likeCount}</span>
          </button>

          {/* Comments */}
          <button onClick={(e) => { e.stopPropagation(); onOpenComments() }} className="flex flex-col items-center gap-1 group">
            <FaCommentDots className="text-white group-hover:scale-125 transition-transform" size={26} />
            <span className="text-white text-xs font-semibold">{commentCount}</span>
          </button>

          {/* Share */}
          <button onClick={handleShare} className="flex flex-col items-center gap-1 relative group">
            <FaShareAlt className="text-white group-hover:scale-125 transition-transform" size={22} />

            {copied && (
              <span className="absolute right-8 top-0 bg-black/80 text-white text-xs px-2 py-1 rounded-lg whitespace-nowrap">
                Copied!
              </span>
            )}
          </button>
        </div>
      )}

      {/* Bottom gradient */}
      <div className="absolute bottom-0 left-0 right-0 h-48 bg-gradient-to-t from-black/80 to-transparent z-10" />

      {/* Product card — bottom */}

    </div>
  )
}

/* ─── Inner Modal ─────────────────────────────────────────────── */
const InnerModal: React.FC<InnerModalProps> = ({ videos, initialIndex, onClose }) => {
  const [currentIndex, setCurrentIndex] = useState(initialIndex)
  const [isMuted, setIsMuted] = useState(true)

  // Likes State
  const [likedSet, setLikedSet] = useState<Set<string>>(new Set())
  const [likeCounts, setLikeCounts] = useState<Record<string, number>>(
    () => Object.fromEntries(videos.map(v => [v.id, v.likes]))
  )

  // Comments State
  const [isCommentsOpen, setIsCommentsOpen] = useState(false)
  const [comments, setComments] = useState<any[]>([])
  const [commentCounts, setCommentCounts] = useState<Record<string, number>>(
    () => Object.fromEntries(videos.map(v => [v.id, v.comments || 0]))
  )
  const [loadingComments, setLoadingComments] = useState(false)
  const [commentName, setCommentName] = useState('')
  const [commentText, setCommentText] = useState('')

  /* lock body scroll */
  useEffect(() => {
    document.body.style.overflow = 'hidden'
    return () => { document.body.style.overflow = '' }
  }, [])

  /* keyboard navigation */
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (isCommentsOpen) return; // disable when typing comments
      if (e.key === 'ArrowLeft') setCurrentIndex(i => Math.max(0, i - 1))
      if (e.key === 'ArrowRight') setCurrentIndex(i => Math.min(videos.length - 1, i + 1))
      if (e.key === 'Escape') onClose()
      if (e.key === 'm' || e.key === 'M') setIsMuted(m => !m)
    }
    window.addEventListener('keydown', handler)
    return () => window.removeEventListener('keydown', handler)
  }, [videos.length, onClose, isCommentsOpen])

  // Fetch likes initialization logic could go here if we had user-specific likes fetch endpoint. 
  // For now, we allow toggling and track in local state + send to API.
  const toggleLike = useCallback(async (videoId: string) => {
    // Optimistic UI update
    setLikedSet(prev => {
      const next = new Set(prev)
      const isNowLiked = !next.has(videoId)
      if (isNowLiked) next.add(videoId); else next.delete(videoId)
      setLikeCounts(c => ({ ...c, [videoId]: c[videoId] + (isNowLiked ? 1 : -1) }))
      return next
    })

    // API Call
    try {
      await axios.post(`${import.meta.env.VITE_API_BASE_URL || 'http://localhost:5000'}/api/website/like/toggle`, { videoId })
    } catch (err) {
      console.error('Failed to toggle like', err)
      // Revert optimistic update on failure
      setLikedSet(prev => {
        const next = new Set(prev)
        const isNowLiked = !next.has(videoId)
        if (isNowLiked) next.add(videoId); else next.delete(videoId)
        setLikeCounts(c => ({ ...c, [videoId]: c[videoId] + (isNowLiked ? 1 : -1) }))
        return next
      })
    }
  }, [])

  const fetchComments = async (videoId: string) => {
    setLoadingComments(true);
    try {
      const res = await axios.post(`${import.meta.env.VITE_API_BASE_URL || 'http://localhost:5000'}/api/website/comment/video`, { videoId });
      if (res.data.status) {
        setComments(res.data.data);
        setCommentCounts(prev => ({ ...prev, [videoId]: res.data.data.length }));
      }
    } catch (err) {
      console.error('Failed to load comments', err);
    } finally {
      setLoadingComments(false);
    }
  };

  const handleOpenComments = (videoId: string) => {
    setIsCommentsOpen(true);
    fetchComments(videoId);
  };

  const submitComment = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!commentName.trim() || !commentText.trim()) return;

    const currentVideoId = videos[currentIndex].id;
    try {
      await axios.post(`${import.meta.env.VITE_API_BASE_URL || 'http://localhost:5000'}/api/website/comment/add`, {
        videoId: currentVideoId,
        name: commentName,
        comment: commentText
      });
      setCommentText('');
      fetchComments(currentVideoId); // Refresh comments list
    } catch (err) {
      console.error('Failed to add comment', err);
      alert('Failed to submit comment');
    }
  };


  const cardSpecs: { offset: -1 | 0 | 1; width: number; height: number; opacity: number; scale: number }[] = [
    { offset: -1, width: 260, height: 462, opacity: 0.65, scale: 0.88 },
    { offset: 0, width: 340, height: 600, opacity: 1, scale: 1 },
    { offset: 1, width: 260, height: 462, opacity: 0.65, scale: 0.88 },
  ]

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/85 backdrop-blur-md overflow-hidden"
      onClick={onClose}
    >
      {/* Close */}
      <button
        onClick={(e) => { e.stopPropagation(); onClose() }}
        className="absolute top-4 right-4 z-50 bg-white/10 hover:bg-white/20 text-white rounded-full w-10 h-10 flex items-center justify-center backdrop-blur-sm transition-colors"
      >
        <FiX size={20} />
      </button>

      {/* Mute toggle */}
      <button
        onClick={(e) => { e.stopPropagation(); setIsMuted(m => !m) }}
        className="absolute top-4 left-4 z-50 bg-white/10 hover:bg-white/20 text-white rounded-full w-10 h-10 flex items-center justify-center backdrop-blur-sm transition-colors"
      >
        {isMuted ? <FaVolumeMute size={18} /> : <FaVolumeUp size={18} />}
      </button>

      {/* 3-card layout */}
      <div className={`relative flex items-center justify-center w-full h-full transition-transform duration-300 ${isCommentsOpen ? '-translate-x-32 md:-translate-x-48' : ''}`} onClick={(e) => e.stopPropagation()}>
        {cardSpecs.map(({ offset, width, height, opacity, scale }) => {
          const idx = currentIndex + offset
          if (idx < 0 || idx >= videos.length) return null
          const video = videos[idx]
          const isSide = offset !== 0

          return (
            <div
              key={video.id}
              className="absolute transition-all duration-300 ease-in-out"
              style={{
                width,
                height,
                opacity,
                transform: `
                  translateX(${offset === -1 ? `calc(-${width / 2}px - 182px)` : offset === 1 ? `calc(${width / 2}px + 182px)` : '-50%'})
                  translateX(-50%)
                  scale(${scale})
                `,
                left: '50%',
                cursor: isSide ? 'pointer' : 'default',
                zIndex: isSide ? 10 : 20,
              }}
              onClick={isSide ? () => { setCurrentIndex(idx); setIsCommentsOpen(false); } : undefined}
            >
              <VideoPlayerCard
                video={video}
                isActive={offset === 0}
                isMuted={isMuted}
                liked={likedSet.has(video.id)}
                likeCount={likeCounts[video.id] ?? video.likes}
                commentCount={commentCounts[video.id] ?? video.comments ?? 0}
                onLike={() => toggleLike(video.id)}
                onOpenComments={() => handleOpenComments(video.id)}
              />
              {/* Side card click hint */}
              {isSide && (
                <div className="absolute inset-0 flex items-center justify-center rounded-2xl">
                  {offset === -1
                    ? <FiChevronLeft className="text-white/80" size={32} />
                    : <FiChevronRight className="text-white/80" size={32} />}
                </div>
              )}
            </div>
          )
        })}
      </div>

      {/* Comments Sliding Panel */}
      <div
        className={`absolute right-0 top-0 bottom-0 w-80 md:w-96 bg-gray-900 border-l border-gray-800 shadow-2xl transition-transform duration-300 z-40 flex flex-col ${isCommentsOpen ? 'translate-x-0' : 'translate-x-full'
          }`}
        onClick={(e) => e.stopPropagation()}
      >
        <div className="p-4 border-b border-gray-800 flex items-center justify-between">
          <h3 className="text-white font-bold text-lg flex items-center gap-2">
            <FaCommentDots className="text-orange-400" />
            Comments
          </h3>
          <button onClick={() => setIsCommentsOpen(false)} className="text-gray-400 hover:text-white transition-colors">
            <FiX size={24} />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto p-4 flex flex-col gap-4">
          {loadingComments ? (
            <div className="text-gray-400 text-center text-sm mt-4">Loading comments...</div>
          ) : comments.length === 0 ? (
            <div className="text-gray-500 text-center text-sm mt-4">No comments yet. Be the first to comment!</div>
          ) : (
            comments.map(c => (
              <div key={c._id} className="flex gap-3">
                <div className="w-8 h-8 rounded-full bg-orange-500/20 text-orange-400 flex items-center justify-center font-bold text-sm shrink-0 uppercase">
                  {c.name.charAt(0)}
                </div>
                <div>
                  <div className="flex items-baseline gap-2">
                    <span className="text-gray-200 text-sm font-semibold">{c.name}</span>
                    <span className="text-gray-500 text-[10px]">{new Date(c.createdAt).toLocaleDateString()}</span>
                  </div>
                  <p className="text-gray-400 text-sm mt-0.5 break-words">{c.comment}</p>
                </div>
              </div>
            ))
          )}
        </div>

        <div className="p-4 border-t border-gray-800 bg-gray-900">
          <form onSubmit={submitComment} className="flex flex-col gap-2">
            <input
              type="text"
              placeholder="Your name"
              value={commentName}
              onChange={(e) => setCommentName(e.target.value)}
              className="bg-gray-800 text-white text-sm rounded-lg px-3 py-2 outline-none border border-gray-700 focus:border-orange-500 transition-colors"
              required
            />
            <div className="flex gap-2 relative">
              <input
                type="text"
                placeholder="Add a comment..."
                value={commentText}
                onChange={(e) => setCommentText(e.target.value)}
                className="flex-1 bg-gray-800 text-white text-sm rounded-lg pl-3 pr-10 py-3 outline-none border border-gray-700 focus:border-orange-500 transition-colors"
                required
              />
              <button
                type="submit"
                className="absolute right-2 top-1/2 -translate-y-1/2 text-orange-400 hover:text-orange-300 p-1 transition-colors disabled:opacity-50"
                disabled={!commentName.trim() || !commentText.trim()}
              >
                <FiSend size={18} />
              </button>
            </div>
          </form>
        </div>
      </div>

      {/* Prev arrow */}
      {currentIndex > 0 && (
        <button
          onClick={(e) => { e.stopPropagation(); setCurrentIndex(i => i - 1); setIsCommentsOpen(false); }}
          className={`absolute left-4 z-30 bg-white/10 hover:bg-white/25 text-white rounded-full w-12 h-12 flex items-center justify-center backdrop-blur-sm transition-all hover:scale-110 ${isCommentsOpen ? 'hidden md:flex' : ''}`}
        >
          <FiChevronLeft size={24} />
        </button>
      )}

      {/* Next arrow */}
      {currentIndex < videos.length - 1 && (
        <button
          onClick={(e) => { e.stopPropagation(); setCurrentIndex(i => i + 1); setIsCommentsOpen(false); }}
          className={`absolute right-4 z-30 bg-white/10 hover:bg-white/25 text-white rounded-full w-12 h-12 flex items-center justify-center backdrop-blur-sm transition-all hover:scale-110 ${isCommentsOpen ? 'mr-[320px] md:mr-96' : ''}`}
        >
          <FiChevronRight size={24} />
        </button>
      )}

      {/* Dot indicator */}
      <div className={`absolute bottom-5 left-1/2 -translate-x-1/2 flex gap-1.5 z-30 transition-transform duration-300 ${isCommentsOpen ? '-translate-x-32 md:-translate-x-48' : ''}`}>
        {videos.map((_, i) => (
          <button
            key={i}
            onClick={(e) => { e.stopPropagation(); setCurrentIndex(i); setIsCommentsOpen(false); }}
            className={`rounded-full transition-all duration-300 ${i === currentIndex ? 'w-6 h-2 bg-white' : 'w-2 h-2 bg-white/35 hover:bg-white/60'
              }`}
          />
        ))}
      </div>
    </div>
  )
}

export default InnerModal
