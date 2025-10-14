import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getAllPosts } from '@/features/postSlice'; // Assuming this path is correct
import BlogCard from '@/components/BlogCard'; // Assuming this path is correct
import toast from 'react-hot-toast'; // For notifications
import { Link } from 'react-router-dom';

const LatestBlogs = () => {
  const dispatch = useDispatch();
  const { allPosts, isFetchingAll, error } = useSelector((state) => state.post);

  useEffect(() => {
    dispatch(getAllPosts());
  }, [dispatch]);

  useEffect(() => {
    if (error) {
      toast.error(error);
    }
  }, [error]);

  if (isFetchingAll) {
    return (
      <div className="flex items-center justify-center py-16">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading latest blogs...</p>
        </div>
      </div>
    );
  }

  if (allPosts.length === 0) {
    return (
      <div className="flex items-center justify-center  py-16">
        <div className="text-center px-4">
          <div className="text-gray-400 mb-4">
            <svg className="w-16 h-16 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z" />
            </svg>
          </div>
          <h2 className="text-2xl font-bold text-gray-900 mb-2">No Latest Blogs Found</h2>
          <p className="text-gray-600">There are no recent blogs available at the moment.</p>
        </div>
      </div>
    );
  }

  // To display only a subset of latest blogs, e.g., 3 or 6
  // You might want to sort by date if `allPosts` isn't already sorted
  const latestPosts = allPosts.slice(0, 6); // Display up to 6 latest posts

  return (
    <>
      <div className="py-12 px-3 bg-gray-50 max-w-[1350px] mx-auto"> {/* Added a background for consistency */}
        {/* Heading Section - Consistent with FAQSection */}
        <div className="text-center px-4 mb-10">
          <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 leading-tight">Latest Blog Posts</h1>
          <p className="text-sm sm:text-base md:text-base text-slate-500 mt-3 sm:mt-4 max-w-2xl mx-auto leading-relaxed">
            Stay updated with our newest articles on AI, data science, and business intelligence.
          </p>
        </div>

        {/* Blog Grid */}
        <div className="max-w-[1310px] mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {latestPosts.map((post) => (
              <BlogCard key={post._id} post={post} />
            ))}
          </div>
        </div>

        {/* Optional: View All Blogs Button */}
        <div className="text-center mt-12">
          {/* You might want a button here to link to your /blogs page */}
          <Link to='/blog' className="px-6 py-3  text-white font-medium rounded-lg bg-blue-500  transition-all duration-300 shadow-lg">
            View All Posts
          </Link>
        </div>
      </div>
    </>
  );
};

export default LatestBlogs;