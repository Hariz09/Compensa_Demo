// components/LoadingSkeleton.tsx
import React from 'react';

export const CardSkeleton = () => (
  <div className="bg-gray-800 p-6 rounded-lg animate-pulse">
    <div className="h-6 w-48 bg-gray-700 rounded mb-2"></div>
    <div className="h-8 w-32 bg-gray-700 rounded"></div>
  </div>
);

export const ChartSkeleton = () => (
  <div className="bg-gray-800 p-6 rounded-lg mb-8 animate-pulse">
    <div className="h-6 w-48 bg-gray-700 rounded mb-4"></div>
    <div className="h-[300px] bg-gray-700 rounded"></div>
  </div>
);

export const TableSkeleton = () => (
  <div className="bg-gray-800 p-6 rounded-lg mb-8 animate-pulse">
    <div className="flex justify-between items-center mb-4">
      <div className="h-6 w-48 bg-gray-700 rounded"></div>
      <div className="flex items-center">
        <div className="h-10 w-32 bg-gray-700 rounded mr-4"></div>
        <div className="h-10 w-40 bg-gray-700 rounded"></div>
      </div>
    </div>
    <div className="flex mb-4">
      <div className="h-10 w-full bg-gray-700 rounded"></div>
    </div>
    <div className="space-y-4">
      {[...Array(5)].map((_, i) => (
        <div key={i} className="h-12 bg-gray-700 rounded"></div>
      ))}
    </div>
  </div>
);

const LoadingSkeleton = () => {
  return (
    <div className="min-h-screen bg-gray-900 text-white p-8">
      <div className="h-12 w-64 bg-gray-800 rounded mb-8 animate-pulse"></div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
        <CardSkeleton />
        <CardSkeleton />
      </div>

      <ChartSkeleton />
      <TableSkeleton />
    </div>
  );
};

export default LoadingSkeleton;