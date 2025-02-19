const Skeleton = ({ className = "" }: { className?: string }) => {
  return (
    <div className={`animate-pulse bg-gray-200 rounded-md ${className}`} />
  );
};

export { Skeleton };
