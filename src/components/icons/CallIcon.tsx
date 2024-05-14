import { IIconProps } from "@/helpers/types";
import { cn } from "@/lib/utils";

const CallIcon = ({ className, ...props }: IIconProps) => {
  return (
    <svg
      viewBox="0 0 33 33"
      xmlns="http://www.w3.org/2000/svg"
      className={cn("w-5 h-5 fill-none stroke-black stroke-[2.6]", className)}
      {...props}>
      <path
        d="M23.2865 31.0698C12.8729 28.2243 4.78215 19.8461 2.30183 9.33959C1.36286 5.36218 4.82893 2.05775 8.91506 2.12908L10.7647 2.16136C11.7862 2.17919 12.5901 3.02365 12.6732 4.04196C12.8134 5.7624 13.1898 7.41786 13.7703 8.97518L10.9112 11.7363C13.0186 16.345 16.6593 20.115 21.1917 22.3821L24.0509 19.621C25.587 20.2555 27.2283 20.6895 28.9428 20.8897C29.9576 21.0082 30.7735 21.8411 30.7557 22.8626L30.7234 24.7123C30.6521 28.7984 27.2287 32.147 23.2865 31.0698Z"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
};

export default CallIcon;
