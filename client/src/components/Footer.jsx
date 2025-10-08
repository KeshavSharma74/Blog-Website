import React from 'react';
import { Link } from 'react-router-dom';

// A simple up-arrow SVG icon for the back-to-top button
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
  const categoryLinks = [
    { name: 'AI', to: '/category/ai' },
    { name: 'Computer', to: '/category/computer' },
    { name: 'Tech', to: '/category/tech' },
    { name: 'Science', to: '/category/science' },
    { name: 'Other', to: '/category/other' },
  ];

  const quickLinks = [
    { name: 'Home', to: '/' },
    { name: 'About Us', to: '/about' },
    { name: 'All Posts', to: '/blog' },
    { name: 'Archive', to: '/archive' },
    { name: 'Contact', to: '/contact' },
  ];

  const legalLinks = [
    { name: 'Privacy Policy', to: '/privacy-policy' },
    { name: 'Terms of Service', to: '/terms' },
    { name: 'Admin Login', to: '/admin/login' },
  ];

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  return (
    <footer className="bg-gradient-to-b from-[#7e05d4] to-[#180047] text-gray-300">
      <div className="max-w-7xl mx-auto px-6 py-12">
        {/* Top section with link columns */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {/* Categories Column */}
          <div>
            <h3 className="font-bold text-white mb-4">Categories</h3>
            <ul className="space-y-3">
              {categoryLinks.map((link) => (
                <li key={link.name}>
                  <Link to={link.to} className="hover:text-white transition-colors duration-200">
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Quick Links Column */}
          <div>
            <h3 className="font-bold text-white mb-4">Quick Links</h3>
            <ul className="space-y-3">
              {quickLinks.map((link) => (
                <li key={link.name}>
                  <Link to={link.to} className="hover:text-white transition-colors duration-200">
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Legal Column */}
          <div>
            <h3 className="font-bold text-white mb-4">Legal</h3>
            <ul className="space-y-3">
              {legalLinks.map((link) => (
                <li key={link.name}>
                  <Link to={link.to} className="hover:text-white transition-colors duration-200">
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <hr className="my-10 border-purple-900" />

        {/* Bottom section with socials and back-to-top */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-8">
          {/* Left Side: Logo & Socials */}
          <div className="text-center md:text-left">
            <h2 className="text-2xl font-bold text-white">KLOUDSHARK</h2>
            <div className="flex space-x-4 mt-4 justify-center md:justify-start">
              <Link to="#" aria-label="YouTube" className="text-gray-400 hover:text-white">
                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M19.615 3.184c-3.604-.246-11.631-.245-15.23 0C.488 3.427-.002 6.291 0 12c.002 5.709.488 8.573 4.385 8.816 3.6.245 11.626.246 15.23 0 3.897-.243 4.385-3.107 4.385-8.816 0-5.709-.488-8.573-4.385-8.816zM9.5 15.5V8.5l6 3.5-6 3.5z" />
                </svg>
              </Link>
              <Link to="#" aria-label="LinkedIn" className="text-gray-400 hover:text-white">
                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
                </svg>
              </Link>
              <Link to="#" aria-label="X" className="text-gray-400 hover:text-white">
                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616v.064c0 2.298 1.634 4.214 3.793 4.649-.69.188-1.452.23-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z" />
                </svg>
              </Link>
            </div>
          </div>

          {/* Right Side: Back-to-Top button */}
          <div className="self-center md:self-end">
            <button
              onClick={scrollToTop}
              aria-label="Back to top"
              className="bg-purple-800 p-2 rounded-md hover:bg-purple-700 transition-colors duration-200"
            >
              <UpArrowIcon />
            </button>
          </div>
        </div>

        {/* Centered Copyright */}
        <div className="text-center pt-4 mt-4 border-t border-purple-900">
          <p className="text-sm text-gray-400">
            © Kloudshark Inc. 2025. All Rights Reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;