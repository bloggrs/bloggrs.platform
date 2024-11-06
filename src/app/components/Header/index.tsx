import React, { useState } from 'react';
import { Link } from 'react-router-dom';

export const Header = () => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <div style={{ marginBottom: '72px' }}>
      <div className="h-[72px]"></div>
      
      <nav className="bg-white shadow-sm py-4 fixed w-full top-0 z-50">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between">
            {/* Logo section */}
            <div className="flex items-center">
              <Link to="/">
                <img
                  className="h-12 w-auto"
                  src="/dist/static/image1.png"
                  alt="Bloggrs"
                />
              </Link>
            </div>

            {/* Navigation Links - Updated styling */}
            <div className="hidden md:flex items-center space-x-8">
              <Link 
                to="/features" 
                className="text-sm font-medium text-gray-700 hover:text-gray-900 transition-colors duration-200"
              >
                Features
              </Link>
              <Link 
                to="/pricing" 
                className="text-sm font-medium text-gray-700 hover:text-gray-900 transition-colors duration-200"
              >
                Pricing
              </Link>
              <Link 
                to="/blog" 
                className="text-sm font-medium text-gray-700 hover:text-gray-900 transition-colors duration-200"
              >
                Blog
              </Link>
            </div>

            {/* Search Bar - Updated with modern styling */}
            <div className="hidden md:flex flex-1 max-w-xl mx-8">
              <div className="relative w-full">
                <input
                  type="text"
                  placeholder="Quick search..."
                  className="w-full py-2 px-4 pl-10 border border-gray-200 rounded-xl
                            text-sm bg-gray-50 placeholder-gray-500
                            focus:outline-none focus:ring-2 focus:ring-orange-500/20 focus:border-orange-500
                            transition-all duration-200"
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

            {/* User Profile Section - Updated with modern styling */}
            <div className="hidden md:flex items-center space-x-5">
              <Link to={'/'}>
                <button className="px-4 py-2 rounded-lg bg-orange-500 text-white text-sm font-medium
                                 shadow-sm hover:bg-orange-600 active:bg-orange-700
                                 transition-all duration-200 
                                 focus:outline-none focus:ring-2 focus:ring-orange-500/20">
                  Add Post
                </button>
              </Link>
              <div className="relative">
                <div
                  className="flex items-center cursor-pointer hover:bg-gray-50 rounded-lg px-3 py-2 transition-colors duration-200"
                  onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                >
                  <span className="text-sm font-medium text-gray-900">Gjergj Kadriu</span>
                  <span className="text-sm text-gray-500 ml-2">@gjergj71</span>
                  <img
                    className="h-8 w-8 rounded-full ml-3 ring-2 ring-white"
                    src="/dist/static/icons8-test-account-80.png"
                    alt="Profile"
                  />
                </div>

                {/* Dropdown Menu - Updated styling */}
                {isDropdownOpen && (
                  <div className="absolute right-0 mt-2 w-48 bg-white rounded-xl shadow-lg py-1 z-10
                                border border-gray-100 ring-1 ring-black ring-opacity-5">
                    <a
                      href="#"
                      className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-50"
                    >
                      Profile
                    </a>
                    <a
                      href="/auth/logout"
                      className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-50"
                    >
                      Logout
                    </a>
                  </div>
                )}
              </div>
            </div>

            {/* Mobile menu button - Updated with animation */}
            <div className="md:hidden">
              <button 
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className="p-2 rounded-md text-gray-400 hover:text-gray-500
                           focus:outline-none focus:ring-2 focus:ring-orange-200"
              >
                <svg
                  className={`h-6 w-6 transition-transform duration-200 
                             ${isMobileMenuOpen ? 'transform rotate-180' : ''}`}
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

          {/* Mobile Menu - New Addition */}
          <div className={`md:hidden ${isMobileMenuOpen ? 'block' : 'hidden'}`}>
            <div className="px-2 pt-2 pb-3 space-y-1 mt-4">
              <Link 
                to="/features" 
                className="block px-3 py-2 rounded-md text-base font-medium 
                         text-gray-700 hover:text-orange-500 hover:bg-gray-50
                         transition-colors duration-200"
              >
                Features
              </Link>
              <Link 
                to="/pricing" 
                className="block px-3 py-2 rounded-md text-base font-medium 
                         text-gray-700 hover:text-orange-500 hover:bg-gray-50
                         transition-colors duration-200"
              >
                Pricing
              </Link>
              <Link 
                to="/blog" 
                className="block px-3 py-2 rounded-md text-base font-medium 
                         text-gray-700 hover:text-orange-500 hover:bg-gray-50
                         transition-colors duration-200"
              >
                Blog
              </Link>
              
              {/* Mobile Search */}
              <div className="px-3 py-2">
                <input
                  type="text"
                  placeholder="Quick search..."
                  className="w-full py-2 px-4 pl-10 bg-gray-50 rounded-lg 
                           focus:outline-none focus:ring-2 focus:ring-orange-200
                           transition-all duration-200"
                />
              </div>

              {/* Mobile Profile Section */}
              <div className="px-3 py-2 flex items-center space-x-3">
                <img
                  className="h-8 w-8 rounded-full"
                  src="/dist/static/icons8-test-account-80.png"
                  alt="Profile"
                />
                <div className="flex flex-col">
                  <span className="text-gray-700 font-medium">Gjergj Kadriu</span>
                  <span className="text-gray-400 text-sm">@gjergj71</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </nav>
    </div>
  );
};
