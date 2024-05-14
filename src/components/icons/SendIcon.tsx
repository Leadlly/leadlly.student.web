import { IIconProps } from "@/helpers/types";
import { cn } from "@/lib/utils";

const SendIcon = ({ className, ...props }: IIconProps) => {
  return (
    <svg
      viewBox="0 0 29 29"
      xmlns="http://www.w3.org/2000/svg"
      className={cn("w-5 h-5 fill-none stroke-[3] stroke-primary", className)}
      {...props}>
      <path
        d="M6.21973 2.4725L25.4635 11.588C27.9206 12.7519 27.9206 16.2482 25.4635 17.412L6.21972 26.5275C3.93977 27.6075 1.35922 25.767 1.63782 23.2596L2.61111 14.5L1.63782 5.74038C1.35922 3.23301 3.93978 1.39253 6.21973 2.4725Z"
        fill="white"
      />
      <path
        d="M2.61111 14.5L1.63782 5.74038C1.35922 3.23301 3.93978 1.39253 6.21973 2.4725L25.4635 11.588C27.9206 12.7519 27.9206 16.2482 25.4635 17.412L6.21972 26.5275C3.93977 27.6075 1.35922 25.767 1.63782 23.2596L2.61111 14.5ZM2.61111 14.5H10"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
};

export default SendIcon;
