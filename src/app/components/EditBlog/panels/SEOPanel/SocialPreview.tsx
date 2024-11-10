import React from 'react';

interface SocialPreviewProps {
  ogImage: string;
  ogTitle: string;
  ogDescription: string;
  twitterCard: string;
  onChange?: (updates: Partial<SocialPreviewProps>) => void;
}

export const SocialPreview: React.FC<SocialPreviewProps> = ({
  ogImage,
  ogTitle,
  ogDescription,
  twitterCard,
  onChange,
}) => {
  return (
    <div className="space-y-6">
      <h3 className="text-2xl font-semibold text-gray-800">
        Social Media Preview
      </h3>

      <div className="space-y-6">
        <div className="flex flex-col">
          <label className="block text-sm font-medium text-gray-500 mb-2">
            Image
          </label>
          <input
            type="url"
            value={ogImage}
            onChange={e => onChange?.({ ogImage: e.target.value })}
            placeholder="Enter image URL"
            className="w-full px-4 py-2.5 rounded-lg bg-gray-100 border border-gray-200 focus:outline-none focus:ring-2 focus:ring-[#1a365d] focus:border-transparent"
          />
          {ogImage && (
            <div className="mt-3 relative h-48 w-full rounded-lg overflow-hidden shadow-sm">
              <img
                src={ogImage}
                alt="Social preview"
                className="object-cover w-full h-full"
              />
            </div>
          )}
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-500 mb-2">
            Title
          </label>
          <input
            type="text"
            value={ogTitle}
            onChange={e => onChange?.({ ogTitle: e.target.value })}
            placeholder="Enter engaging title for social media"
            className="w-full px-4 py-2.5 rounded-lg bg-gray-100 border border-gray-200 focus:outline-none focus:ring-2 focus:ring-[#1a365d] focus:border-transparent"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-500 mb-2">
            Description
          </label>
          <textarea
            value={ogDescription}
            onChange={e => onChange?.({ ogDescription: e.target.value })}
            placeholder="Write a compelling description"
            className="w-full px-4 py-2.5 rounded-lg bg-gray-100 border border-gray-200 focus:outline-none focus:ring-2 focus:ring-[#1a365d] focus:border-transparent"
            rows={3}
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-500 mb-2">
            Twitter Card Type
          </label>
          <select
            value={twitterCard}
            onChange={e => onChange?.({ twitterCard: e.target.value })}
            className="w-full px-4 py-2.5 rounded-lg bg-gray-100 border border-gray-200 focus:outline-none focus:ring-2 focus:ring-[#1a365d] focus:border-transparent"
          >
            <option value="summary">Summary</option>
            <option value="summary_large_image">Summary Large Image</option>
            <option value="app">App</option>
            <option value="player">Player</option>
          </select>
        </div>
      </div>

      <div className="mt-6 bg-white rounded-xl shadow-sm border border-gray-200">
        <div className="p-4">
          <h4 className="text-sm font-medium text-gray-500 mb-3">Preview</h4>
          <div className="rounded-lg overflow-hidden bg-white">
            {ogImage && (
              <div className="relative h-40 w-full">
                <img
                  src={ogImage}
                  alt="Social preview"
                  className="object-cover w-full h-full rounded-t-lg"
                />
              </div>
            )}
            <div className="p-4">
              <div className="text-lg font-semibold text-gray-800">
                {ogTitle}
              </div>
              <div className="mt-1 text-sm text-gray-500">{ogDescription}</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
