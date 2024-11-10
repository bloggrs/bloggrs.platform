import React from 'react';
import { commonStyles } from './common-styles';

interface ColorScheme {
  primary: string;
  secondary: string;
  background: string;
  text: string;
}

interface ColorSchemeManagerProps {
  colors: ColorScheme;
  onChange: (colors: ColorScheme) => void;
}

export const ColorSchemeManager: React.FC<ColorSchemeManagerProps> = ({
  colors,
  onChange,
}) => {
  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
      <h3 className="text-lg font-semibold text-gray-800 mb-6">Color Scheme</h3>
      <div className="grid grid-cols-2 gap-6">
        {Object.entries(colors).map(([key, value]) => (
          <div key={key} className="space-y-2">
            <label className="text-sm font-medium text-gray-500 capitalize">
              {key}
            </label>
            <div className="relative">
              <input
                type="color"
                value={value}
                onChange={e => onChange({ ...colors, [key]: e.target.value })}
                className="w-full h-12 rounded-lg cursor-pointer border border-gray-200 focus:ring-2 focus:ring-[#1a365d] focus:border-transparent"
              />
              <input
                type="text"
                value={value}
                onChange={e => onChange({ ...colors, [key]: e.target.value })}
                className="absolute top-0 right-0 w-24 h-12 px-3 text-sm border-l rounded-r-lg focus:outline-none focus:ring-2 focus:ring-[#1a365d] focus:border-transparent"
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
