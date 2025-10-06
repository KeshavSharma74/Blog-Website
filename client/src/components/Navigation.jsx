import { useState, useEffect } from 'react';
import { List, X } from 'phosphor-react';
import { Link } from 'react-router-dom';
import toast from 'react-hot-toast';
import { useDispatch, useSelector } from 'react-redux';
import { logout } from '@/features/authSlice';

const navItems = [
  { label: 'Features', path: '#features' },
  { label: 'Pricing', path: '#pricing' },
  { label: 'Testimonials', path: '#testimonials' },
  { label: 'FAQ', path: '#faq' },
];

const Navigation = () => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.auth.user);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 w-full border-b-gray-200 border-b z-50 transition-shadow duration-300 bg-white ${
        isScrolled ? 'shadow-md' : 'shadow-none'
      }`}
    >
      <nav className="container  max-w-[1300px] h-16 mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          <Link to="/" className="text-xl font-bold tracking-tight text-gray-700">
            KLOUDSHARK
          </Link>

          {/* Desktop Nav Links */}
          <div className="hidden lg:flex items-center text-[0.94rem] space-x-8">
            <Link to="/" className="text-gray-500 hover:text-blue-700 transition-colors duration-200  tracking-wide">Home</Link>
            <Link to="/blog" className="text-gray-500 hover:text-blue-700 transition-colors duration-200  tracking-wide">Blogs</Link>
            {navItems.map(({ label, path }) => (
              <Link
                key={path}
                to={path}
                className="text-gray-500  hover:text-blue-700  transition-colors duration-200 tracking-wide"
              >
                {label}
              </Link>
            ))}
          </div>

          {/* Desktop Buttons */}
          <div className="hidden lg:flex items-center space-x-4 ">
            {user ? (
              <>
                <button
                  onClick={async () => {
                    try {
                      const action = await dispatch(logout())
                      if (logout.fulfilled.match(action)) {
                        const data = action.payload
                        const success = Boolean(data?.success)
                        const message = data?.message || (success ? 'Logged out' : 'Logout failed')
                        success ? toast.success(message) : toast.error(message)
                      } else {
                        const message = action.payload || action.error?.message || 'Logout failed'
                        toast.error(message)
                      }
                    } catch {
                      toast.error('Logout failed')
                    }
                  }}
                  className="text-white rounded-lg px-3 py-1 tracking-wide
                 bg-gradient-to-r from-blue-500 to-purple-600 {/* Added gradient */}
                 hover:from-blue-600 hover:to-purple-700 hover:cursor-pointer {/* Darker hover gradient */}
                 transition-all duration-300 ease-in-out {/* Smoother transition */}
                 shadow-lg hover:shadow-xl {/* Optional: Add shadow for depth */}
                 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-400 {/* Accessibility focus style */}
                 "
                >
                  Logout
                </button>
              </>
            ) : (
              <Link to="/login"   className="text-white rounded-lg px-3 py-1 tracking-wide
                 bg-gradient-to-r from-blue-500 to-purple-600 {/* Added gradient */}
                 hover:from-blue-600 hover:to-purple-700 hover:cursor-pointer {/* Darker hover gradient */}
                 transition-all duration-300 ease-in-out {/* Smoother transition */}
                 shadow-lg hover:shadow-xl {/* Optional: Add shadow for depth */}
                 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-400 {/* Accessibility focus style */}
                 ">
                Login
              </Link>
            )}

          </div>

          {/* Mobile Toggle Button */}
          <button className="lg:hidden text-gray-700" onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}>
            <List size={24} weight="light" />
          </button>
        </div>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div className="lg:hidden fixed inset-0 z-50 bg-white">
            <div className="container mx-auto px-6 py-4">
              <div className="flex items-center justify-between mb-8">
                <Link
                  to="/"
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="text-xl font-semibold text-gray-700 tracking-tight"
                >
                  BLOGIFY
                </Link>
                <button onClick={() => setIsMobileMenuOpen(false)} className="text-gray-700">
                  <X size={24} weight="light" />
                </button>
              </div>

              <div className="flex flex-col items-center space-y-6">
                <Link
                  to="/"
                  className="block text-xl text-gray-700 hover:text-gray-900 transition-colors duration-200 font-light tracking-wide"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  Home
                </Link>
                <Link
                  to="/blogs"
                  className="block text-xl text-gray-700 hover:text-gray-900 transition-colors duration-200 font-light tracking-wide"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  Blogs
                </Link>
                {navItems.map(({ label, path }) => (
                  <Link
                    key={path}
                    to={path}
                    className="block text-xl text-gray-700 hover:text-gray-900 transition-colors duration-200 font-light tracking-wide"
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    {label}
                  </Link>
                ))}
                <div className="pt-6 w-full flex flex-col items-center space-y-4">
                  {user ? (
                    <>
                      <button
                        onClick={async () => {
                          try {
                            const action = await dispatch(logout())
                            setIsMobileMenuOpen(false)
                            if (logout.fulfilled.match(action)) {
                              const data = action.payload
                              const success = Boolean(data?.success)
                              const message = data?.message || (success ? 'Logged out' : 'Logout failed')
                              success ? toast.success(message) : toast.error(message)
                            } else {
                              const message = action.payload || action.error?.message || 'Logout failed'
                              toast.error(message)
                            }
                          } catch {
                            toast.error('Logout failed')
                          }
                        }}
                                          className="text-white rounded-lg px-3 py-1 tracking-wide
                 bg-gradient-to-r from-blue-500 to-purple-600 {/* Added gradient */}
                 hover:from-blue-600 hover:to-purple-700 hover:cursor-pointer {/* Darker hover gradient */}
                 transition-all duration-300 ease-in-out {/* Smoother transition */}
                 shadow-lg hover:shadow-xl {/* Optional: Add shadow for depth */}
                 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-400 {/* Accessibility focus style */}
                 "
                      >
                        Logout
                      </button>
                    </>
                  ) : (
                    <Link
                      to="/login"
                                        className="text-white rounded-lg px-3 py-1 tracking-wide
                 bg-gradient-to-r from-blue-500 to-purple-600 {/* Added gradient */}
                 hover:from-blue-600 hover:to-purple-700 hover:cursor-pointer {/* Darker hover gradient */}
                 transition-all duration-300 ease-in-out {/* Smoother transition */}
                 shadow-lg hover:shadow-xl {/* Optional: Add shadow for depth */}
                 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-400 {/* Accessibility focus style */}
                 "
                      onClick={() => setIsMobileMenuOpen(false)}
                    >
                      Login
                    </Link>
                  )}
                </div>
              </div>
            </div>
          </div>
        )}
      </nav>
    </header>
  );
};

export default Navigation;