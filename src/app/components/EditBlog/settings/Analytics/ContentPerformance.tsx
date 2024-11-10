import React from 'react';

interface ContentItem {
  id: string;
  title: string;
  views: number;
  shares: number;
}

interface ContentEngagement {
  comments: number;
  likes: number;
  shareCount: number;
}

interface ContentPerformanceProps {
  popular: ContentItem[];
  engagement: ContentEngagement;
}

export const ContentPerformance: React.FC<ContentPerformanceProps> = ({
  popular,
  engagement,
}) => {
  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
      <h3 className="text-2xl font-semibold text-gray-800 mb-6">
        Content Performance
      </h3>

      <div className="grid gap-8 md:grid-cols-2">
        <div>
          <h4 className="text-sm font-medium text-gray-500 mb-4">
            Top Performing Content
          </h4>
          <div className="space-y-4">
            {popular.map(item => (
              <div
                key={item.id}
                className="flex items-center justify-between group hover:bg-gray-50 p-3 rounded-lg transition-colors"
              >
                <span className="text-gray-900 font-medium truncate">
                  {item.title}
                </span>
                <div className="flex gap-6 text-sm text-gray-500">
                  <span>{item.views} views</span>
                  <span>{item.shares} shares</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div>
          <h4 className="text-sm font-medium text-gray-500 mb-4">
            Overall Engagement
          </h4>
          <div className="grid grid-cols-3 gap-6">
            <div className="bg-gray-50 rounded-xl p-4 text-center hover:bg-gray-100 transition-colors">
              <div className="text-2xl font-semibold text-gray-900">
                {engagement.comments}
              </div>
              <div className="text-sm text-gray-500 mt-1">Comments</div>
            </div>
            <div className="bg-gray-50 rounded-xl p-4 text-center hover:bg-gray-100 transition-colors">
              <div className="text-2xl font-semibold text-gray-900">
                {engagement.likes}
              </div>
              <div className="text-sm text-gray-500 mt-1">Likes</div>
            </div>
            <div className="bg-gray-50 rounded-xl p-4 text-center hover:bg-gray-100 transition-colors">
              <div className="text-2xl font-semibold text-gray-900">
                {engagement.shareCount}
              </div>
              <div className="text-sm text-gray-500 mt-1">Shares</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
