import React from 'react';
import { MetaEditor } from './MetaEditor';
import { KeywordOptimizer } from './KeywordOptimizer';
import { SchemaMarkup } from './SchemaMarkup';
import { SocialPreview } from './SocialPreview';

interface SEOSettings {
  metaTitle: string;
  metaDescription: string;
  mainKeyword: string;
  secondaryKeywords: string[];
  content: string;
  schemaType: string;
  schemaData: any;
  ogImage: string;
  ogTitle: string;
  ogDescription: string;
  twitterCard: string;
}

interface SEOPanelProps {
  settings: SEOSettings;
  onChange: (settings: SEOSettings) => void;
  tools: SEOTools;
}

interface SEOTools {
  KeywordOptimizer: any; // Replace 'any' with proper type when available
}

export const SEOPanel: React.FC<SEOPanelProps> = ({ settings, onChange, tools }) => {
  return (
    <div className="max-w-5xl mx-auto">
      <div className="bg-white rounded-xl shadow-sm border border-gray-200">
        <div className="space-y-6 p-6">
          <MetaEditor
            title={settings.metaTitle}
            description={settings.metaDescription}
            onChange={(data) => onChange({ 
              ...settings, 
              metaTitle: data.title || settings.metaTitle, 
              metaDescription: data.description || settings.metaDescription 
            })}
          />
          
          <div className="border-t border-gray-100 pt-6">
            <KeywordOptimizer
              mainKeyword={settings.mainKeyword}
              secondaryKeywords={settings.secondaryKeywords}
              content={settings.content}
              suggestions={tools?.KeywordOptimizer || []}
            />
          </div>
          
          <div className="border-t border-gray-100 pt-6">
            <SchemaMarkup
              type={settings.schemaType}
              data={settings.schemaData}
              onChange={onChange}
            />
          </div>
          
          <div className="border-t border-gray-100 pt-6">
            <SocialPreview
              ogImage={settings.ogImage}
              ogTitle={settings.ogTitle}
              ogDescription={settings.ogDescription}
              twitterCard={settings.twitterCard}
            />
          </div>
        </div>
      </div>
    </div>
  );
};
