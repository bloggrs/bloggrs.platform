import React from 'react';

interface PublishSettingsProps {
  isPublic: boolean;
  onPublishChange: (isPublic: boolean) => void;
  scheduledDate?: Date;
  onScheduleChange?: (date: Date | null) => void;
}

export const PublishSettings: React.FC<PublishSettingsProps> = ({
  isPublic,
  onPublishChange,
  scheduledDate,
  onScheduleChange,
}) => {
  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
      <div className="space-y-6">
        <div className="flex items-center">
          <input
            type="checkbox"
            checked={isPublic}
            onChange={e => onPublishChange(e.target.checked)}
            className="rounded border-gray-300 text-[#1a365d] focus:ring-[#1a365d] h-4 w-4"
          />
          <span className="ml-3 text-sm font-medium text-gray-900">
            Make this post public
          </span>
        </div>

        {onScheduleChange && (
          <div className="space-y-2">
            <label className="block text-sm font-medium text-gray-700">
              Schedule Publication
            </label>
            <input
              type="datetime-local"
              value={scheduledDate?.toISOString().slice(0, 16)}
              onChange={e =>
                onScheduleChange(
                  e.target.value ? new Date(e.target.value) : null,
                )
              }
              className="mt-1 block w-full rounded-lg border-gray-300 shadow-sm focus:border-[#1a365d] focus:ring-[#1a365d] sm:text-sm"
            />
          </div>
        )}
      </div>
    </div>
  );
};
