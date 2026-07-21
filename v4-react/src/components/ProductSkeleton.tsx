interface ProductSkeletonProps {
  count?: number;
}

export function ProductSkeleton({ count = 8 }: ProductSkeletonProps) {
  return (
    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
      {Array.from({ length: count }).map((_, index) => (
        <div
          key={index}
          className="flex flex-col bg-white border border-gray-200 rounded-lg p-4 animate-pulse"
        >
          <div className="w-full h-40 bg-gray-200 rounded-md mb-3"></div>
          <div className="h-4 bg-gray-200 rounded-xs w-3/4 mb-2"></div>
          <div className="h-3 bg-gray-200 rounded-xs w-1/3 mb-2"></div>
          <div className="h-5 bg-gray-200 rounded-xs w-1/2 mb-4"></div>
          <div className="mt-auto h-8 bg-gray-200 rounded-md w-full"></div>
        </div>
      ))}
    </div>
  );
}
