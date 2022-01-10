import * as React from 'react';

export const NotAuthenticatedHeader = () => {
  return (
    <>
      <nav className="max-h-96 py-5">
        <div className="mx-10 px-2 sm:px-6 lg:px-8">
          <div className="relative flex items-center justify-between h-16">
            <div className="absolute inset-y-0 left-0 flex items-center sm:hidden">
              {/* Mobile menu button*/}
              <button
                type="button"
                className="
            inline-flex
            items-center
            justify-center
            p-2
            rounded-md
            text-slate-400
            hover:text-white hover:bg-slate-700
            focus:outline-none
            focus:ring-2
            focus:ring-inset
            focus:ring-white
          "
                aria-controls="mobile-menu"
                aria-expanded="false"
              >
                <span className="sr-only">Open main menu</span>
                {/*
          Icon when menu is closed.

          Heroicon name: outline/menu

          Menu open: "hidden", Menu closed: "block"
        */}
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
                {/*
          Icon when menu is open.

          Heroicon name: outline/x

          Menu open: "block", Menu closed: "hidden"
        */}
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
            <div className="flex-1 flex items-center justify-center sm:justify-start">
              <div className="flex-shrink-0 flex items-center">
                <img
                  className="block lg:hidden h-8 w-auto"
                  src="http://localhost:3001/dist/static/image1.png"
                  alt="Workflow"
                />
                <img
                  className="hidden lg:block h-32 w-auto"
                  src="http://localhost:3001/dist/static/image1.png"
                  alt="Workflow"
                />
              </div>
              <div className="hidden sm:block sm:ml-6">
                <div className="flex space-x-4">
                  {/* Current: "bg-slate-900 text-white", Default: "text-slate-300 hover:bg-slate-700 hover:text-white" */}
                  <a
                    href="#"
                    className="
                text-slate-600
                hover:text-slate-900
                px-3
                py-2
                rounded-md
                text-base
                font-medium
              "
                  >
                    Features
                  </a>
                  <a
                    href="#"
                    className="
                text-slate-600
                hover:text-slate-900
                px-3
                py-2
                rounded-md
                text-base
                font-medium
              "
                  >
                    Pricing
                  </a>
                  <a
                    href="#"
                    className="
                text-slate-600
                hover:text-slate-900
                px-3
                py-2
                rounded-md
                text-base
                font-medium
              "
                  >
                    Blog
                  </a>
                </div>
              </div>
            </div>
            <a href="/src/register">
              <button className="btn btn-slate w-40 h-12 rounded-sm">
                Sign Up
              </button>
            </a>
          </div>
        </div>
        {/* Mobile menu, show/hide based on menu state. */}
        <div className="sm:hidden" id="mobile-menu">
          <div className="px-2 pt-2 pb-3 space-y-1">
            {/* Current: "bg-slate-900 text-white", Default: "text-slate-300  hover:text-slate-900" */}
            <a
              href="#"
              className="
          bg-slate-900
          text-white
          block
          px-3
          py-2
          rounded-md
          text-base
          font-medium
        "
              aria-current="page"
            >
              Dashboard
            </a>
            <a
              href="#"
              className="
          text-slate-300
          hover:text-slate-900
          block
          px-3
          py-2
          rounded-md
          text-base
          font-medium
        "
            >
              Features
            </a>
            <a
              href="#"
              className="
          text-slate-300
          hover:text-slate-900
          block
          px-3
          py-2
          rounded-md
          text-base
          font-medium
        "
            >
              Pricing
            </a>
            <a
              href="#"
              className="
          text-slate-300
          hover:text-slate-900
          block
          px-3
          py-2
          rounded-md
          text-base
          font-medium
        "
            >
              Blog
            </a>
          </div>
        </div>
      </nav>
    </>
  );
};
