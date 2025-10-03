import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'
import { getPostBySlug } from '@/features/postSlice'
import SimilarBlogs from '../components/SimilarBlogs'

const ShowSpecificBlog = () => {
  const dispatch = useDispatch()
  const { slug } = useParams()
  const { currentPost, isFetching, error } = useSelector((state) => state.post)

  useEffect(() => {
    if (slug) {
      dispatch(getPostBySlug(slug))
    }
  }, [dispatch, slug])

  if (isFetching) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading post...</p>
        </div>
      </div>
    )
  }

  if (error || !currentPost) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Post not found</h2>
          <p className="text-gray-600">The post you're looking for does not exist.</p>
        </div>
      </div>
    )
  }

  const post = currentPost

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-8 max-w-4xl">
        {/* Header Image */}
        <div className="mb-6">
          <img
            src={post.mainImage}
            alt={post.title}
            className="w-full h-72 object-cover rounded-lg"
            onError={(e) => { e.target.src = 'https://via.placeholder.com/800x400?text=No+Image' }}
          />
        </div>

        {/* Title and Meta */}
        <h1 className="text-3xl font-bold text-gray-900 mb-2">{post.title}</h1>
        <p className="text-gray-600 mb-4">{post.subTitle}</p>
        <div className="flex items-center gap-3 text-sm text-gray-500 mb-8">
          <span>{new Date(post.createdAt).toLocaleDateString()}</span>
          {post.category?.length > 0 && (
            <span className="flex gap-2">
              {post.category.map((c, i) => (
                <span key={i} className="px-2 py-0.5 rounded-full bg-blue-100 text-blue-800 text-xs">{c}</span>
              ))}
            </span>
          )}
        </div>

        {/* Content (HTML) */}
        {post.contentHTML ? (
          <div className="prose max-w-none" dangerouslySetInnerHTML={{ __html: post.contentHTML }} />
        ) : (
          <pre className="bg-gray-100 p-4 rounded text-sm overflow-auto">
            {JSON.stringify(post.content, null, 2)}
          </pre>
        )}
      </div>
      <SimilarBlogs></SimilarBlogs>
    </div>
  )
}

export default ShowSpecificBlog