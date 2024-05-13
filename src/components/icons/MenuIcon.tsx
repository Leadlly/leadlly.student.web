const MenuIcon= ({
    stroke,
    width = "21",
    height = "19",
  }: {
    stroke: string;
    width?: string;
    height?: string;
  }) => {
      return (
        <svg width={width} height={height} viewBox="0 0 8 32" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M2.0791 27.4513C2.0791 28.5048 2.941 29.3589 4.0042 29.3589C5.06741 29.3589 5.92931 28.5048 5.92931 27.4513C5.92931 26.3977 5.06741 25.5436 4.0042 25.5436C2.941 25.5436 2.0791 26.3977 2.0791 27.4513Z" stroke={stroke} stroke-width="3.85714" stroke-linecap="round" stroke-linejoin="round"/>
        <path d="M2.0791 16.0056C2.0791 17.0591 2.941 17.9132 4.0042 17.9132C5.06741 17.9132 5.92931 17.0591 5.92931 16.0056C5.92931 14.9521 5.06741 14.098 4.0042 14.098C2.941 14.098 2.0791 14.9521 2.0791 16.0056Z" stroke={stroke} stroke-width="3.85714" stroke-linecap="round" stroke-linejoin="round"/>
        <path d="M2.0791 4.55995C2.0791 5.6135 2.941 6.46756 4.0042 6.46756C5.06741 6.46756 5.92931 5.6135 5.92931 4.55995C5.92931 3.50641 5.06741 2.65234 4.0042 2.65234C2.941 2.65234 2.0791 3.50641 2.0791 4.55995Z" stroke={stroke} stroke-width="3.85714" stroke-linecap="round" stroke-linejoin="round"/>
        </svg>
    );
  };
  
  export default MenuIcon;