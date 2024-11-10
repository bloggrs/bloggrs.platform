import React from 'react';
import { Cog6ToothIcon } from '@heroicons/react/24/outline';

export const SettingsButton: React.FC = () => {
  return (
    <button
      className="inline-flex items-center px-4 py-2 bg-[#f4a261] hover:bg-[#e76f51] text-white rounded-lg transition-colors"
      onClick={() => {
        // Add settings modal/drawer trigger logic here
      }}
    >
      <Cog6ToothIcon className="h-5 w-5 mr-2" />
      Settings
    </button>
  );
};
