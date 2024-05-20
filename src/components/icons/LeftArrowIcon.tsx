import { IIconProps } from "@/helpers/types";
import { cn } from "@/lib/utils";

const LeftArrowIcon = ({ className, ...props }: IIconProps) => {
  return (
    <svg
      viewBox="0 0 7 12"
      xmlns="http://www.w3.org/2000/svg"
      className={cn("w-3 h-3 fill-none stroke-black stroke-2", className)}
      {...props}>
      <path d="M6 1L1 6L6 11" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
};

export default LeftArrowIcon;
