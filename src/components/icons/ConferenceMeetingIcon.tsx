import { IIconProps } from "@/helpers/types";
import { cn } from "@/lib/utils";

const ConferenceMeetingIcon = ({ className, ...props }: IIconProps) => {
  return (
    <svg
      viewBox="0 0 17 14"
      xmlns="http://www.w3.org/2000/svg"
      className={cn("w-3 h-3 stroke-[#6399D6] fill-none stroke-2", className)}
      {...props}>
      <path
        d="M12.2 13C12.2 11.6745 10.4091 10.6 8.2 10.6C5.99086 10.6 4.2 11.6745 4.2 13M15.4 10.6003C15.4 9.61615 14.4127 8.77035 13 8.4M1 10.6003C1 9.61615 1.98728 8.77035 3.4 8.4M13 5.18889C13.491 4.74943 13.8 4.1108 13.8 3.4C13.8 2.07452 12.7255 1 11.4 1C10.7853 1 10.2246 1.23108 9.8 1.61111M3.4 5.18889C2.909 4.74943 2.6 4.1108 2.6 3.4C2.6 2.07452 3.67452 1 5 1C5.61468 1 6.17539 1.23108 6.6 1.61111M8.2 8.2C6.87452 8.2 5.8 7.12548 5.8 5.8C5.8 4.47452 6.87452 3.4 8.2 3.4C9.52548 3.4 10.6 4.47452 10.6 5.8C10.6 7.12548 9.52548 8.2 8.2 8.2Z"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
};

export default ConferenceMeetingIcon;
