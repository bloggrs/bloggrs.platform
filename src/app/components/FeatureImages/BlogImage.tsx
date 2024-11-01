import React from 'react';

export const BlogImage = () => {
  return (
    <div className="bg-white rounded-lg shadow-lg w-full max-w-2xl">
      <header className="border-b p-4 flex justify-between items-center">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 bg-slate-200 rounded-full"></div>
          <h1 className="font-medium">DataAddict's Blog</h1>
        </div>
        <nav>
          <ul className="flex gap-4">
            <li>Home</li>
            <li>About Me</li>
            <li>Contact</li>
          </ul>
        </nav>
      </header>

      <main className="p-8">
        <article className="max-w-2xl mx-auto">
          <h2 className="text-2xl font-bold mb-2">Lorem Ipsum Title</h2>
          <div className="text-sm text-slate-500 mb-4">
            Wednesday, December 22, 2021 • John Cena
          </div>
          
          <div className="prose">
            <p className="mb-4">
              Lorem ipsum is simply dummy text of the printing and typesetting industry. 
              Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, 
              when an unknown printer took a galley of type and scrambled it to make a type 
              specimen book.
            </p>
            
            <p>
              Five centuries, but also the leap into electronic typesetting, remaining essentially 
              unchanged. It was popularised in the 1960s with the release of Letraset sheets 
              containing Lorem Ipsum passages.
            </p>
          </div>

          <div className="flex items-center gap-4 mt-6">
            <button className="flex items-center gap-2 text-blue-500">
              <span>♥</span> Like this
            </button>
            <button className="flex items-center gap-2 text-blue-500">
              <span>💬</span> 3 comments
            </button>
          </div>
        </article>

        <div className="max-w-2xl mx-auto mt-8">
          <h3 className="font-medium mb-4">Comments (3)</h3>
          <div className="bg-blue-50 p-4 rounded-lg mb-4">
            <input 
              type="text" 
              placeholder="Type your comment here"
              className="w-full bg-transparent border-none outline-none"
            />
          </div>
        </div>
      </main>
    </div>
  );
}; 