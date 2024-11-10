import React from 'react';

export const PerformanceStatus: React.FC = () => {
  const [performance, setPerformance] = React.useState({
    score: 100,
    status: 'Optimal',
  });

  React.useEffect(() => {
    // Simple performance check - could be expanded
    const checkPerformance = () => {
      const timing = window.performance.timing;
      const loadTime = timing.loadEventEnd - timing.navigationStart;
      const score =
        loadTime < 1000 ? 100 : Math.max(0, 100 - Math.floor(loadTime / 100));

      setPerformance({
        score,
        status: score > 80 ? 'Optimal' : score > 50 ? 'Fair' : 'Poor',
      });
    };

    checkPerformance();
  }, []);

  return (
    <div className="flex items-center space-x-2 px-3 py-2 bg-white rounded-lg shadow-sm border border-gray-200">
      <div
        className={`h-2.5 w-2.5 rounded-full ${
          performance.score > 80
            ? 'bg-[#10b981]'
            : performance.score > 50
            ? 'bg-[#f59e0b]'
            : 'bg-[#ef4444]'
        }`}
      />
      <span className="text-sm font-medium text-gray-700">
        {performance.status}
      </span>
      <span className="text-xs text-gray-500">({performance.score}%)</span>
    </div>
  );
};
