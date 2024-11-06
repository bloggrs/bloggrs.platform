import React from 'react';
import { ShieldX } from 'lucide-react';
import { Link } from 'react-router-dom';

interface NotAuthorizedProps {
  message?: string;
  showHomeButton?: boolean;
  showBackButton?: boolean;
}

export const NotAuthorized: React.FC<NotAuthorizedProps> = ({
  message = "You don't have permission to access this page.",
  showHomeButton = true,
  showBackButton = true,
}) => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-6 px-4 sm:py-12 sm:px-6 lg:px-8">
      <div className="max-w-lg w-full space-y-8 text-center">
        <div>
          <ShieldX className="mx-auto h-12 w-12 sm:h-16 sm:w-16 text-[#1a365d]" />
          <h2 className="mt-6 text-3xl font-bold text-gray-800">
            Not Authorized
          </h2>
          <p className="mt-3 text-base text-gray-500">{message}</p>
        </div>

        <div className="flex flex-col sm:flex-row justify-center space-y-3 sm:space-y-0 sm:space-x-4">
          {showBackButton && (
            <button
              onClick={() => window.history.back()}
              className="inline-flex items-center justify-center px-4 py-2 border border-gray-200 shadow-sm text-sm font-medium rounded-lg text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#1a365d]"
            >
              Go Back
            </button>
          )}

          {showHomeButton && (
            <Link
              to="/"
              className="inline-flex items-center justify-center px-4 py-2 border border-transparent text-sm font-medium rounded-lg text-white bg-[#f4a261] hover:bg-[#e76f51] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#f4a261] transition-colors"
            >
              Go to Home
            </Link>
          )}
        </div>

        <div className="text-sm text-gray-500">
          If you believe this is a mistake, please contact your administrator.
        </div>
      </div>
    </div>
  );
};
