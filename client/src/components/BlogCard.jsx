import React from 'react'
import { Link } from 'react-router-dom'

const BlogCard = ({ post }) => {
  // Format the date
  const formatDate = (dateString) => {
    const date = new Date(dateString)
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    })
  }

  return (
    <Link to={`/blog/${post.slug}`} className="block bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300">
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
  )
}

export default BlogCard