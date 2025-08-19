import React from "react";

const MathIcons = ({ stroke = "#818080" }: { stroke?: string }) => {
  return (
    <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
      <path
        d="M4 5.5H7.5M10.75 11H14.25M10.75 13.5H14.25M3.75 12.25H7.75M5.75 14.25V10.25M11.1001 4L13.9285 6.82843M11.1001 6.82861L13.9285 4.00019M3 1H15C16.1046 1 17 1.89543 17 3V15C17 16.1046 16.1046 17 15 17H3C1.89543 17 1 16.1046 1 15V3C1 1.89543 1.89543 1 3 1Z"
        stroke={stroke}
        strokeWidth="1.51111"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
};

export default MathIcons;
