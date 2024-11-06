import React from 'react';
import { MainPanel } from '../../../components/MainPanel';
import { Check } from 'lucide-react';

export const SuccessInformational = ({ parentData }: any) => {
  return (
    <MainPanel
      sidebarProps={{ collapse: true }}
      className="container max-h-full max-w-7xl py-6 md:py-9 px-4 md:px-12" style={{marginTop: "4%"}}
    >
      <div className="flex flex-col items-center">
        <div className="mb-6 rounded-full bg-green-100 p-3">
          <Check className="h-8 w-8 text-green-600" />
        </div>

        <h1 className="text-center font-semibold text-3xl md:text-4xl text-gray-900 mb-4">
          DataAddict's Blog is all set up!
        </h1>
        
        <p className="text-center text-gray-600 mb-8 max-w-2xl">
          Your blog is ready to go. You can now start managing your content and customizing your blog's appearance.
        </p>

        <div className="w-full max-w-2xl px-4">
          <div className="bg-white rounded-2xl shadow-lg overflow-hidden mb-8">
            <img
              src="/dist/static/hugo-chatbot-1.png"
              className="w-full h-auto"
              alt="Blog setup complete"
            />
          </div>

          <div className="flex justify-center">
            <button
              onClick={() =>
                (window.location.href =
                  window.location.origin +
                  `/blogs/${parentData['/setup-status'].id}`)
              }
              className="inline-flex items-center px-8 py-3 border border-transparent text-base font-medium rounded-full text-white bg-[#1a365d] hover:bg-[#2d4a7c] transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#1a365d] shadow-sm hover:shadow-md"
            >
              Manage Blog
            </button>
          </div>
        </div>
      </div>
    </MainPanel>
  );
};
