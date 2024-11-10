import * as React from 'react';

export const ChooseBlogFeatures = () => {
  return (
    <div className="min-h-screen flex bg-gray-50" style={{ marginTop: '3%' }}>
      {/* Sidebar */}
      <div className="w-16 bg-[#1a365d] flex flex-col items-center py-4 space-y-6">
        {/* You can add sidebar icons here if needed */}
      </div>

      {/* Main Content */}
      <div className="flex-1 p-8">
        <div className="max-w-5xl mx-auto">
          <div className="flex items-center justify-between mb-8">
            <div className="flex items-center space-x-4">
              <h1 className="text-2xl font-semibold text-gray-800">
                Let's bring your ideas to life
              </h1>
            </div>
          </div>

          {/* Add your features content here */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            {/* Your feature selection content will go here */}
          </div>
        </div>
      </div>
    </div>
  );
};
