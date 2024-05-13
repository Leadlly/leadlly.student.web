"use client";

import { IIconProps } from "@/helpers/types";
import clsx from "clsx";

const RightArrowIcon = ({ className, ...props }: IIconProps) => {
  return (
    <svg
      viewBox="0 0 7 12"
      xmlns="http://www.w3.org/2000/svg"
      className={clsx(
        "w-[6px] h-[6px] fill-none stroke-black stroke-2",
        className
      )}
      {...props}>
      <path
        d="M1.46651 10.5319L5.1582 5.86192"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M5.1582 5.86194L1.46651 1.192"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
};

export default RightArrowIcon;
