"use client";

const LeftArrowIcon = ({ stroke }: { stroke: string }) => {
  return (
    <svg
      width="7"
      height="12"
      viewBox="0 0 7 12"
      fill="none"
      xmlns="http://www.w3.org/2000/svg">
      <path
        d="M6 1L1 6L6 11"
        stroke={stroke}
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
};

export default LeftArrowIcon;
