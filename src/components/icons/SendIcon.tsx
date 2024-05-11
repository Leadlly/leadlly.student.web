const SendIcon = ({
    stroke,
    width = "29",
    height = "29",
  }: {
    stroke: string;
    width?: string;
    height?: string;
  }) => {
      return (
        <svg width={width} height={height} viewBox="0 0 29 29" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M6.21973 2.4725L25.4635 11.588C27.9206 12.7519 27.9206 16.2482 25.4635 17.412L6.21972 26.5275C3.93977 27.6075 1.35922 25.767 1.63782 23.2596L2.61111 14.5L1.63782 5.74038C1.35922 3.23301 3.93978 1.39253 6.21973 2.4725Z" fill="white"/>
        <path d="M2.61111 14.5L1.63782 5.74038C1.35922 3.23301 3.93978 1.39253 6.21973 2.4725L25.4635 11.588C27.9206 12.7519 27.9206 16.2482 25.4635 17.412L6.21972 26.5275C3.93977 27.6075 1.35922 25.767 1.63782 23.2596L2.61111 14.5ZM2.61111 14.5H10" stroke={stroke} stroke-width="3.22222" stroke-linecap="round" stroke-linejoin="round"/>
        </svg>
    );
  };
  
  export default SendIcon;