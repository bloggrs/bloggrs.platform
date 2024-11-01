export interface Widget {
  id: string;
  type: string;
  name: string;
  description?: string;
  config?: Record<string, any>;
  component?: React.ComponentType<any>;
} 