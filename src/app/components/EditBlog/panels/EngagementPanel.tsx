import React from 'react';

interface EngagementPanelProps {
  components: {
    CommentSettings: React.ComponentType;
    NewsletterForm: React.ComponentType;
    SocialSharing: React.ComponentType;
    RelatedPosts: React.ComponentType;
    TableOfContents: React.ComponentType;
  };
}

export const EngagementPanel: React.FC<EngagementPanelProps> = ({ components }) => {
  return (
    <div className="p-8">
      <div className="max-w-5xl mx-auto">
        <div className="grid grid-cols-1 gap-6">
          {Object.entries(components).map(([key, Component]) => (
            <div 
              key={key} 
              className="bg-white rounded-xl shadow-sm border border-gray-200 hover:border-gray-300 transition-all"
            >
              <div className="p-6">
                <h3 className="text-lg font-semibold text-gray-800 mb-4">
                  {key.replace(/([A-Z])/g, ' $1').trim()}
                </h3>
                <div className="bg-gray-50 rounded-lg p-4 border border-gray-100">
                  <Component />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}; 