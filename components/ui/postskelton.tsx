import React from 'react';

const PostLoadingSkeleton: React.FC = () => {
  return (
    <div className="max-w-md mx-auto bg-white shadow-md rounded-lg overflow-hidden mb-8 animate-pulse">
      {/* User info skeleton */}
      <div className="flex items-center p-4">
        <div className="w-10 h-10 bg-gray-300 rounded-full"></div>
        <div className="ml-3 flex-grow">
          <div className="h-4 bg-gray-300 rounded w-1/4"></div>
          <div className="h-3 bg-gray-300 rounded w-1/5 mt-1"></div>
        </div>
      </div>

      {/* Image skeleton */}
      <div className="w-full h-96 bg-gray-300"></div>

      {/* Action buttons skeleton */}
      <div className="p-4">
        <div className="flex space-x-4">
          <div className="w-8 h-8 bg-gray-300 rounded-full"></div>
          <div className="w-8 h-8 bg-gray-300 rounded-full"></div>
          <div className="w-8 h-8 bg-gray-300 rounded-full"></div>
        </div>
      </div>

      {/* Caption skeleton */}
      <div className="px-4 pb-4">
        <div className="h-4 bg-gray-300 rounded w-3/4"></div>
        <div className="h-4 bg-gray-300 rounded w-1/2 mt-2"></div>
      </div>
    </div>
  );
};

export default PostLoadingSkeleton;

