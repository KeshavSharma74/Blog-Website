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
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

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
          <Link to="/" className="text-gray-500 hover:text-blue-700 transition-colors duration-200 tracking-wide">
            Home
          </Link>
          <Link to="/blog" className="text-gray-500 hover:text-blue-700 transition-colors duration-200 tracking-wide">
            Blogs
          </Link>
          {navItems.map(({ label, path }) => (
            <a
              key={path}
              href={path}
              className="text-gray-500 hover:text-blue-700 transition-colors duration-200 tracking-wide"
            >
              {label}
            </a>
          ))}
        </div>

        {/* Desktop Buttons */}
        <div className="hidden lg:flex items-center space-x-4">
          {user ? (
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
              className="text-white hover:cursor-pointer rounded-lg px-4 py-1 bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 transition-all duration-300 shadow-lg"
            >
              Logout
            </button>
          ) : (
            <Link
              to="/login"
              className="text-white rounded-lg px-4 py-1 bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 hover:cursor-pointer transition-all duration-300 shadow-lg"
            >
              Login
            </Link>
          )}
        </div>

        {/* Mobile Toggle Button */}
        <button
          className="lg:hidden text-gray-700 focus:outline-none"
          onClick={() => setIsMobileMenuOpen(true)}
        >
          <List size={28} weight="bold" />
        </button>
      </nav>

      {/* Mobile Menu Overlay */}
      {isMobileMenuOpen && (
        <div className="fixed inset-0 bg-white z-50 overflow-y-auto">
          <div className="flex items-center justify-between px-6 py-4 border-b border-gray-200">
            <Link
              to="/"
              onClick={() => setIsMobileMenuOpen(false)}
              className="text-xl font-bold text-gray-700"
            >
              KLOUDSHARK
            </Link>
            <button onClick={() => setIsMobileMenuOpen(false)} className="text-gray-700">
              <X size={28} weight="bold" />
            </button>
          </div>

          <div className="flex flex-col items-center space-y-6 mt-8">
            <Link
              to="/"
              className="text-lg text-gray-700 hover:text-blue-700 tracking-wide"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              Home
            </Link>
            <Link
              to="/blog"
              className="text-lg text-gray-700 hover:text-blue-700 tracking-wide"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              Blogs
            </Link>
            {navItems.map(({ label, path }) => (
              <a
                key={path}
                href={path}
                className="text-lg text-gray-700 hover:text-blue-700 tracking-wide"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                {label}
              </a>
            ))}

            <div className="pt-6">
              {user ? (
                <button
                  onClick={async () => {
                    try {
                      const action = await dispatch(logout());
                      setIsMobileMenuOpen(false);
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
                  className="text-white rounded-lg px-4 py-1 bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 hover:cursor-pointer transition-all duration-300 shadow-lg"
                >
                  Logout
                </button>
              ) : (
                <Link
                  to="/login"
                  className="text-white rounded-lg px-4 py-1 bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 transition-all duration-300 shadow-lg hover:cursor-pointer"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  Login
                </Link>
              )}
            </div>
          </div>
        </div>
      )}
    </header>
  );
};

export default Navigation;
