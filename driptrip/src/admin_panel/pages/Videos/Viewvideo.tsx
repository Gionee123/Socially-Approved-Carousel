import { useEffect, useState } from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import { FiEdit2, FiTrash2, FiToggleLeft, FiToggleRight, FiSearch, FiPlusCircle } from 'react-icons/fi'

const API = `${import.meta.env.VITE_API_BASE_URL}/api/admin/video`

interface Video {
  _id: string
  title: string
  description: string
  videoUrl: string
  thumbnail: string
  duration: number
  status: boolean
  createdAt: string
}

export default function Viewvideo() {
  const navigate = useNavigate()
  const [videos, setVideos] = useState<Video[]>([])
  const [loading, setLoading] = useState(true)
  const [search, setSearch] = useState('')

  const fetchVideos = () => {
    setLoading(true)
    axios.post(`${API}/view`)
      .then(res => setVideos(res.data.data || []))
      .catch(err => console.error(err))
      .finally(() => setLoading(false))
  }

  useEffect(() => { fetchVideos() }, [])

  const handleDelete = (id: string) => {
    if (!confirm('Are you sure you want to delete this video?')) return
    axios.delete(`${API}/delete/${id}`)
      .then(() => setVideos(prev => prev.filter(v => v._id !== id)))
      .catch(err => console.error(err))
  }

  const handleStatusToggle = (id: string, current: boolean) => {
    axios.post(`${API}/status-change`, { id, status: !current })
      .then(() => setVideos(prev => prev.map(v => v._id === id ? { ...v, status: !current } : v)))
      .catch(err => console.error(err))
  }

  const filtered = videos.filter(v =>
    v.title?.toLowerCase().includes(search.toLowerCase()) ||
    v.description?.toLowerCase().includes(search.toLowerCase())
  )

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-100">Video Management</h1>
          <p className="text-gray-400 text-sm mt-1">Manage all uploaded videos</p>
        </div>
        <button
          onClick={() => navigate('/admin/add-video')}
          className="flex items-center gap-2 bg-blue-600 hover:bg-blue-500 text-white font-semibold py-2 px-4 rounded-lg transition-colors"
        >
          <FiPlusCircle size={18} />
          Add Video
        </button>
      </div>

      {/* Search */}
      <div className="flex items-center gap-4">
        <div className="relative flex-1 max-w-md">
          <FiSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
          <input
            type="text"
            value={search}
            onChange={e => setSearch(e.target.value)}
            placeholder="Search by title or description..."
            className="w-full pl-10 pr-4 py-2 bg-gray-900 border border-gray-700 rounded-lg focus:outline-none focus:border-blue-500 text-gray-200 transition-colors"
          />
        </div>
        <span className="text-gray-400 text-sm">Showing {filtered.length} entries</span>
      </div>

      {/* Table */}
      <div className="bg-gray-800 rounded-xl border border-gray-700/50 overflow-hidden shadow-2xl overflow-x-auto">
        {loading ? (
          <div className="p-10 text-center text-gray-400">Loading videos...</div>
        ) : (
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-gray-900/60 text-gray-400 uppercase text-xs tracking-wider border-b border-gray-700/50">
                <th className="px-5 py-4">#</th>
                <th className="px-5 py-4">Thumbnail</th>
                <th className="px-5 py-4">Title</th>
                <th className="px-5 py-4">Live URL</th>
                <th className="px-5 py-4">Duration</th>
                <th className="px-5 py-4">Status</th>
                <th className="px-5 py-4">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filtered.length === 0 ? (
                <tr>
                  <td colSpan={7} className="px-5 py-10 text-center text-gray-400">No videos found.</td>
                </tr>
              ) : (
                filtered.map((video, i) => (
                  <tr key={video._id} className="border-b border-gray-700/30 hover:bg-gray-700/20 transition-colors">
                    <td className="px-5 py-4 text-gray-400">{i + 1}</td>
                    <td className="px-5 py-4">
                      {video.thumbnail ? (
                        <img src={video.thumbnail} alt={video.title} className="w-16 h-10 object-cover rounded-lg border border-gray-700" />
                      ) : (
                        <div className="w-16 h-10 bg-gray-700 rounded-lg flex items-center justify-center text-gray-500 text-xs">No img</div>
                      )}
                    </td>
                    <td className="px-5 py-4">
                      <p className="font-medium text-gray-100">{video.title}</p>
                      <p className="text-gray-400 text-xs truncate max-w-xs">{video.description}</p>
                    </td>
                    <td className="px-5 py-4">
                      {video.videoUrl ? (
                        <a
                          href={video.videoUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-blue-400 hover:text-blue-300 text-xs underline truncate max-w-[180px] block"
                          title={video.videoUrl}
                        >
                          View Video ↗
                        </a>
                      ) : (
                        <span className="text-gray-500 text-xs">No URL</span>
                      )}
                    </td>
                    <td className="px-5 py-4 text-gray-300">{video.duration}s</td>
                    <td className="px-5 py-4">
                      <button
                        onClick={() => handleStatusToggle(video._id, video.status)}
                        className={`flex items-center gap-1.5 text-sm font-medium transition-colors ${video.status ? 'text-green-400 hover:text-green-300' : 'text-red-400 hover:text-red-300'}`}
                      >
                        {video.status ? <FiToggleRight size={22} /> : <FiToggleLeft size={22} />}
                        {video.status ? 'Active' : 'Inactive'}
                      </button>
                    </td>
                    <td className="px-5 py-4">
                      <div className="flex items-center gap-3">
                        <button
                          onClick={() => navigate(`/admin/add-video?id=${video._id}`)}
                          className="text-blue-400 hover:text-blue-300 transition-colors"
                          title="Edit"
                        >
                          <FiEdit2 size={18} />
                        </button>
                        <button
                          onClick={() => handleDelete(video._id)}
                          className="text-red-400 hover:text-red-300 transition-colors"
                          title="Delete"
                        >
                          <FiTrash2 size={18} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        )}
      </div>
    </div>
  )
}
