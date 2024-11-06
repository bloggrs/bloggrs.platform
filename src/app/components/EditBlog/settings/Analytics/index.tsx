import React from 'react';
import { EngagementMetrics } from './EngagementMetrics';
import { TrafficSources } from './TrafficSources';
import { ContentPerformance } from './ContentPerformance';
import { HeatmapVisualization } from './HeatmapVisualization';
import { ConversionMetrics } from './ConversionMetrics';

interface TrafficSource {
  source: string;
  count: number;
  visits: number;
  percentage: number;
}

interface ContentEngagement {
  comments: number;
  likes: number;
  shareCount: number;
}

interface ConversionGoal {
  id: string;
  name: string;
  target: number;
  current: number;
  conversionRate: number;
}

interface AnalyticsMetrics {
  pageViews: number;
  engagement: {
    timeOnPage: number;
    scrollDepth: number;
    interactions: number;
    commentCount: number;
  };
  traffic: number;
  heatmaps: Record<string, any>;
  averageReadTime: number;
  bounceRate: number;
  trafficSources: TrafficSource[];
  sourceTrends: Record<string, number[]>;
  userBehavior: {
    scrollDepth: number;
    clickPatterns: Record<string, number>;
  };
  conversionRate: number;
  socialShares: Record<string, number>;
  popularContent: ContentItem[];
  contentEngagement: ContentEngagement;
  clickMap: { x: number; y: number; value: number }[];
  scrollDepth: { depth: number; frequency: number }[];
  attentionHotspots: { element: string; duration: number }[];
  conversionGoals: ConversionGoal[];
  goalPerformance: {
    daily: number;
    weekly: number;
    monthly: number;
  };
}

interface AnalyticsProps {
  metrics: AnalyticsMetrics;
  period?: string;
  onPeriodChange?: (period: string) => void;
}

interface ContentItem {
  id: string;
  title: string;
  views: number;
  engagement: number;
  shares: number;
}

export const Analytics: React.FC<AnalyticsProps> = ({ metrics, period, onPeriodChange }) => {
  const transformedTrends = Object.entries(metrics.sourceTrends).map(([source, data]) => ({
    source,
    data,
    dates: data.map((_, index) => `Day ${index + 1}`)
  }));

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center space-x-4">
            <h1 className="text-2xl font-semibold text-gray-800">Analytics Dashboard</h1>
          </div>
          {period && onPeriodChange && (
            <div className="flex items-center space-x-4">
              <select 
                value={period}
                onChange={(e) => onPeriodChange(e.target.value)}
                className="w-40 pl-3 pr-10 py-2 rounded-lg bg-white border border-gray-200 focus:outline-none focus:ring-2 focus:ring-[#1a365d] focus:border-transparent"
              >
                <option value="daily">Daily</option>
                <option value="weekly">Weekly</option>
                <option value="monthly">Monthly</option>
              </select>
            </div>
          )}
        </div>

        <div className="space-y-6">
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <EngagementMetrics
              pageViews={metrics.pageViews}
              readTime={metrics.averageReadTime}
              bounceRate={metrics.bounceRate}
            />
          </div>
          
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <TrafficSources
              sources={metrics.trafficSources}
              trends={transformedTrends}
            />
          </div>
          
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <ContentPerformance
              popular={metrics.popularContent}
              engagement={metrics.contentEngagement}
            />
          </div>
          
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <HeatmapVisualization
              clicks={metrics.clickMap}
              scroll={metrics.scrollDepth}
              attention={metrics.attentionHotspots}
            />
          </div>
          
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <ConversionMetrics
              goals={metrics.conversionGoals}
              performance={metrics.goalPerformance}
            />
          </div>
        </div>
      </div>
    </div>
  );
}; 