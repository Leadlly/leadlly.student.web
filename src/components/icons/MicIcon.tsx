const MicIcon= ({
    stroke,
    width = "35",
    height = "35",
  }: {
    stroke: string;
    width?: string;
    height?: string;
  }) => {
      return (
        <svg width={width} height={height} viewBox="0 0 35 35" fill="none" xmlns="http://www.w3.org/2000/svg">
        <rect x="13.125" y="4.375" width="8.75" height="16.0417" rx="4.375" stroke={stroke} stroke-width="2.91667" stroke-linecap="round" stroke-linejoin="round"/>
        <path d="M27.7082 16.0415C27.7082 21.6794 23.1377 26.2498 17.4998 26.2498C11.8619 26.2498 7.2915 21.6794 7.2915 16.0415" stroke={stroke} stroke-width="2.91667" stroke-linecap="round" stroke-linejoin="round"/>
        <path d="M17.5 26.25V30.625" stroke={stroke} stroke-width="2.91667" stroke-linecap="round" stroke-linejoin="round"/>
        </svg>
    );
  };
  
  export default MicIcon;