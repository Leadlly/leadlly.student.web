import { IIconProps } from "@/helpers/types";
import { cn } from "@/lib/utils";

const OneOnOneMeetingIcon = ({ className, ...props }: IIconProps) => {
  return (
    <svg
      viewBox="0 0 15 13"
      xmlns="http://www.w3.org/2000/svg"
      className={cn("w-3 h-3 stroke-[#57D0E1] fill-none stroke-2", className)}
      {...props}>
      <path
        d="M14.2 11.9999C14.2 10.7228 12.9756 9.63621 11.2667 9.23353M9.8 12C9.8 10.38 7.83005 9.06667 5.4 9.06667C2.96995 9.06667 1 10.38 1 12M9.8 6.86667C11.42 6.86667 12.7333 5.55337 12.7333 3.93333C12.7333 2.3133 11.42 1 9.8 1M5.4 6.86667C3.77996 6.86667 2.46667 5.55337 2.46667 3.93333C2.46667 2.3133 3.77996 1 5.4 1C7.02004 1 8.33333 2.3133 8.33333 3.93333C8.33333 5.55337 7.02004 6.86667 5.4 6.86667Z"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
};

export default OneOnOneMeetingIcon;
