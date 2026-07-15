import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { FiTrash2 } from 'react-icons/fi';

interface Comment {
  _id: string;
  name: string;
  comment: string;
  videoId: {
    _id: string;
    title: string;
    thumbnail: string;
  } | null;
  status: boolean;
  createdAt: string;
}

const ViewComments: React.FC = () => {
  const [comments, setComments] = useState<Comment[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const fetchComments = async () => {
    try {
      const res = await axios.post(`${import.meta.env.VITE_API_BASE_URL || 'http://localhost:5000'}/api/admin/comment/all`);
      if (res.data.success || res.data.status) {
        setComments(res.data.data);
      }
    } catch (err) {
      console.error(err);
      setError('Failed to load comments');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchComments();
  }, []);

  const toggleStatus = async (id: string, currentStatus: boolean) => {
    try {
      await axios.post(`${import.meta.env.VITE_API_BASE_URL || 'http://localhost:5000'}/api/admin/comment/status-change`, {
        id,
        status: !currentStatus
      });
      fetchComments();
    } catch (err) {
      console.error(err);
      alert('Failed to update status');
    }
  };

  const deleteComment = async (id: string) => {
    if (window.confirm('Are you sure you want to delete this comment?')) {
      try {
        await axios.delete(`${import.meta.env.VITE_API_BASE_URL || 'http://localhost:5000'}/api/admin/comment/delete/${id}`);
        fetchComments();
      } catch (err) {
        console.error(err);
        alert('Failed to delete comment');
      }
    }
  };

  if (loading) return <div className="text-white p-4">Loading comments...</div>;
  if (error) return <div className="text-red-500 p-4">{error}</div>;

  return (
    <div className="bg-gray-900 rounded-2xl shadow-xl border border-gray-800 overflow-hidden">
      <div className="p-6 border-b border-gray-800">
        <h2 className="text-xl font-bold text-gray-100">User Comments</h2>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-gray-800/50 text-gray-400 text-sm uppercase tracking-wider">
              <th className="p-4 font-semibold">Video</th>
              <th className="p-4 font-semibold">User Name</th>
              <th className="p-4 font-semibold">Comment</th>
              <th className="p-4 font-semibold">Date</th>
              <th className="p-4 font-semibold text-center">Status</th>
              <th className="p-4 font-semibold text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-800">
            {comments.map((item) => (
              <tr key={item._id} className="hover:bg-gray-800/20 transition-colors">
                <td className="p-4">
                  <div className="flex items-center gap-3">
                    {item.videoId?.thumbnail && (
                      <img src={item.videoId.thumbnail} alt="thumb" className="w-12 h-12 rounded-lg object-cover" />
                    )}
                    <span className="text-gray-200 font-medium truncate max-w-[150px]">
                      {item.videoId?.title || 'Unknown Video'}
                    </span>
                  </div>
                </td>
                <td className="p-4 text-gray-300 font-medium">{item.name}</td>
                <td className="p-4 text-gray-400 max-w-xs truncate" title={item.comment}>{item.comment}</td>
                <td className="p-4 text-gray-400 text-sm">
                  {new Date(item.createdAt).toLocaleDateString()}
                </td>
                <td className="p-4 text-center">
                  <button
                    onClick={() => toggleStatus(item._id, item.status)}
                    className={`px-3 py-1 text-xs font-semibold rounded-full ${
                      item.status ? 'bg-green-500/10 text-green-400' : 'bg-red-500/10 text-red-400'
                    }`}
                  >
                    {item.status ? 'Approved' : 'Hidden'}
                  </button>
                </td>
                <td className="p-4 text-right">
                  <button
                    onClick={() => deleteComment(item._id)}
                    className="p-2 text-red-400 hover:text-red-300 hover:bg-red-400/10 rounded-lg transition-colors"
                    title="Delete"
                  >
                    <FiTrash2 size={18} />
                  </button>
                </td>
              </tr>
            ))}
            {comments.length === 0 && (
              <tr>
                <td colSpan={6} className="p-8 text-center text-gray-500">
                  No comments found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ViewComments;
