import React from 'react';

const SCHEMA_TYPES = [
  'Article',
  'BlogPosting',
  'NewsArticle',
  'Product',
  'FAQPage',
  'HowTo',
] as const;

interface SchemaMarkupProps {
  type: string;
  data: any;
  onChange: (settings: any) => void;
}

export const SchemaMarkup: React.FC<SchemaMarkupProps> = ({
  type,
  data,
  onChange,
}) => {
  return (
    <div className="space-y-6">
      <h3 className="text-2xl font-semibold text-gray-800">Schema Markup</h3>
      <div className="space-y-4">
        <select
          value={type}
          onChange={e => onChange({ schemaType: e.target.value })}
          className="w-full rounded-lg bg-gray-100 border border-gray-200 px-4 py-2.5 text-gray-700 focus:outline-none focus:ring-2 focus:ring-[#1a365d] focus:border-transparent"
        >
          {SCHEMA_TYPES.map(schemaType => (
            <option key={schemaType} value={schemaType}>
              {schemaType}
            </option>
          ))}
        </select>

        <textarea
          value={JSON.stringify(data, null, 2)}
          onChange={e => {
            try {
              const parsed = JSON.parse(e.target.value);
              onChange({ schemaData: parsed });
            } catch (err) {
              // Handle invalid JSON silently
            }
          }}
          placeholder="Schema JSON data"
          className="w-full h-40 rounded-lg bg-gray-100 border border-gray-200 px-4 py-2.5 font-mono text-sm text-gray-700 focus:outline-none focus:ring-2 focus:ring-[#1a365d] focus:border-transparent"
        />
      </div>
    </div>
  );
};
