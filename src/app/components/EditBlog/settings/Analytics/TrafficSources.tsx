import React from 'react';
import {
  PieChart,
  Pie,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from 'recharts';

interface TrafficSource {
  source: string;
  visits: number;
  percentage: number;
}

interface SourceTrend {
  source: string;
  data: number[];
  dates: string[];
}

interface TrafficSourcesProps {
  sources: TrafficSource[];
  trends: SourceTrend[];
}

export const TrafficSources: React.FC<TrafficSourcesProps> = ({
  sources,
  trends,
}) => {
  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
      <h3 className="text-2xl font-semibold text-gray-800 mb-6">
        Traffic Sources
      </h3>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Distribution Pie Chart */}
        <div className="h-[300px] bg-gray-50 rounded-lg p-4">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={sources.map(s => ({
                  name: s.source,
                  value: s.visits,
                }))}
                dataKey="value"
                nameKey="name"
                cx="50%"
                cy="50%"
                fill="#1a365d"
                paddingAngle={2}
                innerRadius={60}
                outerRadius={80}
              />
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </div>

        {/* Trends Over Time */}
        <div className="h-[300px] bg-gray-50 rounded-lg p-4">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={trends}>
              <XAxis dataKey="dates" />
              <YAxis
                label={{ value: 'Visits', angle: -90, position: 'insideLeft' }}
              />
              <Bar dataKey="data" fill="#1a365d" radius={[4, 4, 0, 0]} />
              <Tooltip />
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Top Sources Table */}
        <div className="col-span-2">
          <table className="w-full">
            <thead>
              <tr className="border-b border-gray-100">
                <th className="text-left py-4 px-4 text-sm font-medium text-gray-500">
                  Source
                </th>
                <th className="text-right py-4 px-4 text-sm font-medium text-gray-500">
                  Visits
                </th>
                <th className="text-right py-4 px-4 text-sm font-medium text-gray-500">
                  %
                </th>
              </tr>
            </thead>
            <tbody>
              {sources.map(source => (
                <tr
                  key={source.source}
                  className="group hover:bg-gray-50 border-b border-gray-100"
                >
                  <td className="py-3 px-4 text-gray-900">{source.source}</td>
                  <td className="text-right py-3 px-4 text-gray-600">
                    {source.visits.toLocaleString()}
                  </td>
                  <td className="text-right py-3 px-4 text-gray-600">
                    {source.percentage.toFixed(1)}%
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
