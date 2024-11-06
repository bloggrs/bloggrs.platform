import React from 'react';

export const LineLoader = () => {
  return (
    <div className="flex justify-center items-center py-4">
      <div className="w-full h-1 max-w-md bg-gray-100 rounded-full overflow-hidden">
        <div className="h-full bg-[#1a365d] animate-line-loading rounded-full"></div>
      </div>
    </div>
  );
};
