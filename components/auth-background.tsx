import React from 'react';

export default function AuthBackground() {
  return (
    <>
      {/* Clean, minimal background - just a subtle gradient overlay */}
      <div 
        className="pointer-events-none absolute left-0 top-0 -z-10 h-full w-full bg-gradient-to-b from-gray-50 to-white" 
        aria-hidden="true" 
      />
    </>
  );
} 