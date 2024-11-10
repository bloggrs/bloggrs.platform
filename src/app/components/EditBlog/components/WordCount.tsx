import React from 'react';

interface WordCountProps {
  content: string;
}

// Common color classes to use
const colors = {
  primary: 'bg-indigo-600 hover:bg-indigo-700',
  secondary: 'bg-gray-100 hover:bg-gray-200',
  text: {
    primary: 'text-gray-900',
    secondary: 'text-gray-600',
  },
  status: {
    success: 'bg-green-100 text-green-800',
    warning: 'bg-yellow-100 text-yellow-800',
    error: 'bg-red-100 text-red-800',
    info: 'bg-indigo-100 text-indigo-800',
  },
};

export const WordCount: React.FC<WordCountProps> = ({ content }) => {
  const wordCount = content?.split(/\s+/).filter(Boolean).length || 0;

  return (
    <div className="inline-flex items-center px-2.5 py-1.5 rounded-md bg-gray-50 border border-gray-200">
      <span className="text-sm font-medium text-gray-900">{wordCount}</span>
      <span className="ml-1 text-sm text-gray-500">words</span>
    </div>
  );
};
