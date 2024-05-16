import { IIconProps } from "@/helpers/types";
import { cn } from "@/lib/utils";

const SentIcon = ({ className, ...props }: IIconProps) => {
  return (
    <svg width="242" height="241" viewBox="0 0 242 241" fill="none" xmlns="http://www.w3.org/2000/svg">
    <g filter="url(#filter0_f_1846_3659)">
    <circle cx="120.855" cy="120.474" r="45.4738" fill="#9654F4" fill-opacity="0.74"/>
    </g>
    <circle cx="120.855" cy="120.474" r="45.4738" fill="#9654F4"/>
    <path d="M101.544 120.682L114.834 133.972L141.411 107.392" stroke="white" stroke-width="6.26501" stroke-linecap="round" stroke-linejoin="round"/>
    <defs>
    <filter id="filter0_f_1846_3659" x="0.380272" y="-0.000587463" width="240.948" height="240.949" filterUnits="userSpaceOnUse" color-interpolation-filters="sRGB">
    <feFlood flood-opacity="0" result="BackgroundImageFix"/>
    <feBlend mode="normal" in="SourceGraphic" in2="BackgroundImageFix" result="shape"/>
    <feGaussianBlur stdDeviation="37.5003" result="effect1_foregroundBlur_1846_3659"/>
    </filter>
    </defs>
    </svg>
  );
};

export default SentIcon;
