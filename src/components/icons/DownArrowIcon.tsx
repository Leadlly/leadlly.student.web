const DownArrowIcon = ({ stroke }: { stroke: string }) => {
  return (
    <svg
      width="7"
      height="4"
      viewBox="0 0 7 4"
      fill="none"
      xmlns="http://www.w3.org/2000/svg">
      <path
        d="M3.91536 3.60289C3.71793 3.80837 3.38895 3.80756 3.19255 3.6011L0.804919 1.0912C0.501618 0.772368 0.728386 0.245486 1.16844 0.246579L5.95624 0.258471C6.39629 0.259564 6.62042 0.787566 6.31552 1.10489L3.91536 3.60289Z"
        fill={stroke}
      />
    </svg>
  );
};

export default DownArrowIcon;
