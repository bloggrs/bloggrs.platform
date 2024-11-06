import React from 'react';

interface Template {
  id: string;
  name: string;
  thumbnail: string;
  description?: string;
}

interface TemplateSelectorProps {
  currentTemplate: string;
  templates: Template[];
  onSelect: (templateId: string) => void;
}

export const TemplateSelector: React.FC<TemplateSelectorProps> = ({
  currentTemplate,
  templates,
  onSelect,
}) => {
  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200">
      <div className="p-6">
        <h3 className="text-xl font-semibold text-gray-800 mb-6">Templates</h3>
        <div className="grid grid-cols-2 gap-6 sm:grid-cols-3">
          {templates.map((template) => (
            <div
              key={template.id}
              className={`group cursor-pointer rounded-lg border transition-all hover:shadow-md
                ${
                  currentTemplate === template.id
                  ? 'border-[#1a365d] bg-blue-50/50'
                  : 'border-gray-200 hover:border-gray-300'
                }`}
              onClick={() => onSelect(template.id)}
            >
              <img
                src={template.thumbnail}
                alt={template.name}
                className="aspect-video w-full rounded-t-lg object-cover"
              />
              <div className="p-4 space-y-1">
                <h4 className="font-medium text-gray-900">{template.name}</h4>
                {template.description && (
                  <p className="text-sm text-gray-500">{template.description}</p>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
