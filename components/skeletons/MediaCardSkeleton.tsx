import { Skeleton } from "@/components/ui/skeleton";

export function MediaCardSkeleton() {
  return (
    <div className="space-y-3">
      <Skeleton className="aspect-2/3 w-full rounded-2xl" />
      <div className="space-y-2">
        <Skeleton className="h-4 w-3/4 mx-auto" />
      </div>
    </div>
  );
}

