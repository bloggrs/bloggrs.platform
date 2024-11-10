import React from 'react';

type PublishState = 'draft' | 'scheduled' | 'published';

export const PublishStatus: React.FC = () => {
  const [status, setStatus] = React.useState<PublishState>('draft');

  const getStatusColor = () => {
    switch (status) {
      case 'published':
        return 'bg-green-50 text-green-700 ring-green-600/20';
      case 'scheduled':
        return 'bg-blue-50 text-blue-700 ring-blue-600/20';
      case 'draft':
        return 'bg-gray-50 text-gray-600 ring-gray-500/20';
    }
  };

  return (
    <div
      className={`inline-flex items-center rounded-md px-2 py-1 text-sm font-medium ring-1 ring-inset ${getStatusColor()}`}
    >
      {status.charAt(0).toUpperCase() + status.slice(1)}
    </div>
  );
};
