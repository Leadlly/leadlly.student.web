import { Skeleton } from "@/components/ui/skeleton";
import React from "react";

const RadialBarChartSkeleton = () => {
  return (
    <div className="px-12 py-5">
      <Skeleton className="w-28 h-28 bg-transparent border-[15px] border-muted rounded-full" />
    </div>
  );
};

export default RadialBarChartSkeleton;
