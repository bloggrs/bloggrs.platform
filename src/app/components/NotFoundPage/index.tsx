import * as React from 'react';
import { Helmet } from 'react-helmet-async';

export function NotFoundPage() {
  return (
    <>
      <Helmet
        defaultTitle="404 Page Not Found"
        meta={[
          {
            name: 'description',
            content: 'Page not found',
          },
        ]}
      />
      <div className="min-h-[calc(100vh-80px)] flex flex-col items-center justify-center p-4 bg-gray-50">
        <div className="text-[#1a365d] text-[clamp(2.5rem,8vw,4rem)] font-bold mb-4">
          4
          <span className="text-[0.9em]" role="img" aria-label="Crying Face">
            😥
          </span>
          4
        </div>
        <p className="text-gray-600 mb-6">The page you're looking for doesn't exist.</p>
        <button 
          onClick={() => window.history.back()}
          className="px-8 py-3 bg-[#1a365d] text-white rounded-lg font-medium transition-colors hover:bg-[#142c4b] md:px-6 md:py-2"
        >
          Go Back
        </button>
      </div>
    </>
  );
}
