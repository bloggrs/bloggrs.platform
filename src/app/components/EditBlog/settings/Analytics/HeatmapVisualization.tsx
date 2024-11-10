import React from 'react';
import heatmap from 'heatmap.js';

interface HeatmapVisualizationProps {
  clicks?: { x: number; y: number; value: number }[];
  scroll?: { depth: number; frequency: number }[];
  attention?: { element: string; duration: number }[];
}

export const HeatmapVisualization: React.FC<HeatmapVisualizationProps> = ({
  clicks = [],
  scroll = [],
  attention = [],
}) => {
  const containerRef = React.useRef<HTMLDivElement>(null);

  React.useEffect(() => {
    if (!containerRef.current) return;

    const heatmapInstance = heatmap.create({
      container: containerRef.current,
      radius: 50,
      maxOpacity: 0.6,
    });

    // Convert click data to heatmap points
    const points = clicks.map(({ x, y, value }) => ({
      x,
      y,
      value: Math.min(value, 100), // Normalize values to 0-100
    }));

    heatmapInstance.setData({ max: 100, data: points });

    return () => {
      heatmapInstance.remove();
    };
  }, [clicks]);

  return (
    <div className="space-y-6">
      <h3 className="text-2xl font-semibold text-gray-800">
        User Interaction Analytics
      </h3>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div
          ref={containerRef}
          className="h-[400px] bg-white rounded-xl shadow-sm border border-gray-200"
        />

        <div className="space-y-6">
          <div className="p-6 bg-white rounded-xl shadow-sm border border-gray-200">
            <h4 className="text-lg font-medium text-gray-800 mb-4">
              Scroll Depth
            </h4>
            {scroll.map(({ depth, frequency }, i) => (
              <div key={i} className="flex justify-between items-center mb-3">
                <span className="text-gray-600">{depth}%</span>
                <div className="w-2/3 bg-gray-100 rounded-full">
                  <div
                    className="bg-[#f4a261] rounded-full h-2 transition-all"
                    style={{ width: `${frequency}%` }}
                  />
                </div>
              </div>
            ))}
          </div>

          <div className="p-6 bg-white rounded-xl shadow-sm border border-gray-200">
            <h4 className="text-lg font-medium text-gray-800 mb-4">
              Attention Hotspots
            </h4>
            {attention.map(({ element, duration }, i) => (
              <div key={i} className="flex justify-between items-center mb-3">
                <span className="text-gray-600">{element}</span>
                <span className="font-medium text-[#1a365d]">
                  {Math.round(duration)}s
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
