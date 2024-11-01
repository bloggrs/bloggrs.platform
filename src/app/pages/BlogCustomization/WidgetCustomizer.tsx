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
      <div className="widget-customizer">
        <div className="widget-list">
          {Object.keys(widgetRegistry).map((type) => (
            <div key={type} className="widget-item">
              {/* Widget selection UI */}
            </div>
          ))}
        </div>
        <div className="widget-config">
          <p>Please select a valid widget type</p>
        </div>
      </div>
    );
  }

  return (
    <div className="widget-customizer">
      <div className="widget-list">
        {Object.keys(widgetRegistry).map((type) => (
          <div key={type} className="widget-item">
            {/* Widget selection UI */}
          </div>
        ))}
      </div>
      
      <div className="widget-config">
        <WidgetComponent
          config={currentConfig}
          onChange={onConfigChange}
        />
      </div>
    </div>
  );
}; 