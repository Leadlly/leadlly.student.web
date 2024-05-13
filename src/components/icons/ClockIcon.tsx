import { IIconProps } from "@/helpers/types";
import { cn } from "@/lib/utils";

const ClockIcon = ({ className, ...props }: IIconProps) => {
  return (
    <svg
      viewBox="0 0 13 13"
      xmlns="http://www.w3.org/2000/svg"
      className={cn("w-3 h-3 stroke-primary fill-none stroke-[1.5]", className)}
      {...props}>
      <path
        d="M6.42857 3.4127V6.42857H9.44444M6.42857 11.8571C3.43045 11.8571 1 9.42669 1 6.42857C1 3.43045 3.43045 1 6.42857 1C9.42669 1 11.8571 3.43045 11.8571 6.42857C11.8571 9.42669 9.42669 11.8571 6.42857 11.8571Z"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
};

export default ClockIcon;
