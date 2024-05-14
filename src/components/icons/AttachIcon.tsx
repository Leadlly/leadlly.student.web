import { IIconProps } from "@/helpers/types";
import { cn } from "@/lib/utils";

const AttachIcon = ({ className, ...props }: IIconProps) => {
  return (
    <svg
      viewBox="0 0 19 31"
      xmlns="http://www.w3.org/2000/svg"
      className={cn(
        "w-[10px] h-5 stroke-[#6a6a6a] stroke-[3] fill-none",
        className
      )}
      {...props}>
      <path
        d="M17 11L17 20C17 24.9706 13.6421 29 9.5 29C5.35786 29 2 24.9706 2 20L2 8C2 4.68629 4.23858 2 7 2C9.76142 2 12 4.68629 12 8L12 20C12 21.6569 10.8807 23 9.5 23C8.11929 23 7 21.6569 7 20L7 8"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
};

export default AttachIcon;
