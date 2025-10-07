import React from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { deletePost } from '@/features/postSlice'
import toast from 'react-hot-toast'

const BlogCard = ({ post }) => {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const { user } = useSelector((state) => state.auth)
  const { isDeleting } = useSelector((state) => state.post)

  // Format the date
  const formatDate = (dateString) => {
    const date = new Date(dateString)
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    })
  }

  const handleDelete = async (e) => {
    e.preventDefault()
    e.stopPropagation()
    
    if (window.confirm('Are you sure you want to delete this post?')) {
      try {
        await dispatch(deletePost(post._id)).unwrap()
        toast.success('Post deleted successfully')
      } catch (error) {
        toast.error(error || 'Failed to delete post')
      }
    }
  }

  const handleUpdate = (e) => {
    e.preventDefault()
    e.stopPropagation()
    navigate(`/update-blog/${post.slug}`)
  }

  const isAdmin = user && user.role === 'admin'

  return (
    <div className="max-w-sm bg-white border border-gray-200 rounded-lg shadow-sm dark:bg-gray-800 dark:border-gray-700 relative">
      {/* Admin Action Buttons */}
      {isAdmin && (
        <div className="absolute top-3 right-3 z-10 flex gap-2">
          <button
            onClick={handleUpdate}
            className="bg-white/90 backdrop-blur-sm hover:bg-white text-gray-700 p-2.5 rounded-lg shadow-md hover:shadow-lg transition-all duration-200 border border-gray-200"
            title="Update Post"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
            </svg>
          </button>
          <button
            onClick={handleDelete}
            disabled={isDeleting}
            className="bg-white/90 backdrop-blur-sm hover:bg-white text-red-600 p-2.5 rounded-lg shadow-md hover:shadow-lg transition-all duration-200 disabled:opacity-50 border border-gray-200"
            title="Delete Post"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
            </svg>
          </button>
        </div>
      )}

      {/* Entire Card is Clickable */}
      <Link to={`/blog/${post.slug}`} className="block">
        {/* Main Image - HEIGHT INCREASED */}
        <img
          className="rounded-t-lg w-full h-56 object-cover"
          src={post.mainImage}
          alt={post.title}
          onError={(e) => {
            e.target.src = 'https://via.placeholder.com/400x225?text=No+Image'
          }}
        />

        {/* Content - PADDING REDUCED */}
        <div className="p-4">
          {/* Title */}
          <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white line-clamp-2">
            {post.title}
          </h5>

        {/* Subtitle */}
        <p className="mb-3 font-normal text-gray-700 dark:text-gray-400 line-clamp-3">
          {post.subTitle}
        </p>

        {/* Date */}
        <div className="flex items-center text-sm text-gray-500 dark:text-gray-400 mb-3">
          <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
          </svg>
          {formatDate(post.createdAt)}
        </div>

        {/* Categories */}
        {post.category && post.category.length > 0 && (
          <div className="mb-3 flex flex-wrap gap-2">
            {post.category.map((cat, index) => (
              <span
                key={index}
                className="inline-block bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300 text-xs px-2 py-1 rounded-full"
              >
                {cat}
              </span>
            ))}
          </div>
        )}
        </div>
      </Link>
    </div>
  )
}

export default BlogCard