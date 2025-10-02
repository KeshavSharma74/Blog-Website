import React, { useEffect } from 'react'
import { Routes, Route } from 'react-router-dom'
import Home from './pages/Home'
import Blog from './pages/Blog'
import  { Toaster } from 'react-hot-toast'
import Login from './components/Login'
import { useDispatch, useSelector } from 'react-redux'
import { checkAuth } from '@/features/authSlice'

const App = () => {
  const dispatch = useDispatch()
  const isCheckingAuth = useSelector((state) => state.auth.isCheckingAuth)

  useEffect(() => {
    dispatch(checkAuth())
  }, [dispatch])

  if (isCheckingAuth) {
    return null
  }

  return (
    <div className="w-full h-full ">
      <Toaster></Toaster>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/create-blog" element={<Blog />} />
        <Route path="/login" element={<Login />} />
      </Routes>
    </div>
  )
}

export default App
