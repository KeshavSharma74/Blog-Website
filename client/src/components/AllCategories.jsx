import React from 'react';
import { Link } from 'react-router-dom';

const AllCategories = () => {
  const categories = ['AI', 'Computer', 'Tech', 'Science', 'Other'];

  return (
    <div className="bg-white border border-gray-200 rounded-lg p-6">
      <h3 className="text-sm font-bold uppercase text-gray-500 mb-4 tracking-wider">
        All Categories
      </h3>
      
      <div className="flex flex-col divide-y divide-gray-200">
        {categories.map((category) => (
          <Link
            key={category}
            to={`/category/${category.toLowerCase()}`}
            className="py-3 text-gray-800 hover:text-blue-600 transition-colors duration-200"
          >
            {category}
          </Link>
        ))}
      </div>
    </div>
  );
};

export default AllCategories;