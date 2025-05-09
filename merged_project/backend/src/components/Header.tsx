import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { ShoppingCart, User, Menu, X, Search } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import { useCart } from '../contexts/CartContext';
import Button from './ui/Button';
import Logo from './Logo';

const Header: React.FC = () => {
  const { isAuthenticated, user } = useAuth();
  const { cart } = useCart();
  const navigate = useNavigate();
  const location = useLocation();
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  // Handle scroll event to change header style when scrolled
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Handle search
  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/products?search=${encodeURIComponent(searchQuery)}`);
      setMobileMenuOpen(false);
    }
  };

  const navItems = [
    { path: '/products', label: 'Products' },
    { path: '/design-studio', label: 'Design Studio' },
  ];

  return (
    <header
      className={`sticky top-0 z-30 w-full transition-all duration-300 ${
        isScrolled || !location.pathname.endsWith('/')
          ? 'bg-white shadow-md'
          : 'bg-transparent'
      }`}
    >
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16 md:h-20">
          {/* Logo */}
          <div className="flex-shrink-0">
            <Link to="/" className="flex items-center">
              <Logo />
            </Link>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex space-x-8">
            {navItems.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                className={`text-base font-medium transition-colors hover:text-brand-500 ${
                  location.pathname.startsWith(item.path)
                    ? 'text-brand-500'
                    : isScrolled || !location.pathname.endsWith('/')
                    ? 'text-gray-800'
                    : 'text-white'
                }`}
              >
                {item.label}
              </Link>
            ))}
          </nav>

          {/* Desktop Search */}
          <div className="hidden md:flex items-center flex-1 max-w-md mx-8">
            <form onSubmit={handleSearch} className="w-full">
              <div className="relative">
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search products..."
                  className="w-full px-4 py-2 rounded-full border border-gray-300 focus:outline-none focus:ring-1 focus:ring-brand-500 focus:border-brand-500"
                />
                <button
                  type="submit"
                  className="absolute right-0 top-0 h-full px-3 text-gray-500 hover:text-brand-500"
                >
                  <Search size={18} />
                </button>
              </div>
            </form>
          </div>

          {/* Right actions */}
          <div className="hidden md:flex items-center space-x-4">
            <Link
              to="/cart"
              className="relative p-2 text-gray-700 hover:text-brand-500 transition-colors"
            >
              <ShoppingCart size={24} />
              {cart.items.length > 0 && (
                <span className="absolute -top-1 -right-1 bg-accent-500 text-white text-xs font-bold rounded-full h-5 w-5 flex items-center justify-center">
                  {cart.items.length}
                </span>
              )}
            </Link>

            {isAuthenticated ? (
              <div className="relative group">
                <Link to="/profile" className="flex items-center space-x-2">
                  <div className="w-8 h-8 rounded-full bg-brand-100 flex items-center justify-center text-brand-600 font-semibold">
                    {user?.firstName?.charAt(0) || 'U'}
                  </div>
                  <span className={`font-medium ${
                    isScrolled || !location.pathname.endsWith('/')
                      ? 'text-gray-800'
                      : 'text-white'
                  }`}>
                    {user?.firstName}
                  </span>
                </Link>
                <div className="absolute right-0 w-48 py-2 mt-2 bg-white rounded-md shadow-xl opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300">
                  <Link
                    to="/profile"
                    className="block px-4 py-2 text-gray-800 hover:bg-gray-100"
                  >
                    Profile
                  </Link>
                  <Link
                    to="/orders"
                    className="block px-4 py-2 text-gray-800 hover:bg-gray-100"
                  >
                    My Orders
                  </Link>
                  {user?.role === 'admin' && (
                    <Link
                      to="/admin"
                      className="block px-4 py-2 text-gray-800 hover:bg-gray-100"
                    >
                      Admin Portal
                    </Link>
                  )}
                  {user?.role === 'vendor' && (
                    <Link
                      to="/vendor"
                      className="block px-4 py-2 text-gray-800 hover:bg-gray-100"
                    >
                      Vendor Portal
                    </Link>
                  )}
                </div>
              </div>
            ) : (
              <div className="flex space-x-2">
                <Button to="/login" variant="outline" size="sm">
                  Login
                </Button>
                <Button to="/register" variant="primary" size="sm">
                  Sign Up
                </Button>
              </div>
            )}
          </div>

          {/* Mobile menu button */}
          <div className="flex md:hidden items-center space-x-4">
            <Link
              to="/cart"
              className="relative p-2 text-gray-700 hover:text-brand-500 transition-colors"
            >
              <ShoppingCart size={24} />
              {cart.items.length > 0 && (
                <span className="absolute -top-1 -right-1 bg-accent-500 text-white text-xs font-bold rounded-full h-5 w-5 flex items-center justify-center">
                  {cart.items.length}
                </span>
              )}
            </Link>
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-md text-gray-600 hover:text-brand-500 hover:bg-gray-100"
            >
              {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      <div
        className={`md:hidden absolute top-16 inset-x-0 bg-white shadow-lg transition-transform duration-300 ease-in-out ${
          mobileMenuOpen ? 'translate-y-0' : '-translate-y-full'
        }`}
      >
        <div className="px-4 py-3">
          <form onSubmit={handleSearch} className="mb-4">
            <div className="relative">
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search products..."
                className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-1 focus:ring-brand-500 focus:border-brand-500"
              />
              <button
                type="submit"
                className="absolute right-0 top-0 h-full px-3 text-gray-500 hover:text-brand-500"
              >
                <Search size={18} />
              </button>
            </div>
          </form>

          <nav className="space-y-1 pb-3">
            {navItems.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                className={`block py-2 px-3 rounded-md ${
                  location.pathname.startsWith(item.path)
                    ? 'bg-brand-50 text-brand-500'
                    : 'text-gray-700 hover:bg-gray-50'
                }`}
                onClick={() => setMobileMenuOpen(false)}
              >
                {item.label}
              </Link>
            ))}
          </nav>

          {isAuthenticated ? (
            <div className="pt-4 pb-3 border-t border-gray-200">
              <div className="flex items-center px-3">
                <div className="w-10 h-10 rounded-full bg-brand-100 flex items-center justify-center text-brand-600 font-semibold">
                  {user?.firstName?.charAt(0) || 'U'}
                </div>
                <div className="ml-3">
                  <div className="text-base font-medium text-gray-800">{`${user?.firstName} ${user?.lastName}`}</div>
                  <div className="text-sm font-medium text-gray-500">{user?.email}</div>
                </div>
              </div>
              <div className="mt-3 space-y-1">
                <Link
                  to="/profile"
                  className="block py-2 px-3 rounded-md text-gray-700 hover:bg-gray-50"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  Profile
                </Link>
                <Link
                  to="/orders"
                  className="block py-2 px-3 rounded-md text-gray-700 hover:bg-gray-50"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  My Orders
                </Link>
                {user?.role === 'admin' && (
                  <Link
                    to="/admin"
                    className="block py-2 px-3 rounded-md text-gray-700 hover:bg-gray-50"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    Admin Portal
                  </Link>
                )}
                {user?.role === 'vendor' && (
                  <Link
                    to="/vendor"
                    className="block py-2 px-3 rounded-md text-gray-700 hover:bg-gray-50"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    Vendor Portal
                  </Link>
                )}
              </div>
            </div>
          ) : (
            <div className="pt-4 pb-3 border-t border-gray-200">
              <div className="flex flex-col space-y-2">
                <Button to="/login" variant="outline" fullWidth onClick={() => setMobileMenuOpen(false)}>
                  Login
                </Button>
                <Button to="/register" variant="primary" fullWidth onClick={() => setMobileMenuOpen(false)}>
                  Sign Up
                </Button>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Backdrop for mobile menu */}
      {mobileMenuOpen && (
        <div
          className="md:hidden fixed inset-0 bg-black bg-opacity-25 z-20"
          onClick={() => setMobileMenuOpen(false)}
        ></div>
      )}
    </header>
  );
};

export default Header;