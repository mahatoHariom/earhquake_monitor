// import Skeleton from "./ui/skeleton";

import { Skeleton } from "./ui/skeleton";

const FrequencyChartSkeleton = () => (
  <div className="h-96 bg-white rounded-lg shadow p-4">
    <Skeleton className="h-6 w-48 mb-8" />
    <div className="h-[calc(100%-2rem)] w-full flex items-center justify-center">
      <div className="w-full h-full relative">
        <Skeleton className="absolute inset-0" />
        <div className="absolute bottom-0 left-0 right-0 h-12 bg-gradient-to-t from-white" />
      </div>
    </div>
  </div>
);

export default FrequencyChartSkeleton;
