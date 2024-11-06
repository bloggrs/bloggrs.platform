import { useNode } from '@craftjs/core';
import React from 'react';
import { Widget } from '../../../../types/Widget';
import { WidgetPreview } from '../WidgetPreview';

interface Props {
  widget: Widget;
  config: Record<string, any>;
}

export const WidgetWrapper = ({ widget, config }: Props) => {
  const {
    connectors: { connect, drag },
  } = useNode();

  return (
    <div
      ref={ref => connect(drag(ref as HTMLElement))}
      className="bg-white rounded-xl shadow-sm border border-gray-200 p-4 hover:bg-gray-50 transition-colors cursor-move"
    >
      <WidgetPreview widget={widget} config={config} />
    </div>
  );
};
