import { useNode } from '@craftjs/core';
import React from 'react';
import { Widget } from '../../../../types/Widget';
import { WidgetPreview } from '../WidgetPreview';

interface Props {
  widget: Widget;
  config: Record<string, any>;
}

export const WidgetWrapper = ({ widget, config }: Props) => {
  const { connectors: { connect, drag } } = useNode();

  return (
    <div 
      ref={ref => connect(drag(ref as HTMLElement))}
      className="widget-wrapper"
    >
      <WidgetPreview
        widget={widget}
        config={config}
      />
    </div>
  );
}; 