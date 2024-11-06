import React from 'react';

export const HeaderWidget = () => (
  <nav className="bg-white shadow-sm border-b border-gray-200">
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="relative flex items-center justify-between h-16">
        <div className="absolute inset-y-0 left-0 flex items-center sm:hidden">
          <button
            type="button"
            className="inline-flex items-center justify-center p-2 rounded-lg text-gray-400 hover:text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-[#1a365d]"
            aria-controls="mobile-menu"
            aria-expanded="false"
          >
            <span className="sr-only">Open main menu</span>
            <svg
              className="block h-6 w-6"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              aria-hidden="true"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4 6h16M4 12h16M4 18h16"
              />
            </svg>
            <svg
              className="hidden h-6 w-6"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              aria-hidden="true"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
        </div>
        <div className="flex-1 flex items-center justify-between">
          <div className="flex-shrink-0 flex items-center">
            <img
              className="block h-8 w-auto lg:hidden"
              src="/dist/static/logo-placeholder-image.png"
              alt="Logo"
            />
            <img
              className="hidden lg:block h-8 w-auto"
              src="/dist/static/logo-placeholder-image.png"
              alt="Logo"
            />
            <h1 className="ml-4 text-xl font-semibold text-gray-900">
              DataAddict's Blog
            </h1>
          </div>
          <div className="hidden sm:ml-6 sm:flex sm:space-x-8">
            <a
              href="#"
              className="border-transparent text-gray-500 hover:border-[#1a365d] hover:text-gray-700 inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium"
            >
              Home
            </a>
            <a
              href="#"
              className="border-transparent text-gray-500 hover:border-[#1a365d] hover:text-gray-700 inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium"
            >
              About Me
            </a>
            <a
              href="#"
              className="border-transparent text-gray-500 hover:border-[#1a365d] hover:text-gray-700 inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium"
            >
              Contact
            </a>
          </div>
        </div>
      </div>
    </div>
    <div className="sm:hidden" id="mobile-menu">
      <div className="pt-2 pb-3 space-y-1">
        <a
          href="#"
          className="bg-gray-50 border-[#1a365d] text-gray-900 block pl-3 pr-4 py-2 border-l-4 text-base font-medium"
        >
          Home
        </a>
        <a
          href="#"
          className="border-transparent text-gray-500 hover:bg-gray-50 hover:border-gray-300 hover:text-gray-700 block pl-3 pr-4 py-2 border-l-4 text-base font-medium"
        >
          About Me
        </a>
        <a
          href="#"
          className="border-transparent text-gray-500 hover:bg-gray-50 hover:border-gray-300 hover:text-gray-700 block pl-3 pr-4 py-2 border-l-4 text-base font-medium"
        >
          Contact
        </a>
      </div>
    </div>
  </nav>
);
