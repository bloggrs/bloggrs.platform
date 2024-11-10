import React from 'react';

interface AccessibilityFeatures {
  wcagCompliance: Record<string, unknown>;
  screenReader: Record<string, unknown>;
  colorContrast: Record<string, unknown>;
}

interface AccessibilityCheckerProps {
  features: AccessibilityFeatures;
}

export const AccessibilityChecker: React.FC<AccessibilityCheckerProps> = ({
  features,
}) => {
  return (
    <div className="p-6 space-y-6">
      <div className="space-y-4">
        <h3 className="text-lg font-medium text-gray-800">WCAG Compliance</h3>
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-4">
          <ul className="space-y-3">
            <li className="flex items-center">
              <span className="w-2.5 h-2.5 rounded-full bg-green-500 mr-3" />
              <span className="text-gray-700">Heading structure</span>
            </li>
            <li className="flex items-center">
              <span className="w-2.5 h-2.5 rounded-full bg-green-500 mr-3" />
              <span className="text-gray-700">Alt text for images</span>
            </li>
            <li className="flex items-center">
              <span className="w-2.5 h-2.5 rounded-full bg-yellow-500 mr-3" />
              <span className="text-gray-700">Link accessibility</span>
            </li>
          </ul>
        </div>
      </div>

      <div className="space-y-4">
        <h3 className="text-lg font-medium text-gray-800">Color Contrast</h3>
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-4">
          <div className="flex justify-between items-center">
            <span className="text-gray-700">Text-to-Background Ratio:</span>
            <span className="font-medium text-gray-900">4.5:1</span>
          </div>
        </div>
      </div>

      <div className="space-y-4">
        <h3 className="text-lg font-medium text-gray-800">
          Screen Reader Preview
        </h3>
        <button className="w-full bg-[#f4a261] hover:bg-[#e76f51] text-white py-2.5 px-4 rounded-lg transition-colors">
          Test with Screen Reader
        </button>
      </div>
    </div>
  );
};
