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
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 w-full border z-50 transition-all duration-300 ${
        isScrolled
          ? 'bg-white/5 border-b border-white/10 backdrop-blur-md shadow-sm'
          : 'bg-transparent border-transparent'
      }`}
    >
      <nav className="container max-w-[1300px] mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          <Link to="/" className="text-xl font-semibold tracking-tight text-gray-300">
            BLOGIFY
          </Link>

          {/* Desktop Nav Links */}
          <div className="hidden lg:flex items-center space-x-8">
            <Link to="/" className="text-gray-300 hover:text-white transition-colors duration-200 font-light tracking-wide">Home</Link>
            <Link to="/blog" className="text-gray-300 hover:text-white transition-colors duration-200 font-light tracking-wide">Blogs</Link>
            {navItems.map(({ label, path }) => (
              <Link
                key={path}
                to={path}
                className="text-gray-300 hover:text-white text-[1.15rem] transition-colors duration-200 font-light tracking-wide"
              >
                {label}
              </Link>
            ))}
          </div>

          {/* Desktop Buttons */}
          <div className="hidden lg:flex items-center space-x-4">
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
                  className="text-gray-300 hover:text-white hover:cursor-pointer transition-colors duration-200 font-light tracking-wide"
                >
                  Logout
                </button>
              </>
            ) : (
              <Link to="/login" className="text-gray-300 hover:text-white transition-colors duration-200 font-light tracking-wide">
                Login
              </Link>
            )}
            <button className="rounded-full border border-white/10 bg-gradient-to-b from-white/10 to-white/5 px-4 py-2 text-gray-300 shadow-lg transition-all duration-300 hover:border-[#9b87f5]/30 hover:shadow-[0_0_20px_rgba(155,135,245,0.5)]">
              Get Started
            </button>
          </div>

          {/* Mobile Toggle Button */}
          <button className="lg:hidden text-white" onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}>
            <List size={24} weight="light" />
          </button>
        </div>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div className="lg:hidden fixed inset-0 z-50 backdrop-blur-xl">
            <div className="container mx-auto px-6 py-4">
              <div className="flex items-center justify-between mb-8">
                <Link
                  to="/"
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="text-xl font-semibold text-white tracking-tight"
                >
                  BLOGIFY
                </Link>
                <button onClick={() => setIsMobileMenuOpen(false)} className="text-white">
                  <X size={24} weight="light" />
                </button>
              </div>

              <div className="flex flex-col items-center space-y-6">
                <Link
                  to="/"
                  className="block text-xl text-gray-300 hover:text-white transition-colors duration-200 font-light tracking-wide"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  Home
                </Link>
                <Link
                  to="/blogs"
                  className="block text-xl text-gray-300 hover:text-white transition-colors duration-200 font-light tracking-wide"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  Blogs
                </Link>
                {navItems.map(({ label, path }) => (
                  <Link
                    key={path}
                    to={path}
                    className="block text-xl text-gray-300 hover:text-white transition-colors duration-200 font-light tracking-wide"
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
                        className="block text-xl text-gray-300 hover:text-white transition-colors duration-200 font-light tracking-wide"
                      >
                        Logout
                      </button>
                    </>
                  ) : (
                    <Link
                      to="/login"
                      className="block text-xl text-gray-300 hover:text-white transition-colors duration-200 font-light tracking-wide"
                      onClick={() => setIsMobileMenuOpen(false)}
                    >
                      Login
                    </Link>
                  )}
                  <button className="w-full rounded-full border border-white/10 bg-gradient-to-b from-white/10 to-white/5 px-4 py-2 text-gray-300 shadow-lg transition-all duration-300 hover:border-[#9b87f5]/30 hover:shadow-[0_0_20px_rgba(155,135,245,0.5)]">
                    Get Started
                  </button>
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
