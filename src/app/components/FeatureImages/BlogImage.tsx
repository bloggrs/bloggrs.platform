import React from 'react';

export const BlogImage = () => {
  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200 w-full max-w-2xl">
      <header className="border-b border-gray-100 p-4 flex justify-between items-center">
        <div className="flex items-center space-x-4">
          <div className="w-8 h-8 bg-[#1a365d] rounded-full"></div>
          <h1 className="font-semibold text-gray-800">DataAddict's Blog</h1>
        </div>
        <nav>
          <ul className="flex space-x-6">
            <li className="text-gray-500 hover:text-gray-700 transition-colors">
              Home
            </li>
            <li className="text-gray-500 hover:text-gray-700 transition-colors">
              About Me
            </li>
            <li className="text-gray-500 hover:text-gray-700 transition-colors">
              Contact
            </li>
          </ul>
        </nav>
      </header>

      <main className="p-8">
        <article className="max-w-2xl mx-auto">
          <h2 className="text-2xl font-semibold text-gray-800 mb-2">
            Lorem Ipsum Title
          </h2>
          <div className="text-sm text-gray-500 mb-6">
            Wednesday, December 22, 2021 • John Cena
          </div>

          <div className="prose text-gray-600">
            <p className="mb-4">
              Lorem ipsum is simply dummy text of the printing and typesetting
              industry. Lorem Ipsum has been the industry's standard dummy text
              ever since the 1500s, when an unknown printer took a galley of
              type and scrambled it to make a type specimen book.
            </p>

            <p>
              Five centuries, but also the leap into electronic typesetting,
              remaining essentially unchanged. It was popularised in the 1960s
              with the release of Letraset sheets containing Lorem Ipsum
              passages.
            </p>
          </div>

          <div className="flex items-center space-x-4 mt-6">
            <button className="flex items-center space-x-2 text-[#f4a261] hover:text-[#e76f51] transition-colors">
              <span>♥</span>
              <span>Like this</span>
            </button>
            <button className="flex items-center space-x-2 text-[#f4a261] hover:text-[#e76f51] transition-colors">
              <span>💬</span>
              <span>3 comments</span>
            </button>
          </div>
        </article>

        <div className="max-w-2xl mx-auto mt-8">
          <h3 className="font-semibold text-gray-800 mb-4">Comments (3)</h3>
          <div className="bg-gray-50 rounded-lg border border-gray-200 p-4">
            <input
              type="text"
              placeholder="Type your comment here"
              className="w-full bg-transparent border-none outline-none focus:ring-2 focus:ring-[#1a365d] placeholder-gray-400"
            />
          </div>
        </div>
      </main>
    </div>
  );
};
