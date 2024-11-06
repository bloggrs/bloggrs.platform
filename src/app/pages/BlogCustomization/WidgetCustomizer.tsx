import React from 'react';
import { Widget } from '../../../types/Widget';
import { widgetRegistry } from '../../../registry/widgetRegistry';

interface WidgetCustomizerProps {
  widget: Widget;
  currentConfig: Record<string, any>;
  onConfigChange: (widgetConfig: Record<string, any>) => void;
}

export const WidgetCustomizer: React.FC<WidgetCustomizerProps> = ({
  widget,
  currentConfig,
  onConfigChange,
}) => {
  const widgetType = widget?.type;
  const WidgetComponent = widgetType && widgetRegistry[widgetType];

  if (!widgetType || !WidgetComponent) {
    return (
      <div className="min-h-screen flex bg-gray-50" style={{marginTop: "3%"}}>
        <div className="flex-1 p-8">
          <div className="max-w-5xl mx-auto">
            <div className="bg-white rounded-xl shadow-sm border border-gray-200">
              <div className="p-6">
                <div className="grid grid-cols-3 gap-4">
                  {Object.keys(widgetRegistry).map(type => (
                    <div 
                      key={type} 
                      className="p-4 border border-gray-200 rounded-lg hover:border-[#1a365d] hover:shadow-sm transition-all cursor-pointer"
                    >
                      {/* Widget selection UI */}
                    </div>
                  ))}
                </div>
                <div className="mt-6 text-center text-gray-500">
                  <p>Please select a valid widget type</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex bg-gray-50" style={{marginTop: "3%"}}>
      <div className="flex-1 p-8">
        <div className="max-w-5xl mx-auto">
          <div className="bg-white rounded-xl shadow-sm border border-gray-200">
            <div className="p-6">
              <div className="grid grid-cols-3 gap-4 mb-6">
                {Object.keys(widgetRegistry).map(type => (
                  <div 
                    key={type} 
                    className="p-4 border border-gray-200 rounded-lg hover:border-[#1a365d] hover:shadow-sm transition-all cursor-pointer"
                  >
                    {/* Widget selection UI */}
                  </div>
                ))}
              </div>
              <div className="border-t border-gray-100 pt-6">
                <WidgetComponent config={currentConfig} onChange={onConfigChange} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
