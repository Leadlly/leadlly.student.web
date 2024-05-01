const UpArrowIcon = ({ stroke }: { stroke: string | undefined }) => {
  return (
    <svg
      width="6"
      height="4"
      viewBox="0 0 6 4"
      fill="none"
      xmlns="http://www.w3.org/2000/svg">
      <path
        d="M2.75377 0.405041C2.95221 0.193401 3.28852 0.194526 3.48554 0.407488L5.80218 2.9116C6.09891 3.23234 5.87042 3.75261 5.43349 3.75115L0.783508 3.7356C0.346572 3.73413 0.121574 3.21235 0.420435 2.8936L2.75377 0.405041Z"
        fill={stroke}
      />
    </svg>
  );
};

export default UpArrowIcon;
