import React from 'react';
interface Comment {
  id: string;
  content: string;
  author: {
    name: string;
    email: string;
    ip: string;
  };
  post_id: string;
  parent_id?: string;
  status: 'pending' | 'approved' | 'spam' | 'trash';
  created_at: string;
  updated_at: string;
}

interface CommentFilters {
  post_id?: string;
  status?: 'pending' | 'approved' | 'spam' | 'trash';
  page?: number;
  limit?: number;
}

type ModerateAction = 'approve' | 'reject' | 'spam' | 'trash';

interface CommentSettings {
  moderation_enabled: boolean;
  allow_anonymous: boolean;
  max_nested_replies: number;
  notification_email?: string;
}

export const commentsApi = {
  // Fetch comments with filtering
  getComments: (filters: CommentFilters) => {},
  
  // Moderate comments
  approveComment: (id: string) => {},
  rejectComment: (id: string) => {},
  markAsSpam: (id: string) => {},
  
  // Reply management
  createReply: (parentId: string, content: string) => {},
  
  // Bulk actions
  bulkModerate: (ids: string[], action: ModerateAction) => {},
  
  // Settings
  updateSettings: (settings: CommentSettings) => {},
} 