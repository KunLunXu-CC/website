import { memo } from 'react';

const AppLoading = () => {
  return (
    <div className="size-full bg-[#191a22]/80 backdrop-blur-2xl flex items-center justify-center">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        className="w-1/2"
        viewBox="0 0 300 150">
        <path
          fill="none"
          opacity="0.1"
          stroke="#ffffff"
          stroke-width="15"
          stroke-linecap="round"
          stroke-dashoffset="0"
          stroke-dasharray="300 385"
          d="M275 75c0 31-27 50-50 50-58 0-92-100-150-100-28 0-50 22-50 50s23 50 50 50c58 0 92-100 150-100 24 0 50 19 50 50Z">
          <animate
            dur="3"
            calcMode="spline"
            values="685;-685"
            keySplines="0 0 1 1"
            repeatCount="indefinite"
            attributeName="stroke-dashoffset"
          />
        </path>
      </svg>
    </div>
  );
};

export default memo(AppLoading);
