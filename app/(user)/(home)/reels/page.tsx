'use client'
import { useState, useEffect } from "react";

const ReelsComponent = ({ reels }:any) => {
  const [currentReel, setCurrentReel] = useState(0);

  const handleScroll = () => {
    const reelElements = document.querySelectorAll('.reel');
    reelElements.forEach((reel, index) => {
      const rect = reel.getBoundingClientRect();
      if (rect.top >= 0 && rect.bottom <= window.innerHeight) {
        setCurrentReel(index);
      }
    });
  };

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <div className="flex justify-center items-center h-screen overflow-y-scroll no-scrollbar">
      <div className="reel-container">
        {reels && reels.map((reel:any, index:number) => (
          <div
            key={index}
            className={`reel relative h-screen w-full flex justify-center items-center ${index === currentReel ? 'current-reel' : ''
              }`}
          >
            <video
              className="h-full w-auto object-cover"
              src={reel.videoUrl}
              autoPlay
              muted
              loop
            ></video>
            <div className="absolute bottom-16 left-4 text-white">
              <div className="flex items-center space-x-2">
                <img
                  className="w-10 h-10 rounded-full"
                  src={reel.userProfileImage}
                  alt="Profile"
                />
                <div>
                  <h3 className="font-semibold">{reel.username}</h3>
                  <p className="text-sm">{reel.description}</p>
                </div>
              </div>
              <div className="mt-4 flex space-x-4">
                <button className="text-white">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth="2"
                    stroke="currentColor"
                    className="w-6 h-6"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M5 12l4-4m0 0l4 4m-4-4v12"
                    />
                  </svg>
                </button>
                <button className="text-white">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth="2"
                    stroke="currentColor"
                    className="w-6 h-6"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M12 20.5c4.418 0 8-3.582 8-8s-3.582-8-8-8-8 3.582-8 8 3.582 8 8 8zM5.636 6.364l.707.707m10.607 10.607l.707.707M5.636 17.636l.707-.707m10.607-10.607l.707-.707M12 3v1m0 16v1m8-8h-1M4 12H3"
                    />
                  </svg>
                </button>
              </div>
            </div>
            <div className="absolute right-4 top-1/2 transform -translate-y-1/2 text-white space-y-4">
              <button className="flex flex-col items-center">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth="2"
                  stroke="currentColor"
                  className="w-6 h-6"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M5.636 6.364a9 9 0 1112.728 0M12 3v6M3 12h18"
                  />
                </svg>
                <span>{reel.likes}</span>
              </button>
              <button className="flex flex-col items-center">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth="2"
                  stroke="currentColor"
                  className="w-6 h-6"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M5 12l4 4m0 0l4-4m-4 4V3"
                  />
                </svg>
                <span>{reel.comments}</span>
              </button>
              <button className="flex flex-col items-center">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth="2"
                  stroke="currentColor"
                  className="w-6 h-6"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M17 10.5V7a5 5 0 00-10 0v3.5"
                  />
                </svg>
                <span>Share</span>
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ReelsComponent;
