import React, { useState } from 'react';
import { Link } from 'react-router-dom';

export const Header = () => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  return (
    <nav className="bg-white shadow-sm py-4">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between">
          {/* Logo section */}
          <div className="flex items-center">
            <img
              className="h-8 w-auto"
              src="/dist/static/image1.png"
              alt="Bloggrs"
            />
          </div>

          {/* Navigation Links - Hidden on mobile */}
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

          {/* Search Bar */}
          <div className="hidden md:flex flex-1 max-w-xl mx-8">
            <div className="relative w-full">
              <input
                type="text"
                placeholder="Quick search..."
                className="w-full py-2 px-4 pl-10 bg-gray-50 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-100"
              />
              <div className="absolute left-3 top-2.5 text-gray-400">
                <svg
                  className="w-5 h-5"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                  />
                </svg>
              </div>
            </div>
          </div>

          {/* User Profile Section */}
          <div className="hidden md:flex items-center space-x-4">
            <Link to={"/"}>
              <button className="px-4 py-2 rounded-lg bg-orange-400 text-white hover:bg-orange-500">
                Add Post
              </button>
            </Link>
            <div className="relative">
              <div 
                className="flex items-center cursor-pointer"
                onClick={() => setIsDropdownOpen(!isDropdownOpen)}
              >
                <span className="text-gray-700 font-medium">Gjergj Kadriu</span>
                <span className="text-gray-400 ml-2">@gjergj71</span>
                <img
                  className="h-8 w-8 rounded-full ml-3"
                  src="/dist/static/icons8-test-account-80.png"
                  alt="Profile"
                />
              </div>

              {/* Dropdown Menu */}
              {isDropdownOpen && (
                <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 z-10">
                  <a
                    href="#"
                    className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                  >
                    Profile
                  </a>
                  <a
                    href="/auth/logout"
                    className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                  >
                    Logout
                  </a>
                </div>
              )}
            </div>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <button className="p-2 rounded-md text-gray-400 hover:text-gray-500">
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
    </nav>
  );
};
