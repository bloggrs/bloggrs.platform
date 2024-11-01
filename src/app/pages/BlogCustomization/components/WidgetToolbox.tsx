import React from 'react';
import { useEditor } from '@craftjs/core';
import { Widget } from '../../../../types/Widget';
import { WidgetWrapper } from './WidgetWrapper';

interface Props {
  widgets: Widget[];
  onWidgetSelect: (widget: Widget) => void;
}

export const WidgetToolbox = ({ widgets, onWidgetSelect }: Props) => {
  const { connectors } = useEditor();

  return (
    <div className="widget-toolbox">
      {widgets.map(widget => (
        <div
          key={widget.id}
          ref={ref => connectors.create(ref as HTMLElement, <WidgetWrapper widget={widget} config={widget.config || {}} />)}
          className="widget-item"
          onClick={() => onWidgetSelect(widget)}
        >
          {widget.name}
        </div>
      ))}
    </div>
  );
}; 