import { Skeleton } from "@/components/ui/skeleton";

export function AnimeDetailsSkeleton() {
  return (
    <div className="border-primary/20 relative w-full overflow-hidden rounded-2xl border-2 bg-gray-900/10">
      {/* Background Skeleton */}
      <Skeleton className="absolute inset-0 z-0 h-full w-full opacity-20" />

      <div className="relative z-10 flex flex-col gap-8 p-6 md:p-10">
        <div className="flex flex-col gap-8 lg:flex-row lg:items-stretch lg:justify-between">
          {/* Stats Section Skeleton */}
          <div className="order-2 flex shrink-0 flex-col gap-4 md:flex-row lg:order-2 lg:w-64 lg:flex-col">
            <Skeleton className="h-24 w-full rounded-xl bg-gray-900/20" />
            <Skeleton className="h-24 w-full rounded-xl bg-gray-900/20" />
          </div>

          {/* Poster and Info Section */}
          <div className="order-1 flex flex-col gap-6 lg:flex-row lg:items-start">
            {/* Poster Skeleton */}
            <div className="mx-auto shrink-0 lg:mx-0">
              <Skeleton className="h-96 w-64 rounded-2xl bg-gray-900/20 shadow-2xl" />
            </div>

            {/* Info Section Skeleton */}
            <div className="flex w-full flex-col gap-6 text-right max-w-sm">
              <Skeleton className="mx-auto h-10 w-3/4 bg-gray-900/20 md:mx-0" />
              
              <Skeleton className="h-10 w-48 rounded-md bg-gray-900/20" />

              <div className="flex flex-wrap gap-4 justify-start">
                <Skeleton className="h-8 w-20 rounded-md bg-gray-900/20" />
                <Skeleton className="h-8 w-20 rounded-md bg-gray-900/20" />
                <Skeleton className="h-8 w-20 rounded-md bg-gray-900/20" />
              </div>

              <div className="space-y-4">
                <Skeleton className="h-6 w-full bg-gray-900/20" />
                <Skeleton className="h-6 w-full bg-gray-900/20" />
                <Skeleton className="h-6 w-full bg-gray-900/20" />
                <Skeleton className="h-6 w-full bg-gray-900/20" />
              </div>
            </div>
          </div>
        </div>

        {/* Synopsis Skeleton */}
        <div className="mt-4 border-t border-white/10 pt-6">
          <Skeleton className="mb-4 h-8 w-32 bg-gray-900/20" />
          <Skeleton className="h-4 w-full bg-gray-900/20 mb-2" />
          <Skeleton className="h-4 w-full bg-gray-900/20 mb-2" />
          <Skeleton className="h-4 w-2/3 bg-gray-900/20" />
        </div>
      </div>
    </div>
  );
}

