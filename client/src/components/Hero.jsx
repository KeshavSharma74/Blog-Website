import React from 'react'

const Hero = () => {
  return (
    <div className="mt-16 border-b border-b-gray-200 bg-blue-50">
      <div className="flex flex-col md:flex-row w-full max-w-[1300px] mx-auto px-4 md:px-8 h-auto md:h-[570px] py-8 md:py-0">
        
        {/* Left Section */}
        <div className="w-full md:w-1/2 flex flex-col justify-center gap-7">
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold">
            Explore Thoughtful Insights, Stories, and Knowledge Every Day
          </h1>
          <p className="text-gray-400 text-base sm:text-lg">
            At Kloudshark, we bring you curated stories, insights, and tutorials across tech, 
            lifestyle, education, and more. Our mission is to share knowledge that informs, 
            inspires, and helps you grow every day.
          </p>

          {/* Avatars + Rating Section */}
          <div className="flex items-center divide-x divide-gray-300">
            {/* Avatars */}
            <div className="flex -space-x-3 pr-3">
              <img src="https://images.unsplash.com/photo-1633332755192-727a05c4013d?q=80&w=200" alt="user1" className="w-12 h-12 rounded-full border-2 border-white hover:-translate-y-1 transition z-1" />
              <img src="https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?q=80&w=200" alt="user2" className="w-12 h-12 rounded-full border-2 border-white hover:-translate-y-1 transition z-[2]" />
              <img src="https://images.unsplash.com/photo-1438761681033-6461ffad8d80?q=80&w=200&h=200&auto=format&fit=crop" alt="user3" className="w-12 h-12 rounded-full border-2 border-white hover:-translate-y-1 transition z-[3]" />
              <img src="https://randomuser.me/api/portraits/men/75.jpg" alt="user4" className="w-12 h-12 rounded-full border-2 border-white hover:-translate-y-1 transition z-[4]" />
            </div>

            {/* Rating */}
            <div className="pl-3">
              <div className="flex items-center">
                {[...Array(5)].map((_, i) => (
                  <svg key={i} xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="#FACC15" stroke="#FACC15" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="m12 2 3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01z"/>
                  </svg>
                ))}
                <p className="text-gray-600 font-medium ml-2">5.0</p>
              </div>
              <p className="text-sm text-gray-500">
                Trusted by <span className="font-medium text-gray-800">100,000+</span> users
              </p>
            </div>
          </div>
        </div>

        {/* Right Section (hidden on small screens) */}
        <div className="w-full md:w-1/2 justify-center items-center mt-6 md:mt-0 hidden md:flex">
          <img src="hero1.png" className="w-full" alt="Hero" />
        </div>

      </div>
    </div>
  )
}

export default Hero
