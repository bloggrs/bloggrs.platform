import React from 'react';

interface DefaultWidgetProps {
  config: Record<string, any>;
  onChange: (config: Record<string, any>) => void;
}

export const DefaultWidget: React.FC<DefaultWidgetProps> = ({ config, onChange }) => {
  return <div>Default Widget</div>;
}; 