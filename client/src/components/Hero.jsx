import React from 'react'

const Hero = () => {
  return (
    <div className="mt-16 border-b border-b-gray-200 bg-blue-50">
      <div className="flex flex-col lg:flex-row w-full max-w-[1350px] mx-auto px-4 sm:px-6 lg:px-8 h-auto lg:h-[570px] py-8 lg:py-0">
        
        {/* Left Section */}
        <div className="w-full lg:w-1/2 flex flex-col justify-center gap-6 lg:gap-7 px-2 sm:px-0">
          <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold leading-tight">
            Explore Thoughtful Insights, Stories, and Knowledge Every Day
          </h1>
          <p className="text-gray-400 text-sm sm:text-base lg:text-lg leading-relaxed">
            At Kloudshark, we bring you curated stories, insights, and tutorials across tech, 
            lifestyle, education, and more. Our mission is to share knowledge that informs, 
            inspires, and helps you grow every day.
          </p>

          {/* Avatars + Rating Section */}
          <div className="flex flex-col sm:flex-row sm:items-center gap-4 sm:gap-0 sm:divide-x sm:divide-gray-300">
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
                Trusted by <span className="font-medium text-gray-800">100,000+</span> users
              </p>
            </div>
          </div>
        </div>

        {/* Right Section (Hidden on small screens) */}
        <div className="hidden lg:flex w-full lg:w-1/2 justify-center items-center lg:mt-0">
          <img src="hero1.png" className="w-full max-w-md lg:max-w-none h-auto" alt="Hero" />
        </div>

      </div>
    </div>
  )
}

export default Hero
