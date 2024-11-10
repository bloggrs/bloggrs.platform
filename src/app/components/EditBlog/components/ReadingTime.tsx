import React from 'react';
import { Clock } from 'lucide-react';

interface ReadingTimeProps {
  content?: string;
  wordsPerMinute?: number;
}

export const ReadingTime: React.FC<ReadingTimeProps> = ({
  content = '',
  wordsPerMinute = 200,
}) => {
  const wordCount = content.trim().split(/\s+/).length;
  const minutes = Math.ceil(wordCount / wordsPerMinute);

  return (
    <span className="inline-flex items-center text-sm font-medium text-gray-500">
      <Clock className="w-4 h-4 mr-1.5" />
      {minutes} min read
    </span>
  );
};
