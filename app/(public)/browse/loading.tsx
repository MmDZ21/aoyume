import { MediaCardSkeleton } from "@/components/skeletons/MediaCardSkeleton";
import { Skeleton } from "@/components/ui/skeleton";

export default function Loading() {
  return (
    <div className="container mx-auto px-4 py-8 min-h-screen">
      <div className="flex flex-col items-center justify-center space-y-4 mb-12">
        <Skeleton className="h-12 w-64" />
        <Skeleton className="h-6 w-80" />
      </div>
      
      {/* Filters Skeleton */}
      <div className="bg-background/80 backdrop-blur-xl p-6 rounded-3xl border border-border shadow-2xl mb-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
            {Array.from({ length: 5 }).map((_, i) => (
                <Skeleton key={i} className="h-12 w-full rounded-xl" />
            ))}
        </div>
        <div className="flex gap-4 mt-6">
            <Skeleton className="h-12 flex-1 rounded-xl" />
            <Skeleton className="h-12 w-32 rounded-xl" />
        </div>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4 md:gap-6">
        {Array.from({ length: 12 }).map((_, i) => (
          <MediaCardSkeleton key={i} />
        ))}
      </div>
    </div>
  );
}

