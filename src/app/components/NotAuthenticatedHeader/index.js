import * as React from 'react';
import { Link } from 'react-router-dom';

export const NotAuthenticatedHeader = () => {
  return (
    <nav className="bg-white py-4 border-b">
      <div className="mx-auto px-4 sm:px-6 lg:px-8">
        <div className="relative flex items-center justify-between">
          {/* Logo section */}
          <div className="flex items-center">
            <img
              className="h-8 w-auto"
              src="/dist2/static/image1.png"
              alt="Bloggrs"
            />
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            <Link to="/features" className="text-gray-600 hover:text-blue-600">
              Features
            </Link>
            <Link to="/pricing" className="text-gray-600 hover:text-blue-600">
              Pricing
            </Link>
            <Link to="/blog" className="text-gray-600 hover:text-blue-600">
              Blog
            </Link>
          </div>

          {/* Profile/Sign Up Section */}
          <div className="flex items-center space-x-4">
            <Link href="/blogs/create">
              <button className="bg-orange-400 text-white px-6 py-2 rounded-lg hover:bg-orange-500">
                Add Post
              </button>
            </Link>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <button
              type="button"
              className="text-gray-600 hover:text-gray-900"
              aria-controls="mobile-menu"
              aria-expanded="false"
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
      <div className="md:hidden hidden" id="mobile-menu">
        <div className="px-2 pt-2 pb-3 space-y-1">
          <a
            href="#"
            className="block px-3 py-2 text-gray-600 hover:text-blue-600"
          >
            Features
          </a>
          <a
            href="#"
            className="block px-3 py-2 text-gray-600 hover:text-blue-600"
          >
            Pricing
          </a>
          <a
            href="#"
            className="block px-3 py-2 text-gray-600 hover:text-blue-600"
          >
            Blog
          </a>
        </div>
      </div>
    </nav>
  );
};
