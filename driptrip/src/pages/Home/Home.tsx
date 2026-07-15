import React, { useEffect, useState } from 'react'
import axios from 'axios'
import OuterCarousel from '../../components/OuterCarousel/OuterCarousel'
import { dummyVideos } from '../../data/dummyVideos'
import type { Video } from '../../data/dummyVideos'

const Home: React.FC = () => {
  const [videos, setVideos] = useState<Video[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchVideos = async () => {
      try {
        const res = await axios.post(`${import.meta.env.VITE_API_BASE_URL || 'http://localhost:5000'}/api/website/video/view`);
        if (res.data.status) {
          const apiVideos = res.data.data.map((v: any) => ({
            id: v._id,
            title: v.title || 'Awesome Video',
            videoUrl: v.videoUrl,
            thumbnail: v.thumbnail || 'https://images.unsplash.com/photo-1571019614242-c5c5dee9f50b?w=800&q=80',
            creator: 'Admin',
            creatorAvatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=admin',
            likes: v.likes || 0,
            shares: v.shares || 0,
            comments: v.comments || 0,
            price: 2999,
            originalPrice: 4999,
            discount: 40,
            productImage: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=400&q=80',
          }));
          setVideos(apiVideos.length > 0 ? apiVideos : dummyVideos);
        } else {
          setVideos(dummyVideos);
        }
      } catch (err) {
        console.error('Failed to fetch videos', err);
        setVideos(dummyVideos); // Fallback
      } finally {
        setLoading(false);
      }
    };

    fetchVideos();
  }, []);

  if (loading) {
    return (
      <main className="flex-1 bg-gray-950 min-h-screen flex items-center justify-center">
        <div className="w-12 h-12 border-4 border-orange-500 border-t-transparent rounded-full animate-spin"></div>
      </main>
    );
  }

  return (
    <main className="flex-1 bg-gray-950 min-h-screen">
      {/* Hero banner */}
      <div className="relative overflow-hidden bg-gradient-to-br from-gray-900 via-gray-950 to-black py-12 px-4 md:px-8 border-b border-gray-800">
        <div className="max-w-7xl mx-auto">
          <p className="text-orange-400 text-sm font-semibold tracking-widest uppercase mb-2">
            Trending Now 🔥
          </p>
          <h1 className="text-4xl md:text-5xl font-extrabold text-white leading-tight max-w-xl">
            Gear Up for Your <span className="text-orange-400">Best Self</span>
          </h1>
          <p className="text-gray-400 mt-3 max-w-lg text-sm md:text-base">
            Discover top-rated fitness products loved by the community. Real people, real results.
          </p>
        </div>
        {/* Decorative glow */}
        <div className="absolute -top-20 -right-20 w-72 h-72 bg-orange-500/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute -bottom-10 left-10 w-48 h-48 bg-violet-500/10 rounded-full blur-3xl pointer-events-none" />
      </div>

      {/* Carousel section */}
      <div className="max-w-7xl mx-auto">
        <OuterCarousel videos={videos} />
      </div>

      {/* Stats bar */}
      <div className="max-w-7xl mx-auto px-4 md:px-8 py-6">
        <div className="grid grid-cols-3 gap-4 bg-gray-900 border border-gray-800 rounded-2xl p-6">
          {[
            { label: 'Videos', value: `${videos.length}+` },
            { label: 'Total Likes', value: `${videos.reduce((a, v) => a + v.likes, 0).toLocaleString()}` },
            { label: 'Shares', value: `${videos.reduce((a, v) => a + v.shares, 0).toLocaleString()}` },
          ].map(stat => (
            <div key={stat.label} className="text-center">
              <p className="text-2xl font-extrabold text-orange-400">{stat.value}</p>
              <p className="text-gray-400 text-xs mt-1">{stat.label}</p>
            </div>
          ))}
        </div>
      </div>
    </main>
  )
}

export default Home
