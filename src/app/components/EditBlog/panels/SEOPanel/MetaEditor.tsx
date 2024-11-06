import React from 'react';

interface MetaEditorProps {
  title: string;
  description: string;
  onChange?: (data: { title?: string; description?: string }) => void;
}

export const MetaEditor: React.FC<MetaEditorProps> = ({
  title,
  description,
  onChange = () => {},
}) => {
  return (
    <div className="space-y-6">
      <div>
        <label className="block text-sm font-medium text-gray-500 mb-2">Meta Title</label>
        <input
          type="text"
          value={title}
          onChange={(e) => onChange({ title: e.target.value })}
          className="w-full rounded-lg bg-gray-100 border border-gray-200 px-4 py-2.5 text-gray-900 focus:outline-none focus:ring-2 focus:ring-[#1a365d] focus:border-transparent transition-colors"
          placeholder="Enter meta title"
          maxLength={60}
        />
        <p className="mt-2 text-sm text-gray-500">{title.length}/60 characters</p>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-500 mb-2">Meta Description</label>
        <textarea
          value={description}
          onChange={(e) => onChange({ description: e.target.value })}
          className="w-full rounded-lg bg-gray-100 border border-gray-200 px-4 py-2.5 text-gray-900 focus:outline-none focus:ring-2 focus:ring-[#1a365d] focus:border-transparent transition-colors"
          rows={3}
          placeholder="Enter meta description"
          maxLength={160}
        />
        <p className="mt-2 text-sm text-gray-500">{description.length}/160 characters</p>
      </div>
    </div>
  );
}; 