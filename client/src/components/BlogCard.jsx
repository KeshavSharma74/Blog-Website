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
    console.log('Update clicked for post:', post.slug)
    console.log('Current user:', user)
    console.log('User role:', user?.role)
    // Navigate to update page with post data
    navigate(`/update-blog/${post.slug}`)
  }

  const isAdmin = user && user.role === 'admin'
  
  console.log('BlogCard - user:', user)
  console.log('BlogCard - isAdmin:', isAdmin)
  console.log('BlogCard - user role:', user?.role)

  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300 relative">
      {/* Admin Action Buttons */}
      {isAdmin && (
        <div className="absolute top-2 right-2 z-10 flex gap-2">
          <button
            onClick={handleUpdate}
            className="bg-blue-500 hover:bg-blue-600 text-white p-2 rounded-full shadow-lg transition-colors duration-200"
            title="Update Post"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
            </svg>
          </button>
          <button
            onClick={handleDelete}
            disabled={isDeleting}
            className="bg-red-500 hover:bg-red-600 text-white p-2 rounded-full shadow-lg transition-colors duration-200 disabled:opacity-50"
            title="Delete Post"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
            </svg>
          </button>
        </div>
      )}

      {/* Card Content */}
      <Link to={`/blog/${post.slug}`} className="block">
        {/* Main Image */}
        <div className="aspect-w-16 aspect-h-9">
          <img
            src={post.mainImage}
            alt={post.title}
            className="w-full h-48 object-cover"
            onError={(e) => {
              e.target.src = 'https://via.placeholder.com/400x225?text=No+Image'
            }}
          />
        </div>
        
        {/* Content */}
        <div className="p-6">
          {/* Title */}
          <h3 className="text-xl font-bold text-gray-900 mb-2 line-clamp-2">
            {post.title}
          </h3>
          
          {/* Subtitle */}
          <p className="text-gray-600 mb-4 line-clamp-3">
            {post.subTitle}
          </p>
          
          {/* Date */}
          <div className="flex items-center text-sm text-gray-500">
            <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
            </svg>
            {formatDate(post.createdAt)}
          </div>
          
          {/* Categories */}
          {post.category && post.category.length > 0 && (
            <div className="mt-4 flex flex-wrap gap-2">
              {post.category.map((cat, index) => (
                <span
                  key={index}
                  className="inline-block bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded-full"
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