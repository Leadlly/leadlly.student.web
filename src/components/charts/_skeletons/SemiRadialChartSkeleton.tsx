import { Skeleton } from "@/components/ui/skeleton";

const SemiRadialChartSkeleton = () => {
  return (
    <div className="py-4">
      <Skeleton className="w-32 h-16 border-[15px] border-b-0 border-muted bg-transparent rounded-t-full" />
    </div>
  );
};

export default SemiRadialChartSkeleton;
