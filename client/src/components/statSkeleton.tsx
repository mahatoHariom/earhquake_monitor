import { Skeleton } from "./ui/skeleton";

const StatsCardSkeleton = () => (
  <div className="rounded-lg p-6 bg-gray-50">
    <Skeleton className="h-4 w-24 mb-4" />
    <div className="flex items-baseline">
      <Skeleton className="h-8 w-16" />
      <Skeleton className="h-4 w-8 ml-2" />
    </div>
  </div>
);

export default StatsCardSkeleton;
