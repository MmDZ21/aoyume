import { MediaCardSkeleton } from "@/components/skeletons/MediaCardSkeleton";
import { Skeleton } from "@/components/ui/skeleton";

export default function Loading() {
  return (
    <div className="container mx-auto px-4 py-8 min-h-screen">
      <div className="flex flex-col items-center justify-center space-y-4 mb-12">
        <Skeleton className="h-12 w-48" />
        <Skeleton className="h-6 w-64" />
      </div>
      
      <div className="w-full max-w-xl mx-auto mb-8">
         <Skeleton className="h-12 w-full rounded-xl" />
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4 md:gap-6">
        {Array.from({ length: 12 }).map((_, i) => (
          <MediaCardSkeleton key={i} />
        ))}
      </div>
    </div>
  );
}

