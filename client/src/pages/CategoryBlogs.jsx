import React, { useEffect, useMemo } from 'react';
import { useParams } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { getAllPosts } from '../features/postSlice';
import BlogCard from '../components/BlogCard';
import Navigation from '../components/Navigation';

const CategoryPage = () => {
  const { categoryName } = useParams();
  const dispatch = useDispatch();

  // Changed 'isLoading' to 'isFetchingAll' to match ShowBlogs component
  const { allPosts, isFetchingAll } = useSelector((state) => state.post);

  // Scroll to top when component mounts or category changes
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [categoryName]);

  // Fetch posts when the component mounts if they aren't already loaded
  useEffect(() => {
    if (!allPosts || allPosts.length === 0) {
      dispatch(getAllPosts());
    }
  }, [dispatch, allPosts]);

  // Filter posts based on the category from the URL
  const filteredPosts = useMemo(() => {
    if (!allPosts) return [];
    
    return allPosts.filter((post) => {
      if (!post.category) return false;

      const normalizedCategoryName = categoryName.toLowerCase().trim();

      if (Array.isArray(post.category)) {
        return post.category.some(
          (cat) => typeof cat === 'string' && cat.toLowerCase().trim() === normalizedCategoryName
        );
      }

      if (typeof post.category === 'string') {
        return post.category.toLowerCase().trim() === normalizedCategoryName;
      }

      return false;
    });
  }, [allPosts, categoryName]);

  // Changed condition from 'isLoading' to 'isFetchingAll'
  if (isFetchingAll) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading blogs...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
        <Navigation></Navigation>
      <div className="container mx-auto mt-16 px-4 py-8 max-w-[1310px]">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-2 capitalize">
            Blogs Related to {categoryName}
          </h1>
          <p className="text-lg text-gray-600">
            Explore our latest insights and articles all about {categoryName.toLowerCase()}
          </p>
        </div>

        {/* Blog Grid */}
        {filteredPosts.length === 0 && !isFetchingAll ? (
          <div className="text-center py-12">
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
              No posts found in this category.
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredPosts.map((post) => (
              <BlogCard key={post._id} post={post} />
            ))}
          </div>
        )}

        {/* Footer */}
        {filteredPosts.length > 0 && (
          <div className="text-center mt-12">
            <p className="text-gray-500">
              Showing {filteredPosts.length} blog
              {filteredPosts.length !== 1 ? 's' : ''} in "{categoryName}"
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default CategoryPage;