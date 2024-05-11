const PlannerIcon = ({ stroke }: { stroke?: string }) => {
  return (
    <svg
      width="19"
      height="19"
      viewBox="0 0 19 19"
      fill="none"
      xmlns="http://www.w3.org/2000/svg">
      <path
        d="M16.5376 10.3991V13C16.5376 15.7614 14.2991 18 11.5376 18H6.23764C3.47622 18 1.23764 15.7614 1.23764 13V7.79824C1.23764 5.03682 3.47622 2.79825 6.23764 2.79825H8.88764"
        stroke={stroke}
        strokeWidth="2"
        strokeLinecap="round"
      />
      <path
        d="M13.0674 2.41072C13.8503 1.6316 15.1202 1.63112 15.9038 2.40965L16.7389 3.23939C17.5158 4.01128 17.5239 5.26088 16.757 6.04263L11.1026 11.8068C10.5364 12.3841 9.75973 12.7095 8.94878 12.7095L7.93946 12.7095C7.08388 12.7094 6.40062 12.0008 6.4366 11.1508L6.48198 10.079C6.51368 9.33019 6.82691 8.62049 7.35969 8.09033L13.0674 2.41072Z"
        stroke={stroke}
        strokeWidth="2"
      />
      <path
        d="M12.058 3.53175L15.4698 6.92172"
        stroke={stroke}
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
};

export default PlannerIcon;
