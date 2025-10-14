import React from 'react';
import { Link } from 'react-router-dom';

const About = () => {
  return (
    <div className="pb-20 px-2 sm:px-6 lg:px-8">
      {/* Heading Section */}
      <div className="container  mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16 text-center">
        <h1 className="text-center text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold mb-6 sm:mb-8 text-gray-800">
          About Kloudshark
        </h1>
        <p className="text-sm sm:text-base md:text-base text-slate-500 mt-3 sm:mt-4 max-w-2xl mx-auto leading-relaxed">
          A dedicated space for insightful articles and stories — each piece curated with expertise,
          passion, and a commitment to knowledge.
        </p>
      </div>

      {/* Content Section */}
      <section className="max-w-[1300px]  mx-auto flex flex-col lg:flex-row gap-8 lg:gap-10 px-4 sm:px-6 lg:px-8">
        {/* Left Side - Image */}
        <div className="flex-1">
          <img
            className="w-full h-full object-cover rounded-2xl shadow-lg"
            src="about.png"
            alt="Kloudshark team working on content"
          />
        </div>

        {/* Right Side - Mission Statement */}
        <div className="flex-1 flex flex-col justify-center sm:px-0">
          <h2 className="text-lg sm:text-xl uppercase font-semibold text-slate-700">
            Our Mission
          </h2>
          <div className="w-20 sm:w-24 h-[3px] rounded-full bg-gradient-to-r from-blue-600 to-[#D9E6FF] mt-2"></div>

          <p className="mt-6 sm:mt-8 text-sm sm:text-base text-gray-700 leading-relaxed">
            At Kloudshark, we believe in the power of knowledge to inform, inspire, and foster
            growth. Our platform is dedicated to providing high-quality, thoroughly researched
            articles across a spectrum of tech-related topics, lifestyle, and educational content.
          </p>
          <p className="mt-4 text-sm sm:text-base text-gray-700 leading-relaxed">
            Our team of expert writers and administrators carefully crafts each piece, ensuring
            accuracy, relevance, and engaging narratives. We strive to be your go-to source for
            understanding complex concepts, discovering new trends, and gaining valuable insights.
          </p>
          <p className="mt-4 text-sm sm:text-base text-gray-700 leading-relaxed">
            While only our dedicated administrators publish content, our ultimate goal is to
            empower our readers with the information they need to stay ahead, learn something new,
            or simply enjoy a well-written story.
          </p>

          {/* Explore Articles Button */}
          <div className="mt-6">
            <Link
              to="/blog"
              className="flex w-full sm:w-[210px] items-center justify-center text-white rounded-lg px-4 py-2 bg-blue-500  transition-all duration-300 shadow-lg"
            >
              Explore Articles
              <svg
                className="ml-2"
                width="16"
                height="16"
                viewBox="0 0 16 16"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M5 3L11 8L5 13"
                  stroke="white"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default About;
