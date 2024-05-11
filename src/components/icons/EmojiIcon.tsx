const EmojiIcon= ({
    stroke,
    width = "21",
    height = "19",
  }: {
    stroke: string;
    width?: string;
    height?: string;
  }) => {
      return (
        <svg width={width} height={height} viewBox="0 0 31 30" fill="none" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
        <rect {width} height={height} fill="url(#pattern0_1672_3660)" fill-opacity="0.7"/>
        <defs>
        <pattern id="pattern0_1672_3660" patternContentUnits="objectBoundingBox" width="1" height="1">
        <use xlink:href="#image0_1672_3660" transform="matrix(0.0107527 0 0 0.0111111 0.016129 0)"/>
        </pattern>
        <image id="image0_1672_3660" width="90" height="90" xlink:href="data:image/png;base64,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"/>
        </defs>
        </svg>
    );
  };
  
  export default EmojiIcon;