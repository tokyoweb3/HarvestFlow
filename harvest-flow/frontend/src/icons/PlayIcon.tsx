import React from "react";

const PlayIcon: React.FC = () => {
  return (
    <svg
      width="100%"
      height="100%"
      viewBox="0 0 84 84"
      xmlns="http://www.w3.org/2000/svg"
    >
      <defs>
        <clipPath id="clipPath">
          <path d="M35.2798 28.5607L55.4398 42.0007L35.2798 55.4407V28.5607Z" />
        </clipPath>
      </defs>

      <circle cx="42" cy="42" r="41" fill="red" stroke="white" />

      <g clipPath="url(#clipPath)">
        <circle cx="42" cy="42" r="41" fill="white" />
      </g>
    </svg>
  );
};

export default PlayIcon;
