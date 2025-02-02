import React from 'react';

const SimpleLoadingSpinner: React.FC = () => {
  return (
    <div className="fixed inset-0 flex items-center justify-center">
      <div className="relative">
        <div className="w-16 h-16 rounded-full border-4 border-yellow-200 border-t-transparent animate-spin" />
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="w-3 h-3 bg-yellow-200 rounded-full animate-pulse" />
        </div>
      </div>
    </div>
  );
};

export default SimpleLoadingSpinner;
