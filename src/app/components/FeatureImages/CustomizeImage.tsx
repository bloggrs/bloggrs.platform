import React from 'react';

export const CustomizeImage = () => {
  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-8 w-full max-w-2xl">
      <div className="space-y-6">
        {/* Header */}
        <div className="space-y-1">
          <h2 className="text-2xl font-semibold text-gray-800">
            What do you want to add to your blog?
          </h2>
          <p className="text-sm text-gray-500">Recommended for You</p>
        </div>

        {/* Feature Cards Grid */}
        <div className="grid grid-cols-2 gap-4">
          {/* Feature Cards */}
          <div className="border border-gray-200 rounded-lg p-4 hover:bg-gray-50 transition-colors">
            <div className="bg-[#1a365d]/10 text-[#1a365d] text-xs px-2 py-1 rounded-md w-fit mb-2">
              Built-in
            </div>
            <h3 className="font-medium text-gray-900 mb-2">Blog</h3>
            <p className="text-sm text-gray-500">
              Write posts to share stories and share your ideas.
            </p>
          </div>

          <div className="border border-gray-200 rounded-lg p-4 hover:bg-gray-50 transition-colors">
            <div className="bg-[#f4a261]/10 text-[#f4a261] text-xs px-2 py-1 rounded-md w-fit mb-2">
              Recommended
            </div>
            <h3 className="font-medium text-gray-900 mb-2">Comments</h3>
            <p className="text-sm text-gray-500">
              Allow visitors to comment on your blog posts.
            </p>
          </div>

          <div className="border border-gray-200 rounded-lg p-4 hover:bg-gray-50 transition-colors">
            <div className="bg-[#1a365d]/10 text-[#1a365d] text-xs px-2 py-1 rounded-md w-fit mb-2">
              Selected
            </div>
            <h3 className="font-medium text-gray-900 mb-2">
              Categories and tags
            </h3>
            <p className="text-sm text-gray-500">
              Organize content for easier navigation.
            </p>
          </div>

          <div className="border border-gray-200 rounded-lg p-4 hover:bg-gray-50 transition-colors">
            <div className="bg-[#1a365d]/10 text-[#1a365d] text-xs px-2 py-1 rounded-md w-fit mb-2">
              Selected
            </div>
            <h3 className="font-medium text-gray-900 mb-2">Author Bio</h3>
            <p className="text-sm text-gray-500">
              Share information about the content creators.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
