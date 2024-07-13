import { Skeleton } from "@/components/ui/skeleton";
import React from "react";

const BarChartSkeleton = () => {
  return (
    <div className="w-full px-6 py-4 flex justify-between">
      {Array.from({ length: 7 }).map((_, i) => (
        <div key={i} className="flex items-end gap-1">
          <Skeleton className="w-5 h-24 rounded-t" />
          <Skeleton className="w-5 h-20 rounded-t" />
        </div>
      ))}
    </div>
  );
};

export default BarChartSkeleton;
