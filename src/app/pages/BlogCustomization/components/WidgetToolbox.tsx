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
    <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-4">
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
        {widgets.map(widget => (
          <div
            key={widget.id}
            ref={ref =>
              connectors.create(
                ref as HTMLElement,
                <WidgetWrapper widget={widget} config={widget.config || {}} />,
              )
            }
            className="group cursor-pointer p-4 rounded-lg border border-gray-200 hover:border-[#1a365d] hover:shadow-sm transition-all"
            onClick={() => onWidgetSelect(widget)}
          >
            <div className="flex items-center space-x-3">
              <div className="flex-shrink-0 w-10 h-10 bg-[#1a365d]/10 rounded-lg flex items-center justify-center">
                {/* You might want to add an icon here */}
              </div>
              <div>
                <h3 className="text-sm font-medium text-gray-900 group-hover:text-[#1a365d]">
                  {widget.name}
                </h3>
                <p className="text-xs text-gray-500">Drag to add</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
