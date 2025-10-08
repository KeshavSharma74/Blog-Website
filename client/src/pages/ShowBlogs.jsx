import React, { useEffect, useState, useMemo } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getAllPosts } from '@/features/postSlice'
import BlogCard from '@/components/BlogCard'
import toast from 'react-hot-toast'
import Navigation from '../components/Navigation'

const ShowBlogs = () => {
  const dispatch = useDispatch()
  const { allPosts, isFetchingAll, error } = useSelector((state) => state.post)

  console.log('ShowBlogs: allPosts:', allPosts)

  const [selectedCategory, setSelectedCategory] = useState('All')

  // All possible categories
  const categories = ['All', 'AI', 'Computer', 'Tech', 'Science', 'Other']

  // Scroll to top when component mounts
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  useEffect(() => {
    dispatch(getAllPosts())
  }, [dispatch])

  useEffect(() => {
    if (error) {
      toast.error(error)
    }
  }, [error])

  // Filter blogs based on selected category
  const filteredPosts = useMemo(() => {
    if (selectedCategory === 'All') return allPosts
    return allPosts.filter(post =>
      post.category?.includes(selectedCategory)
    )
  }, [selectedCategory, allPosts])

  if (isFetchingAll) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading blogs...</p>
        </div>
      </div>
    )
  }

  if (!allPosts || allPosts.length === 0) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="text-gray-400 mb-4">
            <svg
              className="w-16 h-16 mx-auto"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={1}
                d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z"
              />
            </svg>
          </div>
          <h2 className="text-2xl font-bold text-gray-900 mb-2">No Blogs Found</h2>
          <p className="text-gray-600">
            There are no blogs available at the moment.
          </p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Navigation />

      <div className="container mx-auto mt-16 px-4 py-8 max-w-[1310px]">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-2">All Blogs</h1>
          <p className="text-lg text-gray-600 mb-6">
            Discover our latest articles and insights
          </p>

          {/* Category Buttons */}
          <div className="flex flex-wrap justify-center gap-3">
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => setSelectedCategory(category)}
                className={`px-4 py-2 rounded-xl border transition-all duration-200 ${
                  selectedCategory === category
                    ? 'bg-blue-600 text-white border-blue-600'
                    : 'bg-white text-gray-700 border-gray-300 hover:bg-blue-50'
                }`}
              >
                {category}
              </button>
            ))}
          </div>
        </div>

        {/* Blog Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredPosts.length > 0 ? (
            filteredPosts.map((post) => <BlogCard key={post._id} post={post} />)
          ) : (
            <p className="text-center col-span-full text-gray-500 text-lg">
              No blogs found in this category.
            </p>
          )}
        </div>

        {/* Footer */}
        <div className="text-center mt-12">
          <p className="text-gray-500">
            Showing {filteredPosts.length} blog
            {filteredPosts.length !== 1 ? 's' : ''} in category "
            {selectedCategory}"
          </p>
        </div>
      </div>
    </div>
  )
}

export default ShowBlogs
