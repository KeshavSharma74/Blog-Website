import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useParams, Link } from 'react-router-dom'
import { getPostBySlug } from '@/features/postSlice'
import SimilarBlogs from '../components/SimilarBlogs'
import Navigation from '../components/Navigation';
import { MdOutlineKeyboardArrowRight } from 'react-icons/md'

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

  // Function to transform YouTube links into iframes
  const transformYouTubeLinks = (html) => {
    if (!html) return ''

    const youtubeRegex = /(?:<a[^>]*>)?\s*(https?:\/\/(?:www\.)?(?:youtube\.com\/watch\?v=|youtu\.be\/)([\w-]+))\s*(?:<\/a>)?/g

    return html.replace(youtubeRegex, (_, url, videoId) => {
      return `
        <div class="my-4">
          <iframe 
            class="w-full aspect-video rounded-lg shadow-md"
            src="https://www.youtube.com/embed/${videoId}" 
            title="YouTube video player" 
            frameborder="0" 
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
            allowfullscreen>
          </iframe>
        </div>
      `
    })
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Navigation />
      
      {/* Header Section */}
      <div className="container mx-auto mt-[60px] px-4 py-8 flex flex-col items-center min-w-[100vw] bg-[#e7eff8]">
        <div className='w-full max-w-[1300px] flex flex-col md:flex-row justify-between'>
          {/* Left Column */}
          <div className='w-full md:w-[50%] flex flex-col gap-6'>
            <div className='flex justify-start items-center gap-1 text-sm text-gray-400 mb-2 py-2'>
              <Link to='/' className='text-blue-700 hover:underline'>Home</Link>
              <MdOutlineKeyboardArrowRight size={20} />
              <Link to='/blog' className='text-blue-700 hover:underline'>Blog</Link>
            </div>

            {/* Categories */}
            {post.category?.length > 0 && (
              <div className="flex gap-2">
                {post.category.map((c, i) => (
                  <span key={i} className="px-2 py-0.5 rounded border border-gray-400 text-gray-500 text-[14px]">
                    {c}
                  </span>
                ))}
              </div>
            )}

            <p className='text-[1.9rem] font-extrabold'>{post.title}</p>

            <div className='mt-6 flex gap-3 items-center'>
              <div className='flex flex-col'>
                <p className='text-gray-400 text-[0.8rem]'>Updated</p>
                <span className='text-[0.92rem]'>
                  {new Date(post.createdAt).toLocaleDateString('en-US', {
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric',
                  })}
                </span>
              </div>
              <span className='text-gray-400'>|</span>
              <div className="flex items-center gap-3 rounded-lg p-2">
                <div className="flex h-7 w-7 items-center justify-center rounded-full bg-gray-300">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="white"
                    viewBox="0 0 24 24"
                    strokeWidth="1.5"
                    stroke="white"
                    className="h-5 w-5"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M15.75 6a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0ZM4.501 20.118a7.5 7.5 0 0 1 14.998 0A17.933 17.933 0 0 1 12 21.75c-2.676 0-5.216-.584-7.499-1.632Z"
                    />
                  </svg>
                </div>
                <div>
                  <p className="text-sm text-gray-400 text-[0.8rem]">By</p>
                  <p className="font-medium text-gray-800 text-[0.92rem]">{post.user.name}</p>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column */}
          <div className='w-full md:w-[43%] mt-6 md:mt-0'>
            <img
              src={post.mainImage}
              alt={post.title}
              className="w-full h-80 object-cover rounded-lg shadow-md"
              onError={(e) => { e.target.src = 'https://via.placeholder.com/800x400?text=No+Image' }}
            />
          </div>
        </div>
      </div>

      {/* Post Content */}
      <div className='flex justify-center items-center mt-6 px-4'>
        <div className='w-full max-w-[1200px]'>
          {post.contentHTML ? (
            <div
              className="prose prose-lg prose-blue max-w-none dark:prose-invert"
              dangerouslySetInnerHTML={{ __html: transformYouTubeLinks(post.contentHTML) }}
            />
          ) : (
            <pre className="bg-gray-100 p-4 rounded text-sm overflow-auto">
              {JSON.stringify(post.content, null, 2)}
            </pre>
          )}
        </div>
      </div>

      {/* Similar Blogs Section */}
      <SimilarBlogs />
    </div>
  )
}

export default ShowSpecificBlog
