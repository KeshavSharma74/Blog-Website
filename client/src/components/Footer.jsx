import React from 'react';
import { Link } from 'react-router-dom';

// Back-to-top arrow icon
const UpArrowIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
    <path
      fillRule="evenodd"
      d="M10 18a.75.75 0 01-.75-.75V4.56l-2.22 2.22a.75.75 0 11-1.06-1.06l3.5-3.5a.75.75 0 011.06 0l3.5 3.5a.75.75 0 11-1.06 1.06L10.75 4.56v12.69a.75.75 0 01-.75-.75z"
      clipRule="evenodd"
    />
  </svg>
);

const Footer = () => {
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  return (
    // Changed default text color to a dark gray
    <footer className="bg-[#EFF6FF] text-gray-700 relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute inset-0" style={{
          // Changed pattern color from white to a dark gray for visibility
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%231F2937' fill-opacity='0.1'%3E%3Ccircle cx='30' cy='30' r='2'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
        }} />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Main Footer Content */}
        <div className="py-16">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12">
            
            {/* Brand Section */}
            <div className="lg:col-span-1">
              <div className="flex items-center mb-6">
                <img 
                  src="/newFevicon.png" 
                  alt="Kloudshark logo" 
                  className="w-9 h-9 mr-1"
                />
                {/* Changed text to black */}
                <h2 className="text-2xl font-bold text-black">KLOUDSHARK</h2>
              </div>
              {/* Darkened paragraph text */}
              <p className="text-gray-600 mb-6 text-lg leading-relaxed">
                Discover insights, share knowledge, and grow together. Your trusted source for quality content across technology, lifestyle, and beyond.
              </p>
              <div className="flex space-x-4">
                {/* Darkened social icons */}
                <a href="#" className="text-gray-500 hover:text-blue-500 transition-colors duration-200" aria-label="Twitter">
                  <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616v.064c0 2.298 1.634 4.214 3.793 4.649-.69.188-1.452.23-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z" />
                  </svg>
                </a>
                <a href="#" className="text-gray-500 hover:text-blue-500 transition-colors duration-200" aria-label="LinkedIn">
                  <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
                  </svg>
                </a>
                <a href="#" className="text-gray-500 hover:text-blue-500 transition-colors duration-200" aria-label="GitHub">
                  <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
                  </svg>
                </a>
                <a href="#" className="text-gray-500 hover:text-blue-500 transition-colors duration-200" aria-label="YouTube">
                  <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M19.615 3.184c-3.604-.246-11.631-.245-15.23 0C.488 3.427-.002 6.291 0 12c.002 5.709.488 8.573 4.385 8.816 3.6.245 11.626.246 15.23 0 3.897-.243 4.385-3.107 4.385-8.816 0-5.709-.488-8.573-4.385-8.816zM9.5 15.5V8.5l6 3.5-6 3.5z" />
                  </svg>
                </a>
              </div>
            </div>

            {/* Quick Links */}
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-6">Quick Links</h3>
              <ul className="space-y-4">
                <li><Link to="/" className="text-gray-700 hover:text-black transition-colors duration-200 flex items-center group"><span className="w-1 h-1 bg-blue-500 rounded-full mr-3 group-hover:bg-black transition-colors"></span>Home</Link></li>
                <li><Link to="/about" className="text-gray-700 hover:text-black transition-colors duration-200 flex items-center group"><span className="w-1 h-1 bg-blue-500 rounded-full mr-3 group-hover:bg-black transition-colors"></span>About Us</Link></li>
                <li><Link to="/blog" className="text-gray-700 hover:text-black transition-colors duration-200 flex items-center group"><span className="w-1 h-1 bg-blue-500 rounded-full mr-3 group-hover:bg-black transition-colors"></span>All Blogs</Link></li>
                <li><Link to="/testimonials" className="text-gray-700 hover:text-black transition-colors duration-200 flex items-center group"><span className="w-1 h-1 bg-blue-500 rounded-full mr-3 group-hover:bg-black transition-colors"></span>Testimonials</Link></li>
                <li><Link to="/faq" className="text-gray-700 hover:text-black transition-colors duration-200 flex items-center group"><span className="w-1 h-1 bg-blue-500 rounded-full mr-3 group-hover:bg-black transition-colors"></span>FAQ</Link></li>
              </ul>
            </div>

            {/* Categories */}
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-6">Categories</h3>
              <ul className="space-y-4">
                <li><Link to="/category/AI" className="text-gray-700 hover:text-black transition-colors duration-200 flex items-center group"><span className="w-1 h-1 bg-blue-500 rounded-full mr-3 group-hover:bg-black transition-colors"></span>AI & Machine Learning</Link></li>
                <li><Link to="/category/Computer" className="text-gray-700 hover:text-black transition-colors duration-200 flex items-center group"><span className="w-1 h-1 bg-blue-500 rounded-full mr-3 group-hover:bg-black transition-colors"></span>Computer Science</Link></li>
                <li><Link to="/category/Tech" className="text-gray-700 hover:text-black transition-colors duration-200 flex items-center group"><span className="w-1 h-1 bg-blue-500 rounded-full mr-3 group-hover:bg-black transition-colors"></span>Technology</Link></li>
                <li><Link to="/category/Science" className="text-gray-700 hover:text-black transition-colors duration-200 flex items-center group"><span className="w-1 h-1 bg-blue-500 rounded-full mr-3 group-hover:bg-black transition-colors"></span>Science</Link></li>
                <li><Link to="/category/Other" className="text-gray-700 hover:text-black transition-colors duration-200 flex items-center group"><span className="w-1 h-1 bg-blue-500 rounded-full mr-3 group-hover:bg-black transition-colors"></span>Other Topics</Link></li>
              </ul>
            </div>

            {/* Contact & Resources */}
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-6">Resources</h3>
              <div className="space-y-6">
                <div>
                  <ul className="space-y-2 text-sm">
                    <li><Link to="/blog" className="text-gray-700 hover:text-black transition-colors duration-200 flex items-center group"><span className="w-1 h-1 bg-blue-500 rounded-full mr-3 group-hover:bg-black transition-colors"></span>Latest Articles</Link></li>
                    <li><Link to="/category/AI" className="text-gray-700 hover:text-black transition-colors duration-200 flex items-center group"><span className="w-1 h-1 bg-blue-500 rounded-full mr-3 group-hover:bg-black transition-colors"></span>AI & Machine Learning</Link></li>
                    <li><Link to="/category/Tech" className="text-gray-700 hover:text-black transition-colors duration-200 flex items-center group"><span className="w-1 h-1 bg-blue-500 rounded-full mr-3 group-hover:bg-black transition-colors"></span>Tech Trends</Link></li>
                    <li><Link to="/testimonials" className="text-gray-700 hover:text-black transition-colors duration-200 flex items-center group"><span className="w-1 h-1 bg-blue-500 rounded-full mr-3 group-hover:bg-black transition-colors"></span>Reader Stories</Link></li>
                  </ul>
                </div>
                
                {/* Changed border to a lighter gray */}
                <div className="pt-4 border-t border-gray-300">
                  <h4 className="text-gray-800 font-medium mb-3">Connect With Us</h4>
                  <div className="space-y-3">
                    <div className="flex items-center text-gray-700 hover:text-black transition-colors duration-200 cursor-pointer">
                      <svg className="w-4 h-4 mr-3 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" /></svg>
                      <span className="text-sm">info@kloudshark.com</span>
                    </div>
                    <div className="flex items-center text-gray-700 hover:text-black transition-colors duration-200 cursor-pointer">
                      <svg className="w-4 h-4 mr-3 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" /></svg>
                      <span className="text-sm">Join our community</span>
                    </div>
                    <div className="flex items-center text-gray-700 hover:text-black transition-colors duration-200 cursor-pointer">
                      <svg className="w-4 h-4 mr-3 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                      <span className="text-sm">Help & Support</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="border-t border-gray-300 py-8">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            {/* Copyright */}
            <div className="text-center md:text-left">
              <p className="text-gray-600 text-sm">
                © 2025 Kloudshark. All rights reserved. Made with ❤️ for knowledge seekers.
              </p>
            </div>

            {/* Legal Links */}
            <div className="flex flex-wrap items-center gap-6 text-sm">
              <p className="text-gray-600 hover:text-black transition-colors duration-200 cursor-pointer">Privacy Policy</p>
              <p className="text-gray-600 hover:text-black transition-colors duration-200 cursor-pointer">Terms of Service</p>
              <p className="text-gray-600 hover:text-black transition-colors duration-200 cursor-pointer">Cookie Policy</p>
            </div>

            {/* Back to Top Button */}
            <button
              onClick={scrollToTop}
              aria-label="Back to top"
              // Added text-white for the icon
              className="bg-blue-500 text-white p-3 rounded-full transition-all duration-200 shadow-lg hover:shadow-xl transform hover:-translate-y-1"
            >
              <UpArrowIcon />
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;