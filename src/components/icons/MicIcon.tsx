import { IIconProps } from "@/helpers/types";
import { cn } from "@/lib/utils";

const MicIcon = ({ className, ...props }: IIconProps) => {
  return (
    <svg
      viewBox="0 0 35 35"
      xmlns="http://www.w3.org/2000/svg"
      className={cn("w-5 h-5 fill-none stroke-[#6a6a6a] stroke-[3]", className)}
      {...props}>
      <rect
        x="13.125"
        y="4.375"
        width="8.75"
        height="16.0417"
        rx="4.375"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M27.7082 16.0415C27.7082 21.6794 23.1377 26.2498 17.4998 26.2498C11.8619 26.2498 7.2915 21.6794 7.2915 16.0415"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M17.5 26.25V30.625"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
};

export default MicIcon;
