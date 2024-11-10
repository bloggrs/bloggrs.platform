import React from 'react';
import { TemplateSelector } from './TemplateSelector';
import { LayoutBuilder } from './LayoutBuilder';
import { ColorSchemeManager } from './ColorSchemeManager';
import { TypographyControls } from './TypographyControls';
import { CustomCSS } from './CustomCSS';

interface DesignSettings {
  template: string;
  layout: any;
  colors: {
    primary: string;
    secondary: string;
    background: string;
    text: string;
  };
  typography: {
    headings: {
      h1: { size: string; weight: string; lineHeight: string };
      h2: { size: string; weight: string; lineHeight: string };
      h3: { size: string; weight: string; lineHeight: string };
      h4: { size: string; weight: string; lineHeight: string };
      h5: { size: string; weight: string; lineHeight: string };
      h6: { size: string; weight: string; lineHeight: string };
    };
    body: {
      size: string;
      lineHeight: string;
      paragraphSpacing: string;
    };
    fontFamily: string;
    fontSize: string;
  };
  fonts: any;
  fontSizes: any;
  customCSS: string;
}

interface DesignComponents {
  TemplateSelector: any;
  LayoutBuilder: any;
  ColorSchemeManager: any;
  TypographyControls: any;
  CustomCSS: any;
  templates: any[];
  blocks: any[];
}

interface DesignPanelProps {
  settings: DesignSettings;
  onChange: (settings: DesignSettings) => void;
  components: DesignComponents;
}

export const DesignPanel: React.FC<DesignPanelProps> = ({
  settings,
  onChange,
  components,
}) => {
  return (
    <div className="flex-1 p-8 bg-gray-50">
      <div className="max-w-5xl mx-auto">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <h1 className="text-2xl font-semibold text-gray-800">
            Design Settings
          </h1>
        </div>

        {/* Settings Panel */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200">
          <div className="space-y-6 p-6">
            <TemplateSelector
              currentTemplate={settings.template}
              templates={components.templates || []}
              onSelect={template => onChange({ ...settings, template })}
            />

            <div className="border-t border-gray-100 pt-6">
              <LayoutBuilder
                layout={settings.layout}
                blocks={components.blocks || []}
                onChange={layout => onChange({ ...settings, layout })}
              />
            </div>

            <div className="border-t border-gray-100 pt-6">
              <ColorSchemeManager
                colors={settings.colors}
                onChange={colors => onChange({ ...settings, colors })}
              />
            </div>

            <div className="border-t border-gray-100 pt-6">
              <TypographyControls
                fonts={settings.fonts}
                sizes={settings.fontSizes}
                onChange={typography =>
                  onChange({ ...settings, ...typography })
                }
              />
            </div>

            <div className="border-t border-gray-100 pt-6">
              <CustomCSS
                value={settings.customCSS}
                onChange={css => onChange({ ...settings, customCSS: css })}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
