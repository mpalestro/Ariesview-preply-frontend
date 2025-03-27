import React from 'react';
import Image from "next/image";

// Change from importing SVG as module to using a string path
// import Stripes from "@/public/images/stripes.svg";

export default function PageIllustration() {
  return (
    <>
      {/* Stripes illustration */}
      <div
        className="pointer-events-none absolute left-1/2 top-0 -z-10 -translate-x-1/2 transform"
        aria-hidden="true"
      >
        {/* Use a div with background image as fallback if Image component fails */}
        <div 
          style={{
            width: '768px',
            height: '420px',
            backgroundImage: 'url(/images/stripes.svg)',
            backgroundSize: 'contain',
            backgroundRepeat: 'no-repeat',
            backgroundPosition: 'center',
          }}
        />
      </div>
      {/* Circles */}
      <div
        className="pointer-events-none absolute -top-32 left-1/2 ml-[580px] -translate-x-1/2"
        aria-hidden="true"
      >
        <div className="h-80 w-80 rounded-full bg-linear-to-tr from-blue-500 opacity-50 blur-[160px]" />
      </div>
      <div
        className="pointer-events-none absolute left-1/2 top-[420px] ml-[380px] -translate-x-1/2"
        aria-hidden="true"
      >
        <div className="h-80 w-80 rounded-full bg-linear-to-tr from-blue-500 to-gray-900 opacity-50 blur-[160px]" />
      </div>
      <div
        className="pointer-events-none absolute left-1/2 top-[640px] -ml-[300px] -translate-x-1/2"
        aria-hidden="true"
      >
        <div className="h-80 w-80 rounded-full bg-linear-to-tr from-blue-500 to-gray-900 opacity-50 blur-[160px]" />
      </div>
    </>
  );
}
