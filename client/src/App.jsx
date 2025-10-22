import React, { useEffect } from 'react'
import { Routes, Route } from 'react-router-dom'
import Home from './pages/Home'
import Blog from './pages/Blog'
import UpdateBlog from './pages/UpdateBlog'
import  { Toaster } from 'react-hot-toast'
import Login from './components/Login'
import { useDispatch, useSelector } from 'react-redux'
import { checkAuth } from '@/features/authSlice'
import ShowBlogs from './pages/ShowBlogs'
import ShowSpecificBlog from './pages/ShowSpecificBlog'
import AdminRoute from './components/AdminRoute'
import Footer from './components/Footer'
import CategoryBlogs from './pages/CategoryBlogs'
import About from './pages/About'
import Testimonials from './pages/Testimonials'
import FAQ from './pages/FAQ'
import PrivacyAndPolicy from './pages/PrivacyAndPolicy'
import TermsOfService from './pages/TermsOfService'
import CookiePolicy from './pages/CookiePolicy'

const App = () => {
  const dispatch = useDispatch()
  const { user, isCheckingAuth } = useSelector((state) => state.auth)

  useEffect(() => {
    // console.log('App: Starting auth check...')
    dispatch(checkAuth())
  }, [dispatch])

  useEffect(() => {
    // console.log('=== App Auth State ===')
    // console.log('isCheckingAuth:', isCheckingAuth)
    // console.log('user:', user)
    // console.log('user role:', user?.role)
    // console.log('====================')
  }, [user, isCheckingAuth])

  return (
    <div className="w-full h-full ">
      <Toaster></Toaster>
      
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/testimonials" element={<Testimonials />} />
        <Route path="/faq" element={<FAQ />} />
        <Route path="/create-blog" element={<AdminRoute><Blog /></AdminRoute>} />
        <Route path="/update-blog/:slug" element={<AdminRoute><UpdateBlog /></AdminRoute>} />
        <Route path="/login" element={<Login />} />
        <Route path="/blog" element={<ShowBlogs />} />
        <Route path="/blog/:slug" element={<ShowSpecificBlog />} />
        <Route path="/category/:categoryName" element={<CategoryBlogs />} />
        <Route path="/privacy" element={<PrivacyAndPolicy />} />
        <Route path="/terms" element={<TermsOfService />} />
        <Route path="/cookie" element={<CookiePolicy />} />
      </Routes>
      <Footer></Footer>
    </div>
  )
}

export default App
