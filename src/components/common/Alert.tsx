import React from 'react';

interface AlertProps {
  type: 'error' | 'success' | 'warning' | 'info';
  message: string;
}

export const Alert: React.FC<AlertProps> = ({ type, message }) => {
  const alertStyles = {
    error: 'bg-red-100 border-red-400 text-red-700',
    success: 'bg-green-100 border-green-400 text-green-700',
    warning: 'bg-yellow-100 border-yellow-400 text-yellow-700',
    info: 'bg-blue-100 border-blue-400 text-blue-700',
  }[type];

  return (
    <div
      className={`border px-4 py-3 rounded relative ${alertStyles}`}
      role="alert"
    >
      <span className="block sm:inline">{message}</span>
    </div>
  );
};
