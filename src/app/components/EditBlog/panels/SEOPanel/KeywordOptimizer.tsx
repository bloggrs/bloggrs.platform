import React from 'react';

interface KeywordOptimizerProps {
  mainKeyword: string;
  secondaryKeywords: string[];
  content: string;
  suggestions?: {
    density: number;
    recommendations: string[];
    relatedTerms: string[];
  };
}

export const KeywordOptimizer: React.FC<KeywordOptimizerProps> = ({
  mainKeyword,
  secondaryKeywords = [],
  content,
  suggestions
}) => {
  const density = suggestions?.density || calculateKeywordDensity(mainKeyword, content);
  
  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200">
      <div className="p-6">
        <h3 className="text-xl font-semibold text-gray-800 mb-6">Keyword Optimization</h3>
        
        <div className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-500 mb-2">Main Keyword</label>
            <div className="flex items-center gap-3">
              <input
                type="text"
                value={mainKeyword}
                className="flex-1 rounded-lg bg-gray-100 border border-gray-200 px-4 py-2.5 text-gray-900 focus:outline-none focus:ring-2 focus:ring-[#1a365d] focus:border-transparent"
                placeholder="Enter main keyword"
              />
              <span className="text-sm px-3 py-1.5 bg-[#1a365d] text-white rounded-lg">
                Density: {density.toFixed(1)}%
              </span>
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-500 mb-2">Secondary Keywords</label>
            <div className="flex flex-wrap gap-2">
              {secondaryKeywords?.map((keyword, index) => (
                <span key={index} className="px-3 py-1.5 bg-gray-100 text-gray-700 rounded-lg text-sm hover:bg-gray-200 transition-colors">
                  {keyword}
                </span>
              ))}
            </div>
          </div>

          {suggestions?.recommendations && (
            <div className="border-t border-gray-100 pt-4">
              <h4 className="text-sm font-medium text-gray-500 mb-3">Recommendations</h4>
              <ul className="text-sm text-gray-600 space-y-2">
                {suggestions.recommendations.map((rec, index) => (
                  <li key={index} className="flex items-start">
                    <span className="mr-2 text-[#f4a261]">•</span>
                    {rec}
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

function calculateKeywordDensity(keyword: string, content: string): number {
  if (!keyword || !content) return 0;
  const keywordCount = content.toLowerCase().split(keyword.toLowerCase()).length - 1;
  const wordCount = content.split(/\s+/).length;
  return (keywordCount / wordCount) * 100;
} 