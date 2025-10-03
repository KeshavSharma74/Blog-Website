import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { getSimilarPosts } from "@/features/postSlice";
import BlogCard from "./BlogCard";

const SimilarBlogs = () => {
  const dispatch = useDispatch();
  const { slug } = useParams();
  const { similarPosts } = useSelector((state) => state.post);

  useEffect(() => {
    if (slug) {
      dispatch(getSimilarPosts(slug));
    }
  }, [dispatch, slug]);

  if (!similarPosts || similarPosts.length === 0) return null;

  return (
    <div className="container mx-auto px-4 py-8 max-w-5xl">
      <h2 className="text-2xl font-bold text-gray-900 mb-6">
        Similar Blogs
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {similarPosts.map((post) => (
          <BlogCard key={post._id} post={post} />
        ))}
      </div>
    </div>
  );
};

export default SimilarBlogs;
