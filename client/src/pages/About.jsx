import React from 'react';
import Navigation from '../components/Navigation';

const About = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      <Navigation />
      
      {/* New Hero Section for About Page */}
      <div className="mt-16 border-b border-b-gray-200 bg-blue-50">
        <div className="flex flex-col lg:flex-row w-full max-w-[1350px] mx-auto px-4 sm:px-6 lg:px-8 h-auto lg:h-[570px] py-12 lg:py-0">
          
          {/* Left Section */}
          <div className="w-full lg:w-1/2 flex flex-col justify-center gap-6 lg:gap-7 px-2 sm:px-0">
            <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold leading-tight">
              Uncover Ideas, Forge Connections, and Expand Horizons Daily
            </h1>
            <p className="text-gray-400 text-sm sm:text-base lg:text-lg leading-relaxed">
              At Kloudshark, we are dedicated to curating a diverse collection of insightful articles,
              stories, and practical tutorials spanning technology, personal growth, creative arts,
              and global cultures. Our mission is to build a thriving community where knowledge
              is freely shared, perspectives widen, and every reader can embark on a continuous
              journey of learning and discovery.
            </p>

            {/* Avatars + Rating Section */}
            <div className="flex flex-col sm:flex-row sm:items-center gap-4 sm:divide-x sm:divide-gray-300">
              {/* Avatars */}
              <div className="flex -space-x-3 sm:pr-3">
                <img src="https://images.unsplash.com/photo-1633332755192-727a05c4013d?q=80&w=200" alt="user1" className="w-10 h-10 sm:w-12 sm:h-12 rounded-full border-2 border-white hover:-translate-y-1 transition z-1" />
                <img src="https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?q=80&w=200" alt="user2" className="w-10 h-10 sm:w-12 sm:h-12 rounded-full border-2 border-white hover:-translate-y-1 transition z-[2]" />
                <img src="https://images.unsplash.com/photo-1438761681033-6461ffad8d80?q=80&w=200&h=200&auto=format&fit=crop" alt="user3" className="w-10 h-10 sm:w-12 sm:h-12 rounded-full border-2 border-white hover:-translate-y-1 transition z-[3]" />
                <img src="https://randomuser.me/api/portraits/men/75.jpg" alt="user4" className="w-10 h-10 sm:w-12 sm:h-12 rounded-full border-2 border-white hover:-translate-y-1 transition z-[4]" />
              </div>

              {/* Rating */}
              <div className="sm:pl-3">
                <div className="flex items-center">
                  {[...Array(5)].map((_, i) => (
                    <svg key={i} xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="#FACC15" stroke="#FACC15" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="sm:w-[18px] sm:h-[18px]">
                      <path d="m12 2 3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01z"/>
                    </svg>
                  ))}
                  <p className="text-gray-600 font-medium ml-2 text-sm sm:text-base">5.0</p>
                </div>
                <p className="text-xs sm:text-sm text-gray-500">
                  Trusted by <span className="font-medium text-gray-800">100,000+</span> curious minds globally
                </p>
              </div>
            </div>
          </div>

          {/* Right Section (Image) */}
          <div className="hidden lg:flex lg:w-1/2 justify-center items-center mt-8 lg:mt-0">
            {/* The image here is a placeholder. In a real application, you'd use the generated image. */}
            <img 
              src="aboutHero.png" // Replace with your actual image path
              className="w-full h-auto object-cover rounded-lg" // <-- CHANGE IS HERE
              alt="Kloudshark team collaborating on knowledge sharing and discovery" 
            />
          </div>

        </div>
      </div>

      {/* Main Content (Remains the same) */}
      <div className="max-w-[1300px] mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="flex flex-col lg:flex-row gap-8 lg:gap-10">
          {/* Left Side - Image */}
          <div className="flex-1">
            <img
              className="w-full h-full object-cover rounded-2xl shadow-lg"
              src="aboutPage.png" // Replace with your actual image path
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
              At Kloudshark, we believe in the power of knowledge sharing and meaningful content. 
              Our mission is to create a platform where readers can discover valuable insights, 
              learn new concepts, and stay informed about the latest trends in technology, 
              lifestyle, and beyond.
            </p>

            <h3 className="text-lg sm:text-xl uppercase font-semibold text-slate-700 mt-8">
              What We Do
            </h3>
            <div className="w-20 sm:w-24 h-[3px] rounded-full bg-gradient-to-r from-blue-600 to-[#D9E6FF] mt-2"></div>

            <p className="mt-6 sm:mt-8 text-sm sm:text-base text-gray-700 leading-relaxed">
              We curate and publish high-quality articles that span across various domains. 
              From cutting-edge technology insights to practical life advice, our content 
              is designed to educate, inspire, and engage our community of readers.
            </p>

            <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="bg-white p-4 rounded-lg shadow-sm">
                <h4 className="font-semibold text-gray-800 mb-2">Quality Content</h4>
                <p className="text-sm text-gray-600">Every article is carefully researched and written with attention to detail.</p>
              </div>
              <div className="bg-white p-4 rounded-lg shadow-sm">
                <h4 className="font-semibold text-gray-800 mb-2">Expert Insights</h4>
                <p className="text-sm text-gray-600">Our team brings years of experience and expertise to every topic.</p>
              </div>
            </div>
          </div>
        </div>
      </div>

    </div>
  );
};

export default About;