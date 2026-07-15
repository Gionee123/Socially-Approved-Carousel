import { Link, useLocation } from 'react-router-dom';
import { FiVideo, FiPlusCircle, FiList, FiMessageSquare, FiHeart } from 'react-icons/fi';
import { IoIosArrowDown } from 'react-icons/io';
import { IoReorderThree } from 'react-icons/io5';
import { useState } from 'react';

interface SidebarProps {
  toggleSidebar: () => void;
}

export default function Sidebar({ toggleSidebar }: SidebarProps) {
  const location = useLocation();
  const [isVideoDropdownOpen, setIsVideoDropdownOpen] = useState(true);

  const isActive = (path: string) => {
    return location.pathname === path ? 'bg-blue-600 text-white' : 'text-gray-400 hover:bg-gray-800 hover:text-gray-200';
  };

  return (
    <aside className="w-64 bg-gray-900 border-r border-gray-800 min-h-screen p-4 flex flex-col">
      <div className="flex items-center gap-3 mb-8 px-2">
        <IoReorderThree
          className="text-gray-400 cursor-pointer hover:text-white shrink-0"
          size={24}
          onClick={toggleSidebar}
        />
        <div className="w-8 h-8 rounded-lg bg-blue-600 flex items-center justify-center shrink-0">
          <FiVideo className="text-white" size={18} />
        </div>
        <h2 className="text-xl font-bold text-gray-100 tracking-wide">Admin Panel</h2>
      </div>

      <nav className="flex flex-col gap-2">
        <button
          onClick={() => setIsVideoDropdownOpen(prev => !prev)}
          className="w-full flex items-center justify-between px-2 py-2 text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2 mt-4 hover:text-gray-300 transition-colors focus:outline-none"
        >
          <span>Videos Management</span>
          <IoIosArrowDown
            size={14}
            className={`transition-transform duration-200 ${isVideoDropdownOpen ? '' : '-rotate-90'}`}
          />
        </button>

        {isVideoDropdownOpen && (
          <div className="flex flex-col gap-2 pl-2 border-l border-gray-800 ml-2 mb-2">
            <Link
              to="/admin/view-video"
              className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200 ${isActive('/admin/view-video')}`}
            >
              <FiList size={18} />
              <span className="font-medium">View Video</span>
            </Link>

            <Link
              to="/admin/add-video"
              className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200 ${isActive('/admin/add-video')}`}
            >
              <FiPlusCircle size={18} />
              <span className="font-medium">Add Video</span>
            </Link>
          </div>
        )}

        <p className="px-2 text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2 mt-4">
          Interactions
        </p>

        <Link
          to="/admin/view-comments"
          className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200 ${isActive('/admin/view-comments')}`}
        >
          <FiMessageSquare size={18} />
          <span className="font-medium">View Comments</span>
        </Link>

        <Link
          to="/admin/view-likes"
          className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200 ${isActive('/admin/view-likes')}`}
        >
          <FiHeart size={18} />
          <span className="font-medium">View Likes</span>
        </Link>
      </nav>
    </aside>
  );
}
