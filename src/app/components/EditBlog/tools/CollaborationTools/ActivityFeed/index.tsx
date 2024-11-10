import React from 'react';

interface Activity {
  id: string;
  type: 'edit' | 'comment' | 'review' | 'role_change';
  user: {
    name: string;
    avatar?: string;
  };
  timestamp: Date;
  description: string;
}

interface ActivityFeedProps {
  activities: Activity[];
  filters: string[];
}

export const ActivityFeed: React.FC<ActivityFeedProps> = ({
  activities,
  filters,
}) => {
  const [activeFilters, setActiveFilters] = React.useState<string[]>([]);

  const filteredActivities = activities.filter(
    activity =>
      activeFilters.length === 0 || activeFilters.includes(activity.type),
  );

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200">
      <div className="p-6">
        <h3 className="text-2xl font-semibold text-gray-800 mb-6">
          Activity Feed
        </h3>

        <div className="flex flex-wrap gap-3 mb-6">
          {filters.map(filter => (
            <button
              key={filter}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                activeFilters.includes(filter)
                  ? 'bg-[#1a365d] text-white hover:bg-[#2a466d]'
                  : 'bg-gray-100 hover:bg-gray-200 text-gray-700'
              }`}
              onClick={() =>
                setActiveFilters(prev =>
                  prev.includes(filter)
                    ? prev.filter(f => f !== filter)
                    : [...prev, filter],
                )
              }
            >
              {filter}
            </button>
          ))}
        </div>

        <div className="space-y-4">
          {filteredActivities.map(activity => (
            <div
              key={activity.id}
              className="p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors group"
            >
              <div className="flex items-center gap-3">
                {activity.user.avatar && (
                  <img
                    src={activity.user.avatar}
                    alt={activity.user.name}
                    className="w-8 h-8 rounded-full"
                  />
                )}
                <span className="font-medium text-gray-900">
                  {activity.user.name}
                </span>
                <span className="text-gray-500 text-sm">
                  {new Date(activity.timestamp).toLocaleDateString()}
                </span>
              </div>
              <p className="mt-2 text-gray-600">{activity.description}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
