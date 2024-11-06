import React from 'react';

export const DashboardImage = () => {
  return (
    <div className="bg-gray-50 p-8 rounded-lg shadow-sm w-full max-w-5xl">
      <div className="flex gap-8">
        {/* Sidebar */}
        <div className="w-16 bg-[#1a365d] rounded-lg flex flex-col items-center py-4 space-y-6">
          <div className="w-6 h-6 bg-gray-300 rounded-full"></div>
          <div className="w-6 h-6 bg-gray-300 rounded-full"></div>
          <div className="w-6 h-6 bg-gray-300 rounded-full"></div>
          <div className="w-6 h-6 bg-gray-300 rounded-full"></div>
          <div className="w-6 h-6 bg-gray-300 rounded-full"></div>
        </div>

        {/* Main Content */}
        <div className="flex-1">
          <div className="mb-8">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-semibold text-gray-800">DataAddict's Blog</h2>
              <div className="flex gap-3">
                <button className="px-4 py-2 bg-gray-100 text-gray-700 rounded-lg text-sm hover:bg-gray-200 transition-colors">
                  Change plan
                </button>
                <button className="px-4 py-2 bg-[#f4a261] hover:bg-[#e76f51] text-white rounded-lg text-sm transition-colors">
                  Change theme
                </button>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <div className="flex justify-between items-center mb-6">
              <h3 className="font-medium text-gray-800">Recent Posts</h3>
              <button className="px-4 py-2 bg-[#f4a261] hover:bg-[#e76f51] text-white rounded-lg text-sm transition-colors">
                New Post
              </button>
            </div>

            {/* Post List */}
            <div className="space-y-4">
              {[1, 2, 3].map(i => (
                <div key={i} className="flex gap-4 items-center border-b border-gray-100 pb-4 group hover:bg-gray-50 p-2 rounded-lg">
                  <div className="w-16 h-16 bg-gray-100 rounded-lg"></div>
                  <div>
                    <h4 className="font-medium text-gray-900">Blog post title</h4>
                    <p className="text-sm text-gray-500">
                      Published • Dec 22, 2021
                    </p>
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
