import { Skeleton } from "@/components/ui/skeleton";
import React from "react";

const ToDoSkeleton = () => {
  return (
    <div className="flex flex-col space-y-3">
      <div className="w-full flex justify-between items-center gap-2 md:flex-col md:items-start md:gap-1 px-3 py-2">
        <Skeleton className="w-40 h-6 md:h-7 rounded-full" />
        <Skeleton className="w-36 h-4 rounded-full" />
      </div>
      <div className="flex flex-col gap-y-2 px-3 py-2">
        {Array.from({ length: 5 }).map((_, i) => (
          <div key={i} className="flex gap-x-2">
            <Skeleton className="h-4 w-4 md:h-[18px] md:w-[18px] rounded" />
            <Skeleton className="max-w-full w-full h-5 rounded-full" />
          </div>
        ))}
      </div>
    </div>
  );
};

export default ToDoSkeleton;
