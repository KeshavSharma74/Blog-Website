import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
// Make sure to create and export getSimilarPosts from your postSlice
import { getSimilarPosts } from '@/features/postSlice'; 

const SimilarBlogs = ({ currentPostSlug }) => {
  const dispatch = useDispatch();
  const { similarPosts, isFetchingSimilar } = useSelector((state) => state.post);

  useEffect(() => {
    // Fetch similar posts when the component mounts or the current post slug changes
    if (currentPostSlug) {
      dispatch(getSimilarPosts(currentPostSlug));
    }
  }, [dispatch, currentPostSlug]);

  // A simple skeleton loader to prevent layout shift
  const SkeletonLoader = () => (
    <div className="space-y-2">
      <div className="h-4 bg-gray-200 rounded w-3/4 animate-pulse"></div>
      <div className="h-4 bg-gray-200 rounded w-full animate-pulse"></div>
      <div className="h-4 bg-gray-200 rounded w-5/6 animate-pulse"></div>
    </div>
  );

  // Don't render the component if there are no similar posts to show
  if (!isFetchingSimilar && (!similarPosts || similarPosts.length === 0)) {
    return null;
  }

  return (
    <div className="bg-white border border-gray-200 rounded-lg p-6">
      <h3 className="text-sm font-bold uppercase text-gray-500 mb-4 tracking-wider">
        Related Articles
      </h3>
      
      {isFetchingSimilar ? (
        <SkeletonLoader />
      ) : (
        <div className="flex flex-col divide-y divide-gray-200">
          {similarPosts.map((post) => (
            <Link
              key={post._id}
              to={`/blog/${post.slug}`}
              className="py-3 text-gray-800 hover:text-blue-600 transition-colors duration-200"
            >
              {post.title}
            </Link>
          ))}
        </div>
      )}
    </div>
  );
};

export default SimilarBlogs;