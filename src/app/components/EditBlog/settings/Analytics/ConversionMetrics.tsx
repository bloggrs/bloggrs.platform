import React from 'react';
import { Card, Progress, Tooltip } from 'antd';

interface ConversionGoal {
  id: string;
  name: string;
  target: number;
  current: number;
  conversionRate: number;
}

interface ConversionMetricsProps {
  goals: ConversionGoal[];
  performance: {
    daily: number;
    weekly: number;
    monthly: number;
  };
}

export const ConversionMetrics: React.FC<ConversionMetricsProps> = ({ goals, performance }) => {
  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
      <h3 className="text-2xl font-semibold text-gray-800 mb-6">Conversion Goals</h3>
      <div className="space-y-6">
        {goals.map((goal) => (
          <div key={goal.id} className="space-y-2">
            <div className="flex justify-between items-center">
              <div className="flex items-center">
                <span className="text-gray-400 mr-2">#{goal.id}</span>
                <span className="font-medium text-gray-900">{goal.name}</span>
              </div>
              <span className="text-sm text-gray-500">
                {goal.conversionRate.toFixed(1)}%
              </span>
            </div>
            <Progress 
              percent={(goal.current / goal.target) * 100} 
              status={goal.current >= goal.target ? "success" : "active"}
              format={() => `${goal.current}/${goal.target}`}
              strokeColor="#1a365d"
            />
          </div>
        ))}

        <div className="grid grid-cols-3 gap-6 pt-6">
          {Object.entries(performance).map(([period, value]) => (
            <div key={period} className="text-center p-4 bg-gray-50 rounded-lg border border-gray-100">
              <div className="text-sm text-gray-500 mb-1 capitalize">{period}</div>
              <div className="font-semibold text-gray-900">{value}%</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}; 