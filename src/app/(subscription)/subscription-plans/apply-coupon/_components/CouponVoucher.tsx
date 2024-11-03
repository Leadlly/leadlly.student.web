import { cn } from "@/lib/utils";
import React from "react";

const CouponVoucher = ({
  children,
  className,
  childCirclesClassName,
}: {
  children: React.ReactNode;
  className?: string;
  childCirclesClassName?: string;
}) => {
  return (
    <div className="overflow-hidden">
      <div className={cn("relative py-2 rounded-xl", className)}>
        <span
          className={cn(
            "w-12 h-12 rounded-full bg-white absolute top-1/2 -translate-y-1/2 -left-8 z-10",
            childCirclesClassName
          )}
        ></span>
        <span
          className={cn(
            "w-12 h-12 rounded-full bg-white absolute top-1/2 -translate-y-1/2 -right-8 z-10",
            childCirclesClassName
          )}
        ></span>
        {children}
      </div>
    </div>
  );
};

export default CouponVoucher;
