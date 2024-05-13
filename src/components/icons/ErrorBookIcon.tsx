import { IIconProps } from "@/helpers/types";
import { cn } from "@/lib/utils";

const ErrorBookIcon = ({ className, active, ...props }: IIconProps) => {
  return (
    <svg
      viewBox="0 0 17 18"
      xmlns="http://www.w3.org/2000/svg"
      className={cn(
        "w-5 h-5 fill-none stroke-2",
        active ? "stroke-white" : "stroke-[#5A10D9]",
        className
      )}
      {...props}>
      <path
        d="M4.73764 1H4.03781C3.05772 1 2.56731 1 2.19296 1.21799C1.86368 1.40973 1.59616 1.71547 1.42838 2.0918C1.23764 2.51962 1.23764 3.08009 1.23764 4.2002V13.8002C1.23764 14.9203 1.23764 15.4801 1.42838 15.9079C1.59616 16.2842 1.86368 16.5905 2.19296 16.7822C2.56694 17 3.05676 17 4.03494 17H4.73764M4.73764 1H12.4378C13.4179 1 13.9073 1 14.2816 1.21799C14.6109 1.40973 14.8793 1.71547 15.0471 2.0918C15.2376 2.5192 15.2376 3.07899 15.2376 4.19691V13.8036C15.2376 14.9215 15.2376 15.4805 15.0471 15.9079C14.8793 16.2842 14.6109 16.5905 14.2816 16.7822C13.9076 17 13.4185 17 12.4403 17H4.73764M4.73764 1V17M8.23764 8H11.7376M8.23764 5H11.7376"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
};

export default ErrorBookIcon;
