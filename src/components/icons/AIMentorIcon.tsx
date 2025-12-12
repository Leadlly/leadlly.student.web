import { IIconProps } from "@/helpers/types";
import { cn } from "@/lib/utils";

const AIMentorIcon = ({ className, ...props }: IIconProps) => {
  return (
    <svg
      viewBox="0 0 24 24"
      xmlns="http://www.w3.org/2000/svg"
      className={cn("w-5 h-5 fill-none stroke-2", className)}
      {...props}>
      <path
        d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2z"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M8 14s1.5 2 4 2 4-2 4-2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <circle cx="9" cy="9" r="1.5" fill="currentColor" stroke="none" />
      <circle cx="15" cy="9" r="1.5" fill="currentColor" stroke="none" />
      <path
        d="M12 2C12 2 14 4 14 6"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M12 2C12 2 10 4 10 6"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
};

export default AIMentorIcon;
