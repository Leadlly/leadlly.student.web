import { IIconProps } from "@/helpers/types";
import { cn } from "@/lib/utils";

const StudyRoomIcon = ({ className, ...props }: IIconProps) => {
  return (
    <svg
      viewBox="0 0 18 20"
      xmlns="http://www.w3.org/2000/svg"
      className={cn("w-5 h-5 fill-none stroke-2", className)}
      {...props}>
      <path d="M17 10V15C17 16.8856 17 17.8284 16.4142 18.4142C15.8284 19 14.8856 19 13 19H3.5C2.11929 19 1 17.8807 1 16.5V16.5C1 15.1193 2.11929 14 3.5 14H13C14.8856 14 15.8284 14 16.4142 13.4142C17 12.8284 17 11.8856 17 10V5C17 3.11438 17 2.17157 16.4142 1.58579C15.8284 1 14.8856 1 13 1H5C3.11438 1 2.17157 1 1.58579 1.58579C1 2.17157 1 3.11438 1 5V16.5" />
      <path d="M6 6L12 6" strokeLinecap="round" />
    </svg>
  );
};

export default StudyRoomIcon;
