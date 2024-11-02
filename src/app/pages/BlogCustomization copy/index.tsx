import * as React from 'react';
import { Helmet } from 'react-helmet-async';
import { MainPanel } from '../../components/MainPanel';

export const BlogCustomization = () => {
  return (
    <>
      <Helmet
        defaultTitle="Blog Customize"
        titleTemplate="Blog Customize"
      />
      <MainPanel
        className="container-custom max-h-full max-w-7xl  border-2 border-dashed border-slate-700 my-16 h-screen"
        style={{ height: '100%' }}
        id="b-container"
      >
        <nav className="bg-white shadow-md max-h-96 py-5">
          <div className="mx-32 px-2 sm:px-6 lg:px-8">
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
                <div className="w-9/12 flex-shrink-0 flex items-center">
                  <img
                    className="block w-40 lg:hidden h-8 w-auto h-auto"
                    src="/dist/static/logo-placeholder-image.png"
                    alt="Workflow"
                  />
                  <img
                    className="hidden absolute lg:block h-32 w-auto h-auto"
                    style={{ width: '12rem' }}
                    src="/dist/static/logo-placeholder-image.png"
                    alt="Workflow"
                  />
                  <h1 className="text-xl lg:px-52 md:px-22 font-bold text-slate-700">
                    DataAddict's Blog
                  </h1>
                </div>
                <div className="w-3/12 hidden sm:block sm:ml-6">
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
                      Home
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
                      About Me
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
                      Contact
                    </a>
                  </div>
                </div>
              </div>
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
        <div
          id="b-container__middle"
          // style={{ maxSheight: '80vh', mindaHeights: '80vh' }}
          className=" h-80vh grid gap-8 space-x-1 lg:grid-cols-8 my-5 col-offset-1"
        >
          <div className="first:col-start-2 col-span-4 bg-transparent border-gray-400 rounded">
            <div className="h-full grid grid-rows-3 grid-flow-col col-span-2 gap-4">
              <div className="border-b-2 border-b-slate-300 col-span-3 h-full flex">
                <div className="bg-white shadow-md h-3/4 w-1/2 rounded-md" />
                <div className="px-3 h-3/4 w-3/4">
                  <h1 className="text-slate-700 font-medium text-xl">
                    Lorem Ipsum Title
                  </h1>
                  <p className="py-2 text-slate-400 font-normal text-sm">
                    Lorem Ipsum is simply dummy text of the printing and
                    typesetting industry. Lorem Ipsum has been the industry's
                    standard dummy text ever since the 1500s, when an unknown
                    printer
                  </p>
                  <div className="flex">
                    <p className="ml-24text-slate-700 font-normal text-sm">
                      Wednesday, December 22, 2021 &nbsp;&nbsp;&nbsp; |
                    </p>
                    <p className="mx-4 text-slate-700 font-normal text-sm">
                      John Cena
                    </p>
                  </div>
                  <div className="flex  my-2 w-full">
                    <p className="w-1/2 text-blue-300 font-medium text-sm flex ">
                      <img src="/dist/static/icons8-heart-80.png" />
                      <span className="mx-2 text-center my-2">153 likes</span>
                    </p>
                    <p className="w-1/2 right-0 text-blue-400 font-normal text-sm flex items-center justify-center">
                      <img src="/dist/static/icons8-comments-80.png" />
                      <span className="mx-2">3 comments</span>
                    </p>
                  </div>
                </div>
              </div>
              <div className="border-b-2 my-4 border-b-slate-300 col-span-3 h-full flex">
                <div className="bg-white shadow-md h-3/4 w-1/2 rounded-md" />
                <div className="px-3 h-3/4 w-3/4">
                  <h1 className="text-slate-700 font-medium text-xl">
                    Lorem Ipsum Title
                  </h1>
                  <p className="py-2 text-slate-400 font-normal text-sm">
                    Lorem Ipsum is simply dummy text of the printing and
                    typesetting industry. Lorem Ipsum has been the industry's
                    standard dummy text ever since the 1500s, when an unknown
                    printer
                  </p>
                  <div className="flex">
                    <p className="ml-24text-slate-700 font-normal text-sm">
                      Wednesday, December 22, 2021 &nbsp;&nbsp;&nbsp; |
                    </p>
                    <p className="mx-4 text-slate-700 font-normal text-sm">
                      John Cena
                    </p>
                  </div>
                  <div className="flex  my-2 w-full">
                    <p className="w-1/2 text-blue-400 font-medium text-sm flex ">
                      <img src="/dist/static/icons8-love-80.png" />
                      <span className="mx-2 text-center my-2">153 likes</span>
                    </p>
                    <p className="w-1/2 right-0 text-blue-400 font-normal text-sm flex items-center justify-center">
                      <img src="/dist/static/icons8-comments-80.png" />
                      <span className="mx-2">3 comments</span>
                    </p>
                  </div>
                </div>
              </div>
              <div className=" col-span-3 my-8 h-full flex">
                <div className="bg-white shadow-md h-3/4 w-1/2 rounded-md" />
                <div className="px-3 h-3/4 w-3/4">
                  <h1 className="text-slate-700 font-medium text-xl">
                    Lorem Ipsum Title
                  </h1>
                  <p className="py-2 text-slate-400 font-normal text-sm">
                    Lorem Ipsum is simply dummy text of the printing and
                    typesetting industry. Lorem Ipsum has been the industry's
                    standard dummy text ever since the 1500s, when an unknown
                    printer
                  </p>
                  <div className="flex">
                    <p className=" text-slate-700 font-normal text-sm">
                      Wednesday, December 22, 2021 &nbsp;&nbsp;&nbsp; |
                    </p>
                    <p className="mx-4 text-slate-700 font-normal text-sm">
                      John Cena
                    </p>
                  </div>
                  <div className="flex  my-2 w-full">
                    <p className="w-1/2 text-blue-300 font-medium text-sm flex ">
                      <img src="/dist/static/icons8-heart-80.png" />
                      <span className="mx-2 text-center my-2">153 likes</span>
                    </p>
                    <p className="w-1/2 right-0 text-blue-400 font-normal text-sm flex items-center justify-center">
                      <img src="/dist/static/icons8-comments-80.png" />
                      <span className="mx-2">3 comments</span>
                    </p>
                  </div>
                </div>
              </div>
            </div>
            {/* <h3 class="text-2xl text-center text-gray-800">10</h3>
                    <p class="text-center text-gray-500">view</p> */}
          </div>
          <div className="first:col-start-2 col-span-2 bg-transparent border-gray-400 rounded flex  items-center">
            <div className="mb-14 bg-white shadow-md max-h-1/2 w-3/4 rounded-md justify-center">
              <div className=" mx-6">
                <h1 className="py-3 mb-4 text-slate-700 font-medium text-xl">
                  Categories
                </h1>
                <ul className="py-4 mx-5 list-disc space-y-3">
                  <li>Food (5)</li>
                  <li>Fashion (252)</li>
                  <li>T-Shirts (159)</li>
                  <li>New Trends (9)</li>
                  <li>Woman's Fashion (45)</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </MainPanel>
    </>
  );
};
