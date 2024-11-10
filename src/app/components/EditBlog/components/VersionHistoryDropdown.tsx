import React, { useState, useRef, useEffect } from 'react';
import { ClockIcon } from '@heroicons/react/24/outline';

interface Version {
  id: string;
  timestamp: Date;
  author: string;
  changes: string;
}

export const VersionHistoryDropdown: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const [versions] = useState<Version[]>([
    {
      id: '1',
      timestamp: new Date(),
      author: 'Current Version',
      changes: 'Latest changes',
    },
  ]);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <div className="relative" ref={dropdownRef}>
      <button
        className="flex items-center px-4 py-2 text-gray-500 hover:text-gray-700 hover:bg-gray-50 rounded-lg transition-colors"
        onClick={() => setIsOpen(!isOpen)}
      >
        <ClockIcon className="h-5 w-5 mr-2" />
        Version History
      </button>

      {isOpen && (
        <div className="absolute right-0 mt-2 w-64 bg-white rounded-xl shadow-sm border border-gray-200">
          {versions.map(version => (
            <button
              key={version.id}
              className="w-full text-left px-4 py-3 text-sm hover:bg-gray-50 transition-colors first:rounded-t-xl last:rounded-b-xl"
              onClick={() => console.log(`Restore version ${version.id}`)}
            >
              <div className="flex items-center">
                <span className="text-gray-400 mr-2">#{version.id}</span>
                <span className="font-medium text-gray-900">
                  {version.author}
                </span>
              </div>
              <div className="text-gray-500 text-xs mt-1">
                {version.timestamp.toLocaleString()}
              </div>
            </button>
          ))}
        </div>
      )}
    </div>
  );
};
