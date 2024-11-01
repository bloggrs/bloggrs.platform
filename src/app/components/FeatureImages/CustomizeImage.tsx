import React from 'react';

export const CustomizeImage = () => {
  return (
    <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-2xl">
      <div className="grid grid-cols-2 gap-4">
        <div className="col-span-2">
          <h2 className="text-2xl text-slate-700 mb-4">What do you want to add to your blog?</h2>
          <p className="text-sm text-slate-500">Recommended for You</p>
        </div>
        
        {/* Feature Cards */}
        <div className="border rounded-lg p-4">
          <div className="bg-blue-100 text-xs px-2 py-1 rounded w-fit mb-2">Built-in</div>
          <h3 className="font-medium mb-2">Blog</h3>
          <p className="text-sm text-slate-600">Write posts to share stories and share your ideas.</p>
        </div>

        <div className="border rounded-lg p-4">
          <div className="bg-blue-100 text-xs px-2 py-1 rounded w-fit mb-2">Recommended</div>
          <h3 className="font-medium mb-2">Comments</h3>
          <p className="text-sm text-slate-600">Allow visitors to comment on your blog posts.</p>
        </div>

        <div className="border rounded-lg p-4">
          <div className="bg-blue-100 text-xs px-2 py-1 rounded w-fit mb-2">Selected</div>
          <h3 className="font-medium mb-2">Categories and tags</h3>
          <p className="text-sm text-slate-600">Organize content for easier navigation.</p>
        </div>

        <div className="border rounded-lg p-4">
          <div className="bg-blue-100 text-xs px-2 py-1 rounded w-fit mb-2">Selected</div>
          <h3 className="font-medium mb-2">Author Bio</h3>
          <p className="text-sm text-slate-600">Share information about the content creators.</p>
        </div>
      </div>
    </div>
  );
}; 