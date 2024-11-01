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
    return <div className="preview-placeholder">Select a widget to preview</div>;
  }

  const WidgetComponent = widget.component || widget.type;
  if (!WidgetComponent || typeof WidgetComponent !== 'function') {
    console.error('Widget component is not properly defined:', widget);
    return <div className="preview-error">Widget component is not properly configured</div>;
  }

  try {
    return (
      <div className="widget-preview">
        <WidgetComponent {...config} />
      </div>
    );
  } catch (error) {
    console.error('Error rendering widget:', error);
    return <div className="preview-error">Failed to render widget</div>;
  }
}; 