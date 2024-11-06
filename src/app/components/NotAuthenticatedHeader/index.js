import * as React from 'react';
import { Link } from 'react-router-dom';

export const NotAuthenticatedHeader = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = React.useState(false);

  return (
    <nav className="bg-white shadow-sm">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="relative flex h-16 items-center justify-between">
          {/* Logo section */}
          <div className="flex flex-shrink-0 items-center">
            <img
              className="h-8 w-auto"
              src="/dist2/static/image1.png"
              alt="Bloggrs"
            />
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex md:items-center md:space-x-8">
            <Link
              to="/features"
              className="text-sm font-medium text-gray-500 hover:text-[#1a365d] transition-colors duration-200"
            >
              Features
            </Link>
            <Link
              to="/pricing"
              className="text-sm font-medium text-gray-500 hover:text-[#1a365d] transition-colors duration-200"
            >
              Pricing
            </Link>
            <Link
              to="/blog"
              className="text-sm font-medium text-gray-500 hover:text-[#1a365d] transition-colors duration-200"
            >
              Blog
            </Link>
          </div>

          {/* Profile/Sign Up Section */}
          <div className="flex items-center space-x-4">
            <Link to="/blogs/create">
              <button className="inline-flex items-center rounded-lg bg-[#f4a261] px-4 py-2 text-sm font-medium text-white hover:bg-[#e76f51] transition-colors duration-200 shadow-sm">
                Add Post
              </button>
            </Link>
          </div>

          {/* Mobile menu button */}
          <div className="flex md:hidden">
            <button
              type="button"
              className="inline-flex items-center justify-center rounded-md p-2 text-gray-400 hover:bg-gray-100 hover:text-gray-500"
              aria-controls="mobile-menu"
              aria-expanded={isMobileMenuOpen}
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            >
              <span className="sr-only">Open main menu</span>
              <svg
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 6h16M4 12h16M4 18h16"
                />
              </svg>
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      <div
        className={`${isMobileMenuOpen ? 'block' : 'hidden'} md:hidden`}
        id="mobile-menu"
      >
        <div className="space-y-1 px-4 pb-3 pt-2">
          <Link
            to="/features"
            className="block rounded-md px-3 py-2 text-base font-medium text-gray-500 hover:bg-gray-50 hover:text-[#1a365d]"
          >
            Features
          </Link>
          <Link
            to="/pricing"
            className="block rounded-md px-3 py-2 text-base font-medium text-gray-500 hover:bg-gray-50 hover:text-[#1a365d]"
          >
            Pricing
          </Link>
          <Link
            to="/blog"
            className="block rounded-md px-3 py-2 text-base font-medium text-gray-500 hover:bg-gray-50 hover:text-[#1a365d]"
          >
            Blog
          </Link>
        </div>
      </div>
    </nav>
  );
};
