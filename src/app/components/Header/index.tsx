import React, { useState } from 'react';
import { Link } from 'react-router-dom';

export const Header = () => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const blog_id = window.location.pathname.split('/')[2];
  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Searching for:', searchQuery);
  };

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

            {/* Updated Search Bar with form submission */}
            <div className="hidden md:flex flex-1 max-w-xl mx-8">
              <form onSubmit={handleSearch} className="relative w-full">
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
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
                {searchQuery && (
                  <button
                    type="button"
                    onClick={() => setSearchQuery('')}
                    className="absolute right-3 top-2.5 text-gray-400 hover:text-gray-600"
                  >
                    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </button>
                )}
              </form>
            </div>

            {/* Updated User Profile Section */}
            <div className="hidden md:flex items-center space-x-5">
              <Link 
                to={`/blogs/${blog_id}/posts/create`}
                className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-orange-600 hover:bg-orange-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-orange-500 transition-colors duration-200"
              >
                <svg className="w-5 h-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                </svg>
                Create Post
              </Link>

              {/* Updated Dropdown Menu */}
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

                {isDropdownOpen && (
                  <div className="absolute right-0 mt-2 w-48 bg-white rounded-xl shadow-lg py-1 z-10
                                border border-gray-100 ring-1 ring-black ring-opacity-5">
                    <div className="px-4 py-2 border-b border-gray-100">
                      <p className="text-sm font-medium text-gray-900">Signed in as</p>
                      <p className="text-sm text-gray-500">@gjergj71</p>
                    </div>
                    <a href="#" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-50">
                      Profile
                    </a>
                    <a href="#" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-50">
                      Dashboard
                    </a>
                    <a href="#" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-50">
                      Settings
                    </a>
                    <div className="border-t border-gray-100">
                      <a href="/auth/logout" 
                        className="block px-4 py-2 text-sm text-red-600 hover:bg-red-50">
                        Logout
                      </a>
                    </div>
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

          {/* Updated Mobile Menu */}
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
              
              {/* Added Mobile Notifications */}
              <Link 
                to={`/blogs/${blog_id}/posts/create`}
                className="block px-3 py-2 rounded-md text-base font-medium text-white bg-orange-600 hover:bg-orange-700 transition-colors duration-200"
              >
                Create Post
              </Link>
              
              {/* Added Mobile Quick Actions */}
              <div className="px-3 py-2 border-t border-gray-100">
                <button className="w-full text-left px-3 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50">
                  Dashboard
                </button>
                <button className="w-full text-left px-3 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50">
                  Settings
                </button>
                <button className="w-full text-left px-3 py-2 text-sm font-medium text-red-600 hover:bg-red-50">
                  Logout
                </button>
              </div>
            </div>
          </div>
        </div>
      </nav>
    </div>
  );
};
