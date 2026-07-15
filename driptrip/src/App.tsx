import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import Header from './common/Header'
import Footer from './common/Footer'
import Home from './pages/Home/Home'
import Login from './pages/login/Login'
import AdminLayout from './admin_panel/pages/Admin'
import Addvideo from './admin_panel/pages/Videos/Addvideo'
import Viewvideo from './admin_panel/pages/Videos/Viewvideo'
import ViewComments from './admin_panel/pages/Comments/ViewComments'
import ViewLikes from './admin_panel/pages/Likes/ViewLikes'
import NotFoundPage from './pages/NotFoundPage/NotFoundPage'

function App() {
  return (
    <BrowserRouter>
      <div className="flex flex-col min-h-screen bg-gray-950">
        <Routes>
          {/* Public Website Routes */}
          <Route
            path="/"
            element={
              <>
                <Header />
                <Home />
                <Footer />
              </>
            }
          />
          <Route
            path="/login"
            element={
              <>
                <Header />
                <Login />
                <Footer />
              </>
            }
          />

          {/* Admin Dashboard Routes */}
          <Route path="/admin" element={<AdminLayout />}>
            <Route index element={<Navigate to="view-video" replace />} />
            <Route path="view-video" element={<Viewvideo />} />
            <Route path="add-video" element={<Addvideo />} />
            <Route path="view-comments" element={<ViewComments />} />
            <Route path="view-likes" element={<ViewLikes />} />
          </Route>

          <Route
            path="*"
            element={
              <>
                <Header />
                <NotFoundPage />
                <Footer />
              </>
            }
          />
        </Routes>
      </div>
    </BrowserRouter>
  )
}

export default App
