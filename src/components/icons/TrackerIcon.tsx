"use client";

const TrackerIcon = ({ stroke }: { stroke: string }) => {
  return (
    <svg
      width="20"
      height="19"
      viewBox="0 0 20 19"
      fill="none"
      xmlns="http://www.w3.org/2000/svg">
      <path
        d="M2.47409 1.04361L17.5636 5.68665C18.3866 5.9399 18.4802 7.0674 17.71 7.4525L11.3146 10.6502C11.1299 10.7426 10.9801 10.8924 10.8877 11.0771L7.69021 17.4723C7.30511 18.2425 6.17784 18.1491 5.9246 17.3261L1.28123 2.23618C1.0559 1.50381 1.74174 0.818265 2.47409 1.04361Z"
        stroke={stroke}
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
};

export default TrackerIcon;
