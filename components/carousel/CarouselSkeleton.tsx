import { Skeleton } from "@/components/ui/skeleton";

export function CarouselSkeleton() {
  return (
    <div className="w-full space-y-4 my-8">
      {/* Header Skeleton */}
      <div className="flex items-center justify-between gap-4">
        <div className="flex items-center gap-2">
          <Skeleton className="h-6 w-1 rounded-2xl bg-primary/20" />
          <Skeleton className="h-6 w-32 bg-gray-900/20" />
        </div>

        <Skeleton className="hidden h-px flex-1 border-t border-dashed border-gray-900/20 sm:block" />

        <div className="flex items-center gap-2">
          <div className="flex items-center gap-2">
            <Skeleton className="h-8 w-8 rounded-full bg-gray-900/20" />
            <Skeleton className="h-8 w-8 rounded-full bg-gray-900/20" />
          </div>
          <Skeleton className="h-8 w-24 rounded-2xl bg-gray-900/20" />
        </div>
      </div>

      {/* Cards Skeleton */}
      <div className="flex gap-4 overflow-hidden">
        {Array.from({ length: 6 }).map((_, i) => (
          <div
            key={i}
            className="aspect-2/3 w-[160px] shrink-0 overflow-hidden rounded-2xl md:w-[200px]"
          >
            <Skeleton className="h-full w-full bg-gray-900/20" />
          </div>
        ))}
      </div>
    </div>
  );
}

