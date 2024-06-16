import * as React from "react";

import { cn } from "@/lib/utils";

export interface InputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  icon1?: React.ReactNode;
  icon2?: React.ReactNode;
  inputWrapperClassName?: string;
  countryCodeClassName?: string;
}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  (
    {
      className,
      type,
      icon1: Icon1,
      icon2: Icon2,
      inputWrapperClassName,
      countryCodeClassName,
      ...props
    },
    ref
  ) => {
    return (
      <div
        className={cn(
          "flex items-center gap-x-2 px-3 py-1 border border-input rounded-md h-10  bg-background",
          inputWrapperClassName
        )}>
        {Icon1 && Icon1}
        {type === "tel" && (
          <span className={cn(countryCodeClassName)}>+91</span>
        )}
        <input
          type={type}
          className={cn(
            "h-full w-full text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2  focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50",
            className
          )}
          ref={ref}
          {...props}
        />
        {Icon2 && Icon2}
      </div>
    );
  }
);
Input.displayName = "Input";

export { Input };
