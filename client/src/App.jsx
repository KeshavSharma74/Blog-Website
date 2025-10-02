import React from 'react'
import { Routes, Route } from 'react-router-dom'
import Home from './pages/Home'
import Blog from './pages/Blog'

const App = () => {
  return (
    <div className="w-[100vw] h-[100vh]">
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/create-blog" element={<Blog />} />
      </Routes>
    </div>
  )
}

export default App
