import { DefaultWidget } from 'components/widgets/DefaultWidget';
import { ComponentType } from 'react';

// Import at least one widget component

interface WidgetComponentProps {
  config: Record<string, any>;
  onChange: (config: Record<string, any>) => void;
}

export const widgetRegistry: Record<
  string,
  ComponentType<WidgetComponentProps>
> = {
  // Register at least one widget
  default: DefaultWidget,
};
