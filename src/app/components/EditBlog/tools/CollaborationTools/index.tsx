import React from 'react';
import { RoleManager } from './RoleManager/index';
import { ReviewSystem } from './ReviewSystem/index';
import { CommunicationHub } from './CommunicationHub/index';
import { ActivityFeed } from './ActivityFeed/';

interface CollaborationFeatures {
  availableRoles: any[];
  pendingReviews: any[];
  communicationThreads: any[];
  recentActivities: any[];
  activityFilters: any[];
}

interface TeamMember {
  id: string;
  name: string;
  email: string;
  role: {
    id: string;
    name: string;
    permissions: string[];
    color?: string;
  };
  canReview?: boolean;
}

interface CollaborationToolsProps {
  team: TeamMember[];
  onUpdate: (team: TeamMember[]) => void;
  features: CollaborationFeatures;
}

export const CollaborationTools: React.FC<CollaborationToolsProps> = ({ team, onUpdate, features }) => {
  const handleReviewComplete = (review: any) => {
    // TODO: Implement review completion logic
    console.log('Review completed:', review);
  };

  const handleNewMessage = (message: any) => {
    // TODO: Implement message handling logic
    console.log('New message:', message);
  };

  return (
    <div className="flex-1 p-8 bg-gray-50">
      <div className="max-w-5xl mx-auto">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center space-x-4">
            <h1 className="text-2xl font-semibold text-gray-800">Collaboration Tools</h1>
          </div>
        </div>

        {/* Main Content */}
        <div className="space-y-6">
          <div className="grid gap-6 md:grid-cols-2">
            {/* Role Manager Card */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
              <h2 className="text-lg font-medium text-gray-900 mb-4">Role Management</h2>
              <RoleManager
                members={team}
                roles={features.availableRoles}
                onUpdate={onUpdate}
              />
            </div>

            {/* Review System Card */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
              <h2 className="text-lg font-medium text-gray-900 mb-4">Review System</h2>
              <ReviewSystem
                pendingReviews={features.pendingReviews}
                reviewers={team.filter(m => m.canReview)}
                onReviewComplete={handleReviewComplete}
              />
            </div>
          </div>

          <div className="grid gap-6 md:grid-cols-2">
            {/* Communication Hub Card */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
              <h2 className="text-lg font-medium text-gray-900 mb-4">Communication</h2>
              <CommunicationHub
                threads={features.communicationThreads}
                members={team}
                onNewMessage={handleNewMessage}
              />
            </div>

            {/* Activity Feed Card */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
              <h2 className="text-lg font-medium text-gray-900 mb-4">Activity Feed</h2>
              <ActivityFeed
                activities={features.recentActivities}
                filters={features.activityFilters}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}; 