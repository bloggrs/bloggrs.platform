import React from 'react';

export const DashboardImage = () => {
  return (
    <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-2xl">
      <div className="flex gap-8">
        {/* Sidebar */}
        <div className="bg-blue-900 text-white p-4 rounded-lg w-48">
          <ul className="space-y-4">
            <li className="flex items-center gap-2">
              <div className="w-4 h-4 bg-white rounded-full"></div>
              Dashboard
            </li>
            <li className="flex items-center gap-2">
              <div className="w-4 h-4 bg-white rounded-full"></div>
              Posts
            </li>
            <li className="flex items-center gap-2">
              <div className="w-4 h-4 bg-white rounded-full"></div>
              Comments
            </li>
            <li className="flex items-center gap-2">
              <div className="w-4 h-4 bg-white rounded-full"></div>
              Team members
            </li>
            <li className="flex items-center gap-2">
              <div className="w-4 h-4 bg-white rounded-full"></div>
              Settings
            </li>
          </ul>
        </div>

        {/* Main Content */}
        <div className="flex-1">
          <div className="mb-6">
            <h2 className="text-xl font-medium mb-2">DataAddict's Blog</h2>
            <div className="flex gap-2">
              <button className="bg-blue-100 text-blue-800 px-3 py-1 rounded text-sm">
                Change plan
              </button>
              <button className="bg-blue-100 text-blue-800 px-3 py-1 rounded text-sm">
                Change theme
              </button>
            </div>
          </div>

          <div className="border-t pt-4">
            <div className="flex justify-between items-center mb-4">
              <h3 className="font-medium">Posts</h3>
              <button className="bg-yellow-500 text-white px-3 py-1 rounded text-sm">
                New Post
              </button>
            </div>
            
            {/* Post List */}
            <div className="space-y-4">
              {[1, 2, 3].map(i => (
                <div key={i} className="flex gap-4 items-center border-b pb-4">
                  <div className="w-16 h-16 bg-slate-200 rounded"></div>
                  <div>
                    <h4 className="font-medium">Blog post title</h4>
                    <p className="text-sm text-slate-500">Published • Dec 22, 2021</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}; 