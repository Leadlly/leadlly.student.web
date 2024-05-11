const AttachIcon= ({
    stroke,
    width = "15",
    height = "27",
  }: {
    stroke: string;
    width?: string;
    height?: string;
  }) => {
      return (
        <svg width={width} height={height} viewBox="0 0 19 31" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M17 11L17 20C17 24.9706 13.6421 29 9.5 29C5.35786 29 2 24.9706 2 20L2 8C2 4.68629 4.23858 2 7 2C9.76142 2 12 4.68629 12 8L12 20C12 21.6569 10.8807 23 9.5 23C8.11929 23 7 21.6569 7 20L7 8" stroke={stroke} stroke-width="3" stroke-linecap="round" stroke-linejoin="round"/>
        </svg>
    );
  };
  
  export default AttachIcon;