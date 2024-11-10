import React, { useState } from 'react';
import { Search, Upload, X, MoreHorizontal } from 'lucide-react';

interface MediaItem {
  id: string;
  url: string;
  type: 'image' | 'video' | 'document';
  name: string;
  size: number;
  uploadedAt: Date;
}

interface MediaLibraryProps {
  onSelect?: (media: MediaItem) => void;
  maxFileSize?: number;
  allowedTypes?: string[];
}

export const MediaLibrary: React.FC<MediaLibraryProps> = ({
  onSelect,
  maxFileSize = 5242880, // 5MB default
  allowedTypes = ['image/*', 'video/*', 'application/pdf'],
}) => {
  const [media, setMedia] = useState<MediaItem[]>([]);
  const [uploading, setUploading] = useState(false);
  const [selectedItems, setSelectedItems] = useState<string[]>([]);

  const handleUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files?.length) return;

    setUploading(true);
    // TODO: Implement actual upload logic to your backend
    const newMedia: MediaItem = {
      id: Date.now().toString(),
      url: URL.createObjectURL(files[0]),
      type: files[0].type.startsWith('image') ? 'image' : 'video',
      name: files[0].name,
      size: files[0].size,
      uploadedAt: new Date(),
    };

    setMedia([newMedia, ...media]);
    setUploading(false);
  };

  const toggleSelect = (id: string) => {
    setSelectedItems(prev =>
      prev.includes(id) ? prev.filter(itemId => itemId !== id) : [...prev, id],
    );
  };

  const toggleSelectAll = () => {
    setSelectedItems(prev =>
      prev.length === media.length ? [] : media.map(item => item.id),
    );
  };

  return (
    <div className="bg-gray-50 min-h-screen">
      <div className="max-w-5xl mx-auto p-8">
        <div className="bg-white rounded-xl shadow-sm border border-gray-200">
          {/* Header */}
          <div className="p-4 border-b border-gray-100 flex justify-between items-center">
            <div className="flex items-center space-x-4">
              <h3 className="text-xl font-semibold text-gray-800">
                Media Library
              </h3>
              <input
                type="file"
                accept={allowedTypes.join(',')}
                onChange={handleUpload}
                className="border rounded p-1"
              />
            </div>
            <div className="flex space-x-2">
              <button className="text-gray-500 hover:text-gray-700">
                <Search size={16} />
              </button>
              <button className="text-gray-500 hover:text-gray-700">
                <Upload size={16} />
              </button>
              <button className="text-gray-500 hover:text-gray-700">
                <X size={16} />
              </button>
              <button className="text-gray-500 hover:text-gray-700">
                <MoreHorizontal size={16} />
              </button>
            </div>
          </div>

          <div className="grid grid-cols-3 gap-4">
            {media.map(item => (
              <div
                key={item.id}
                onClick={() => onSelect?.(item)}
                className="cursor-pointer border rounded p-2 hover:border-blue-500"
              >
                {item.type === 'image' && (
                  <img
                    src={item.url}
                    alt={item.name}
                    className="w-full h-32 object-cover"
                  />
                )}
                <p className="text-sm truncate mt-1">{item.name}</p>
              </div>
            ))}
          </div>

          {uploading && <div className="text-center mt-4">Uploading...</div>}
        </div>
      </div>
    </div>
  );
};
