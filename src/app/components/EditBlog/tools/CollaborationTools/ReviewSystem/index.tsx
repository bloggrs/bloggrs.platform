import React, { useState } from 'react';
import { Badge, Button, Card, Select, Input } from 'antd';

interface Review {
  id: string;
  title: string;
  content: string;
  status: 'pending' | 'approved' | 'rejected';
  assignedTo?: string;
  comments?: string[];
}

interface ReviewSystemProps {
  pendingReviews: Review[];
  reviewers: { id: string; name: string }[];
  onReviewComplete: (review: Review) => void;
}

export const ReviewSystem: React.FC<ReviewSystemProps> = ({
  pendingReviews,
  reviewers,
  onReviewComplete,
}) => {
  const [activeReviewId, setActiveReviewId] = useState<string | null>(null);
  const [comments, setComments] = useState<{ [key: string]: string }>({});

  const handleReviewAction = (
    review: Review,
    status: 'approved' | 'rejected',
  ) => {
    const comment = comments[review.id] || '';

    onReviewComplete({
      ...review,
      status,
      comments: [...(review.comments || []), comment],
    });

    setActiveReviewId(null);
    setComments(prev => {
      const newComments = { ...prev };
      delete newComments[review.id];
      return newComments;
    });
  };

  return (
    <div className="max-w-5xl mx-auto">
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <h3 className="text-2xl font-semibold text-gray-800">
          Content Reviews
        </h3>
        <div className="flex items-center space-x-4">
          <button className="px-4 py-2 bg-[#f4a261] hover:bg-[#e76f51] text-white rounded-lg transition-colors">
            New Review
          </button>
        </div>
      </div>

      {/* Reviews List */}
      <div className="space-y-4">
        {pendingReviews.map(review => (
          <Card
            key={review.id}
            className="bg-white rounded-xl shadow-sm border border-gray-200 hover:shadow-md transition-all"
          >
            <div className="flex justify-between items-start p-6">
              <div className="space-y-2">
                <div className="flex items-center space-x-2">
                  <span className="text-gray-400">#{review.id}</span>
                  <h4 className="font-medium text-lg text-gray-900">
                    {review.title}
                  </h4>
                </div>
                <p className="text-gray-600">
                  {review.content.substring(0, 100)}...
                </p>
              </div>
              <Badge
                className={`${
                  review.status === 'pending'
                    ? 'bg-yellow-100 text-yellow-800'
                    : review.status === 'approved'
                    ? 'bg-green-100 text-green-800'
                    : 'bg-red-100 text-red-800'
                } px-3 py-1 rounded-full text-sm font-medium`}
              >
                {review.status}
              </Badge>
            </div>

            {!review.assignedTo && (
              <div className="px-6 pb-4">
                <Select
                  className="w-full"
                  options={reviewers.map(r => ({ value: r.id, label: r.name }))}
                  onChange={id =>
                    onReviewComplete({ ...review, assignedTo: id })
                  }
                  placeholder="Assign reviewer"
                />
              </div>
            )}

            {review.status === 'pending' && (
              <div className="border-t border-gray-100 px-6 py-4 space-y-4">
                <Input.TextArea
                  value={comments[review.id] || ''}
                  onChange={e =>
                    setComments(prev => ({
                      ...prev,
                      [review.id]: e.target.value,
                    }))
                  }
                  placeholder="Add review comments..."
                  className="w-full border-gray-200 rounded-lg focus:ring-[#1a365d] focus:border-[#1a365d]"
                />
                <div className="flex gap-3">
                  <Button
                    onClick={() => handleReviewAction(review, 'approved')}
                    type="primary"
                    className="bg-[#f4a261] hover:bg-[#e76f51] border-none"
                  >
                    Approve
                  </Button>
                  <Button
                    onClick={() => handleReviewAction(review, 'rejected')}
                    className="border-red-500 text-red-500 hover:bg-red-50"
                  >
                    Reject
                  </Button>
                </div>
              </div>
            )}
          </Card>
        ))}
      </div>
    </div>
  );
};
