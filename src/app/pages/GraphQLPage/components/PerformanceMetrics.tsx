import React from 'react';

interface MetricsProps {
  data: any[];
}

export const PerformanceMetrics: React.FC<MetricsProps> = ({ data }) => {
  return (
    <div className="grid grid-cols-2 gap-4">
      <div className="h-80 bg-white rounded-lg p-4">
        <h3 className="text-lg font-medium mb-4">Response Times</h3>
        <div className="overflow-auto h-64">
          <table className="min-w-full">
            <thead>
              <tr>
                <th>Timestamp</th>
                <th>Duration (ms)</th>
              </tr>
            </thead>
            <tbody>
              {data.map((d, i) => (
                <tr key={i}>
                  <td>{new Date(d.timestamp).toLocaleString()}</td>
                  <td>{d.duration}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
      <div className="h-80 bg-white rounded-lg p-4">
        <h3 className="text-lg font-medium mb-4">Query Complexity</h3>
        <div className="overflow-auto h-64">
          <table className="min-w-full">
            <thead>
              <tr>
                <th>Operation</th>
                <th>Complexity</th>
              </tr>
            </thead>
            <tbody>
              {data.map((d, i) => (
                <tr key={i}>
                  <td>{d.operation}</td>
                  <td>{d.complexity}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}; 