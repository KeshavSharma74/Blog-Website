import { useState, useEffect } from 'react';
import { List, X } from 'phosphor-react';
import { Link, useLocation } from 'react-router-dom';
import toast from 'react-hot-toast';
import { useDispatch, useSelector } from 'react-redux';
import { logout } from '@/features/authSlice';

const Navigation = () => {
  const dispatch = useDispatch();
  const location = useLocation();
  const user = useSelector((state) => state.auth.user);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isMenuAnimating, setIsMenuAnimating] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Scroll to top when route changes
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location.pathname]);

  // Prevent body scroll when mobile menu is open
  useEffect(() => {
    document.body.style.overflow = isMobileMenuOpen ? 'hidden' : 'unset';
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isMobileMenuOpen]);

  const openMenu = () => {
    setIsMenuAnimating(true);
    setIsMobileMenuOpen(true);
  };

  const closeMenu = () => {
    setIsMenuAnimating(false);
    setTimeout(() => setIsMobileMenuOpen(false), 1300); // wait for animation
  };

  return (
    <header
      className={`fixed top-0 w-full border-b border-gray-200 z-50 transition-all duration-300 bg-white ${
        isScrolled ? 'shadow-md' : 'shadow-none'
      }`}
    >
      <nav className="max-w-[1350px] mx-auto px-3 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        {/* Logo */}
        <Link to="/" className="text-xl font-bold tracking-tight text-gray-700">
          KLOUDSHARK
        </Link>

        {/* Desktop Nav Links */}
        <div className="hidden lg:flex items-center text-[0.94rem] space-x-8">
          {['/', '/about', '/testimonials', '/faq', '/blog'].map((path, i) => (
            <Link
              key={i}
              to={path}
              className="text-gray-500 hover:text-blue-700 transition-colors duration-200 tracking-wide cursor-pointer"
            >
              {path === '/' ? 'Home' : path.replace('/', '').charAt(0).toUpperCase() + path.slice(2)}
            </Link>
          ))}
        </div>

        {/* Desktop Buttons */}
        <div className="hidden lg:flex items-center space-x-4">
          {user ? (
            <>
              {user.role === 'admin' && (
                <Link
                  to="/create-blog"
                  className="text-white rounded-lg px-4 py-1 bg-gradient-to-r from-red-500 to-pink-600 hover:from-red-600 hover:to-pink-700 transition-all duration-300 shadow-lg font-medium"
                >
                  Create Blog
                </Link>
              )}
              <button
                onClick={async () => {
                  try {
                    const action = await dispatch(logout());
                    if (logout.fulfilled.match(action)) {
                      const data = action.payload;
                      const success = Boolean(data?.success);
                      const message =
                        data?.message || (success ? 'Logged out' : 'Logout failed');
                      success ? toast.success(message) : toast.error(message);
                    } else {
                      const message =
                        action.payload || action.error?.message || 'Logout failed';
                      toast.error(message);
                    }
                  } catch {
                    toast.error('Logout failed');
                  }
                }}
                className="text-white hover:cursor-pointer rounded-lg px-4 py-1  bg-blue-500  transition-all duration-300 shadow-lg"
              >
                Logout
              </button>
            </>
          ) : (
            <Link
              to="/login"
              className="text-white rounded-lg px-4 py-1 bg-blue-500  transition-all duration-300 shadow-lg"
            >
              Login
            </Link>
          )}
        </div>

        {/* Mobile Toggle Button */}
        <button
          className="lg:hidden text-gray-700 focus:outline-none"
          onClick={openMenu}
        >
          <List size={28} weight="bold" />
        </button>
      </nav>

      {/* Mobile Menu Overlay with Animation */}
      {isMobileMenuOpen && (
        <>
          {/* Backdrop */}
          <div
            className={`fixed inset-0 bg-black/50 backdrop-blur-sm z-40 transition-opacity duration-300 ${
              isMenuAnimating ? 'opacity-100' : 'opacity-0'
            }`}
            onClick={closeMenu}
          />

          {/* Slide-in Menu */}
          <div
            className={`fixed top-0 right-0 bottom-0 w-[85%] max-w-sm bg-white z-50 shadow-2xl transform transition-transform duration-300 ease-out ${
              isMenuAnimating ? 'translate-x-0' : 'translate-x-full'
            }`}
          >
            {/* Header */}
            <div className="flex items-center justify-between px-6 py-5 border-b border-gray-200 bg-gradient-to-r from-blue-50 to-purple-50">
              <Link
                to="/"
                onClick={closeMenu}
                className="text-xl font-bold tracking-tight text-gray-700 "
              >
                KLOUDSHARK
              </Link>
              <button
                onClick={closeMenu}
                className="text-gray-700 hover:text-gray-900 transition-colors p-2 hover:bg-gray-100 rounded-lg"
              >
                <X size={24} weight="bold" />
              </button>
            </div>

            {/* Menu Content */}
            <div className="flex flex-col h-[calc(100%-73px)] overflow-y-auto">
              <div className="flex-1 py-6 px-6 space-y-1">
                {['/', '/about', '/testimonials', '/faq', '/blog'].map((path, i) => (
                  <Link
                    key={i}
                    to={path}
                    onClick={closeMenu}
                    className="block px-4 py-3 text-gray-700 hover:bg-blue-50 hover:text-blue-700 rounded-lg transition-all duration-200 font-medium"
                  >
                    {path === '/' ? 'Home' : path.replace('/', '').charAt(0).toUpperCase() + path.slice(2)}
                  </Link>
                ))}
              </div>

              {/* Action Buttons */}
              <div className="px-6 py-6 border-t border-gray-200 bg-gray-50 space-y-3">
                {user ? (
                  <>
                    {user.role === 'admin' && (
                      <Link
                        to="/create-blog"
                        onClick={closeMenu}
                        className="block w-full text-center text-white rounded-lg px-4 py-3 bg-gradient-to-r from-red-500 to-pink-600 hover:from-red-600 hover:to-pink-700 transition-all duration-300 shadow-lg font-medium"
                      >
                        Create Blog
                      </Link>
                    )}
                    <button
                      onClick={async () => {
                        try {
                          const action = await dispatch(logout());
                          closeMenu();
                          if (logout.fulfilled.match(action)) {
                            const data = action.payload;
                            const success = Boolean(data?.success);
                            const message =
                              data?.message || (success ? 'Logged out' : 'Logout failed');
                            success ? toast.success(message) : toast.error(message);
                          } else {
                            const message =
                              action.payload || action.error?.message || 'Logout failed';
                            toast.error(message);
                          }
                        } catch {
                          toast.error('Logout failed');
                        }
                      }}
                      className="w-full text-white rounded-lg px-4 py-3 bg-blue-500  transition-all duration-300 shadow-lg font-medium"
                    >
                      Logout
                    </button>
                  </>
                ) : (
                  <Link
                    to="/login"
                    onClick={closeMenu}
                    className="block w-full text-center text-white rounded-lg px-4 py-3 bg-blue-500  transition-all duration-300 shadow-lg font-medium"
                  >
                    Login
                  </Link>
                )}
              </div>
            </div>
          </div>
        </>
      )}
    </header>
  );
};

export default Navigation;
