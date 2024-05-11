const DashboardIcon = ({ stroke }: { stroke?: string }) => {
  return (
    <svg
      width="20"
      height="19"
      viewBox="0 0 20 19"
      fill="none"
      xmlns="http://www.w3.org/2000/svg">
      <rect
        x="1.23764"
        y="1"
        width="7"
        height="7"
        rx="2.5"
        stroke={stroke}
        strokeWidth="2"
      />
      <rect
        x="1.23764"
        y="11"
        width="7"
        height="7"
        rx="2.5"
        stroke={stroke}
        strokeWidth="2"
      />
      <rect
        x="11.2376"
        y="1"
        width="7"
        height="7"
        rx="2.5"
        stroke={stroke}
        strokeWidth="2"
      />
      <rect
        x="11.2376"
        y="11"
        width="7"
        height="7"
        rx="2.5"
        stroke={stroke}
        strokeWidth="2"
      />
    </svg>
  );
};

export default DashboardIcon;
