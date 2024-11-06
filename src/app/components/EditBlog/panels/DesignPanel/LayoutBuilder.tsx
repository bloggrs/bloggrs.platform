import React from 'react';

interface LayoutBuilderProps {
  layout: any;
  blocks: any[];
  onChange: (layout: any) => void;
}

export const LayoutBuilder: React.FC<LayoutBuilderProps> = ({ layout, blocks, onChange }) => {
  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
      <h3 className="text-xl font-semibold text-gray-800 mb-6">Layout Builder</h3>
      <div className="grid grid-cols-2 gap-4">
        {blocks.map((block, index) => (
          <div
            key={index}
            className="flex items-center p-4 rounded-lg border border-gray-200 cursor-pointer 
                       hover:bg-gray-50 transition-colors group"
            onClick={() => onChange([...layout, block])}
          >
            <span className="font-medium text-gray-900">{block.name}</span>
          </div>
        ))}
      </div>
    </div>
  );
}; 