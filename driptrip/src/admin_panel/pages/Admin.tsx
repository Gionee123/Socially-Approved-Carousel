import { Outlet, useNavigate, Navigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { logOut } from '../../redux/adminslice';
import Sidebar from '../comman/Sidebar';
import { IoReorderThree } from 'react-icons/io5';
import { useState } from 'react';

const AdminLayout = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { adminDetails } = useSelector((state: any) => state.loginStore);
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  if (!adminDetails) {
    return <Navigate to="/login" replace />;
  }

  const handleLogout = () => {
    dispatch(logOut());
    navigate('/login');
  };

  return (
    <div className="flex min-h-screen bg-gray-950 font-sans">
      {/* Sidebar - Fixed on the left */}
      {isSidebarOpen && <Sidebar toggleSidebar={() => setIsSidebarOpen(false)} />}

      {/* Main Content Area */}
      <div className="flex flex-col flex-1">
        {/* Header with Logout Button */}
        <div className="flex justify-between items-center p-4 bg-gray-900 border-b border-gray-800">
          {!isSidebarOpen ? (
            <button
              onClick={() => setIsSidebarOpen(true)}
              className="text-gray-400 hover:text-white p-1 transition-colors"
            >
              <IoReorderThree size={28} />
            </button>
          ) : (
            <div />
          )}
          <button
            onClick={handleLogout}
            className="bg-red-600 hover:bg-red-500 text-white font-semibold py-2 px-4 rounded-lg transition-colors"
          >
            Logout
          </button>
        </div>
        
        {/* Scrollable Content */}
        <main className="flex-1 p-6 overflow-y-auto bg-gray-900 text-gray-100">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default AdminLayout;
