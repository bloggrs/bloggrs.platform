import React from 'react';

interface SpinnerProps {
  size?: 'small' | 'medium' | 'large';
}

export const Spinner: React.FC<SpinnerProps> = ({ size = 'medium' }) => {
  const sizeClass = {
    small: 'w-4 h-4',
    medium: 'w-8 h-8',
    large: 'w-12 h-12'
  }[size];

  return (
    <div className="flex justify-center items-center">
      <div className={`${sizeClass} animate-spin rounded-full border-4 border-gray-200 border-t-blue-600`} />
    </div>
  );
}; 