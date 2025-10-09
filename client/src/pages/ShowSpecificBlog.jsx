import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams, Link } from 'react-router-dom';
import { getPostBySlug } from '@/features/postSlice'; // Assuming this is your Redux slice
import SimilarBlogs from '../components/SimilarBlogs';
import Navigation from '../components/Navigation';
import AllCategories from '../components/AllCategories';
import TableOfContents from '../components/TableOfContents';
import CodeBlockHandler from '../components/CodeBlockHandler';
import { MdOutlineKeyboardArrowRight } from 'react-icons/md';

const ShowSpecificBlog = () => {
  const dispatch = useDispatch();
  const { slug } = useParams();
  const { currentPost, isFetching, error } = useSelector((state) => state.post);
  const [processedHtml, setProcessedHtml] = useState('');

  // Scroll to top when component mounts or slug changes
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [slug]);

  // Fetch post data when slug changes
  useEffect(() => {
    if (slug) {
      dispatch(getPostBySlug(slug));
    }
  }, [dispatch, slug]);

  // Initialize processed HTML when post content is available
  useEffect(() => {
    if (currentPost?.contentHTML) {
      setProcessedHtml(currentPost.contentHTML);
    }
  }, [currentPost?.contentHTML]);

  // Loading State
  if (isFetching) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading post...</p>
        </div>
      </div>
    );
  }

  // Error or Not Found State
  if (error || !currentPost) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Post not found</h2>
          <p className="text-gray-600">The post you're looking for does not exist.</p>
        </div>
      </div>
    );
  }

  const post = currentPost;

  // Function to transform YouTube links into embeds
  const transformYouTubeLinks = (html) => {
    if (!html) return '';
    const youtubeRegex = /(?:<a[^>]*>)?\s*(https?:\/\/(?:www\.)?(?:youtube\.com\/watch\?v=|youtu\.be\/)([\w-]+))\s*(?:<\/a>)?/g;
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
      `;
    });
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Navigation />
      
      {/* Header Section */}
      <div className="mt-[60px] py-8 w-full bg-[#e7eff8]">
        <div className='w-full max-w-[1300px] mx-auto px-4 flex flex-col md:flex-row justify-between'>
          {/* Left Column */}
          <div className='w-full md:w-[50%] flex flex-col gap-6'>
            <div className='flex justify-start items-center gap-1 text-sm text-gray-400 mb-2 py-2'>
              <Link to='/' className='text-blue-700 hover:underline text-[0.98rem]'>Home</Link>
              <MdOutlineKeyboardArrowRight size={20} />
              <Link to='/blog' className='text-blue-700 hover:underline text-[0.98rem]'>Blog</Link>
            </div>
            {post.category?.length > 0 && (
              <div className="flex gap-2">
                {post.category.map((c, i) => (
                  <Link to={`/category/${c}`} key={i} className="px-2 py-0.5 rounded border hover:border-blue-600 hover:text-blue-600 transition-all duration-200 border-gray-400 text-gray-500 text-[0.98rem]">
                    {c}
                  </Link>
                ))}
              </div>
            )}
            <h1 className='text-[2.5rem] font-extrabold'>{post.title}</h1>
            <div className='mt-6 flex gap-5 items-center'>
              <div className='flex flex-col'>
                <p className='text-gray-400 text-[1rem]'>Updated</p>
                <span className='text-[1.07rem]'>
                  {new Date(post.createdAt).toLocaleDateString('en-US', {
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric',
                  })}
                </span>
              </div>
              <span className='text-gray-400 text-[1.2rem]'>|</span>
              <div className="flex items-center gap-3">
                <div className="flex h-7 w-7 items-center justify-center rounded-full bg-gray-300">
                  {/* User Icon */}
                </div>
                <div>
                  <p className="text-sm text-gray-400 text-[1rem]">By</p>
                  <p className="font-medium text-gray-800 text-[1.07rem]">{post.user.name}</p>
                </div>
              </div>
            </div>
          </div>
          {/* Right Column */}
          <div className='w-full md:w-[43%] my-auto mt-6 md:mt-0'>
            <img
              src={post.mainImage}
              alt={post.title}
              className="w-full h-[90%] object-cover rounded-lg shadow-md"
              onError={(e) => { e.target.src = 'https://via.placeholder.com/800x400?text=No+Image' }}
            />
          </div>
        </div>
      </div>
            
      {/* Main Content and Sidebar Section */}
      <div className="w-full max-w-[1300px] mx-auto px-4 mt-12 pb-12 grid grid-cols-1 lg:grid-cols-3 lg:gap-12">
        
        {/* Left Column: Post Content */}
        <main className="lg:col-span-2">
          <TableOfContents 
            htmlContent={post.contentHTML} 
            onContentUpdate={setProcessedHtml}
          />
          {processedHtml ? (
            <CodeBlockHandler htmlContent={transformYouTubeLinks(processedHtml)} />
          ) : (
            <pre className="bg-gray-100 p-4 rounded text-sm overflow-auto">
              {JSON.stringify(post.content, null, 2)}
            </pre>
          )}
        </main>
        
        {/* Right Column: Sidebar */}
        <aside className="mt-12 lg:mt-0">
          <div className="lg:sticky lg:top-24 space-y-6">
            <SimilarBlogs currentPostSlug={post.slug} />
            <AllCategories />
          </div>
        </aside>
      </div>
    </div>
  );
};

export default ShowSpecificBlog;
