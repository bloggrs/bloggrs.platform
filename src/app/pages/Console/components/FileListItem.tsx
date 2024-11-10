import * as React from 'react';
import { FolderIcon, DocumentIcon } from '@heroicons/react/24/outline';

interface FileListItemProps {
  file: {
    name: string;
    size: number;
    isDirectory: boolean;
    modified: string;
  };
  onSelect: () => void;
}

export const FileListItem = ({ file, onSelect }: FileListItemProps) => {
  return (
    <div
      className="flex items-center p-2 hover:bg-gray-50 cursor-pointer"
      onClick={onSelect}
    >
      {file.isDirectory ? (
        <FolderIcon className="h-5 w-5 text-yellow-500 mr-2" />
      ) : (
        <DocumentIcon className="h-5 w-5 text-gray-500 mr-2" />
      )}
      <div className="flex-1">
        <div className="text-sm">{file.name}</div>
        <div className="text-xs text-gray-500">
          {file.isDirectory ? '--' : formatFileSize(file.size)}
        </div>
      </div>
      <div className="text-xs text-gray-500">
        {new Date(file.modified).toLocaleDateString()}
      </div>
    </div>
  );
};

const formatFileSize = (bytes: number): string => {
  if (bytes === 0) return '0 B';
  const k = 1024;
  const sizes = ['B', 'KB', 'MB', 'GB'];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return `${parseFloat((bytes / Math.pow(k, i)).toFixed(1))} ${sizes[i]}`;
};
