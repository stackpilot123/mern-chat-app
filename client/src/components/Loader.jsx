import React from 'react'

const Loader = () => {
   const sizeClasses = {
    sm: 'w-8 h-8',
    md: 'w-12 h-12',
    lg: 'w-16 h-16',
    xl: 'w-20 h-20'
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/20 bg-opacity-75 backdrop-blur-sm">
      <div className="flex flex-col items-center space-y-4">
        {/* Spinning loader */}
        <div className={`w-16 h-16 border-4 border-gray-300 border-t-white rounded-full animate-spin`}></div>
        
        {/* Optional loading text */}
        <p className="text-white text-lg font-medium">Loading...</p>
      </div>
    </div>
  );
}

export default Loader
