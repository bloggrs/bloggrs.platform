import React from 'react';
import { Widget } from '../../../types/Widget';

interface WidgetPreviewProps {
  widget: Widget | null;
  config: Record<string, any>;
}

export const WidgetPreview: React.FC<WidgetPreviewProps> = ({
  widget,
  config,
}) => {
  if (!widget) {
    return (
      <div className="flex items-center justify-center h-64 bg-gray-50 rounded-xl border-2 border-dashed border-gray-200">
        <p className="text-gray-500 text-sm">Select a widget to preview</p>
      </div>
    );
  }

  const WidgetComponent = widget.component || widget.type;
  if (!WidgetComponent || typeof WidgetComponent !== 'function') {
    console.error('Widget component is not properly defined:', widget);
    return (
      <div className="flex items-center justify-center h-64 bg-red-50 rounded-xl border border-red-200">
        <p className="text-red-500 text-sm">
          Widget component is not properly configured
        </p>
      </div>
    );
  }

  try {
    return (
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-4">
        <WidgetComponent {...config} />
      </div>
    );
  } catch (error) {
    console.error('Error rendering widget:', error);
    return (
      <div className="flex items-center justify-center h-64 bg-red-50 rounded-xl border border-red-200">
        <p className="text-red-500 text-sm">Failed to render widget</p>
      </div>
    );
  }
};
