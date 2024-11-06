import React from 'react';
import { BarChart2, Clock, ArrowUpRight } from 'lucide-react';

interface EngagementMetricsProps {
  pageViews: number;
  readTime: number;
  bounceRate: number;
}

export const EngagementMetrics: React.FC<EngagementMetricsProps> = ({
  pageViews,
  readTime,
  bounceRate
}) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      <div className="bg-white rounded-xl shadow-sm hover:shadow-md transition-all duration-200 p-6 border border-gray-100">
        <div className="flex items-center justify-between mb-4">
          <div className="p-2 bg-blue-50 rounded-lg">
            <BarChart2 className="w-5 h-5 text-blue-600" />
          </div>
          <span className="text-sm text-gray-500">Last 30 days</span>
        </div>
        <h3 className="text-sm font-medium text-gray-500 mb-1">Page Views</h3>
        <div className="flex items-baseline space-x-2">
          <p className="text-2xl font-semibold text-gray-900">
            {pageViews.toLocaleString()}
          </p>
          <span className="text-sm text-green-500 flex items-center">
            <ArrowUpRight className="w-4 h-4 mr-0.5" />
            12%
          </span>
        </div>
      </div>
      
      <div className="bg-white rounded-xl shadow-sm hover:shadow-md transition-all duration-200 p-6 border border-gray-100">
        <div className="flex items-center justify-between mb-4">
          <div className="p-2 bg-orange-50 rounded-lg">
            <Clock className="w-5 h-5 text-orange-600" />
          </div>
          <span className="text-sm text-gray-500">Last 30 days</span>
        </div>
        <h3 className="text-sm font-medium text-gray-500 mb-1">Avg. Read Time</h3>
        <div className="flex items-baseline space-x-2">
          <p className="text-2xl font-semibold text-gray-900">{readTime}</p>
          <span className="text-base text-gray-600">min</span>
        </div>
      </div>
      
      <div className="bg-white rounded-xl shadow-sm hover:shadow-md transition-all duration-200 p-6 border border-gray-100">
        <div className="flex items-center justify-between mb-4">
          <div className="p-2 bg-purple-50 rounded-lg">
            <ArrowUpRight className="w-5 h-5 text-purple-600" />
          </div>
          <span className="text-sm text-gray-500">Last 30 days</span>
        </div>
        <h3 className="text-sm font-medium text-gray-500 mb-1">Bounce Rate</h3>
        <div className="flex items-baseline space-x-2">
          <p className="text-2xl font-semibold text-gray-900">{bounceRate}</p>
          <span className="text-base text-gray-600">%</span>
        </div>
      </div>
    </div>
  );
};
