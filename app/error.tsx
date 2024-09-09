// pages/404.js
"use client";
import React from "react";

function Custom404() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-black text-white">
      <div className="relative w-52 h-52 mb-8">
        {/* Eyes Container */}
        <div className="absolute inset-0 flex justify-center items-center">
          {/* Left Eye */}
          <div className="relative w-24 h-24 bg-white rounded-full">
            <div className="absolute w-6 h-6 bg-black rounded-full top-8 left-12 animate-eye"></div>
          </div>
          {/* Right Eye */}
          <div className="relative w-24 h-24 bg-white rounded-full ml-4">
            <div className="absolute w-6 h-6 bg-black rounded-full top-8 left-8 animate-eye"></div>
          </div>
        </div>
      </div>
      {/* Error Text */}
      <div className="text-7xl font-extrabold mb-2">404</div>
      <div className="text-2xl">Got lost?</div>
    </div>
  );
}

export default Custom404;
