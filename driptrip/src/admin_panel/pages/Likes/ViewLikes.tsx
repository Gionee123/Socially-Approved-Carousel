import React, { useEffect, useState } from 'react';
import axios from 'axios';

interface Like {
  _id: string;
  ipAddress: string;
  videoId: {
    _id: string;
    title: string;
    thumbnail: string;
  } | null;
  liked: boolean;
  createdAt: string;
}

const ViewLikes: React.FC = () => {
  const [likes, setLikes] = useState<Like[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const fetchLikes = async () => {
    try {
      const res = await axios.post(`${import.meta.env.VITE_API_BASE_URL || 'http://localhost:5000'}/api/admin/like/all`);
      if (res.data.success || res.data.status) {
        setLikes(res.data.data);
      }
    } catch (err) {
      console.error(err);
      setError('Failed to load likes');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchLikes();
  }, []);

  if (loading) return <div className="text-white p-4">Loading likes...</div>;
  if (error) return <div className="text-red-500 p-4">{error}</div>;

  return (
    <div className="bg-gray-900 rounded-2xl shadow-xl border border-gray-800 overflow-hidden">
      <div className="p-6 border-b border-gray-800 flex justify-between items-center">
        <h2 className="text-xl font-bold text-gray-100">User Likes</h2>
        <span className="bg-orange-500/10 text-orange-400 px-3 py-1 rounded-full text-sm font-semibold">
          Total: {likes.length}
        </span>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-gray-800/50 text-gray-400 text-sm uppercase tracking-wider">
              <th className="p-4 font-semibold">Video</th>
              <th className="p-4 font-semibold">IP Address (User)</th>
              <th className="p-4 font-semibold">Date Liked</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-800">
            {likes.map((item) => (
              <tr key={item._id} className="hover:bg-gray-800/20 transition-colors">
                <td className="p-4">
                  <div className="flex items-center gap-3">
                    {item.videoId?.thumbnail && (
                      <img src={item.videoId.thumbnail} alt="thumb" className="w-12 h-12 rounded-lg object-cover" />
                    )}
                    <span className="text-gray-200 font-medium truncate max-w-[200px]">
                      {item.videoId?.title || 'Unknown Video'}
                    </span>
                  </div>
                </td>
                <td className="p-4 text-gray-300 font-mono text-sm">{item.ipAddress}</td>
                <td className="p-4 text-gray-400 text-sm">
                  {new Date(item.createdAt).toLocaleString()}
                </td>
              </tr>
            ))}
            {likes.length === 0 && (
              <tr>
                <td colSpan={3} className="p-8 text-center text-gray-500">
                  No likes found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ViewLikes;
