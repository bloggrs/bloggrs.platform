import React from 'react';
import { commonStyles } from './common-styles';

interface TypographyControlsProps {
  fonts: {
    headings?: string;
    body?: string;
  };
  sizes: {
    base?: string;
    headings?: Record<string, string>;
  };
  onChange: (typography: { fonts: any; fontSizes: any }) => void;
}

export const TypographyControls: React.FC<TypographyControlsProps> = ({
  fonts = { headings: 'Arial', body: 'Arial' },
  sizes = { base: '16px', headings: {} },
  onChange,
}) => {
  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
      <h3 className="text-xl font-semibold text-gray-800 mb-6">Typography</h3>
      
      <div className="space-y-5">
        <div className="space-y-2">
          <label className="block text-sm font-medium text-gray-500">Heading Font</label>
          <select
            value={fonts?.headings || 'Arial'}
            onChange={(e) => onChange({ 
              fonts: { ...fonts, headings: e.target.value },
              fontSizes: sizes 
            })}
            className="w-full rounded-lg bg-gray-100 border border-gray-200 py-2 px-3 focus:outline-none focus:ring-2 focus:ring-[#1a365d] focus:border-transparent"
          >
            <option value="Arial">Arial</option>
            <option value="Helvetica">Helvetica</option>
            <option value="Times New Roman">Times New Roman</option>
          </select>
        </div>

        <div className="space-y-2">
          <label className="block text-sm font-medium text-gray-500">Body Font</label>
          <select
            value={fonts?.body || 'Arial'}
            onChange={(e) => onChange({ 
              fonts: { ...fonts, body: e.target.value },
              fontSizes: sizes 
            })}
            className="w-full rounded-lg bg-gray-100 border border-gray-200 py-2 px-3 focus:outline-none focus:ring-2 focus:ring-[#1a365d] focus:border-transparent"
          >
            <option value="Arial">Arial</option>
            <option value="Helvetica">Helvetica</option>
            <option value="Times New Roman">Times New Roman</option>
          </select>
        </div>

        <div className="space-y-2">
          <label className="block text-sm font-medium text-gray-500">Base Font Size</label>
          <input
            type="text"
            value={sizes.base}
            onChange={(e) => onChange({
              fonts,
              fontSizes: { ...sizes, base: e.target.value }
            })}
            className="w-full rounded-lg bg-gray-100 border border-gray-200 py-2 px-3 focus:outline-none focus:ring-2 focus:ring-[#1a365d] focus:border-transparent"
            placeholder="16px"
          />
        </div>
      </div>
    </div>
  );
}; 