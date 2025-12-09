import { Skeleton } from "@/components/ui/skeleton";

export function SliderSkeleton() {
  return (
    <section className="relative h-[500px] w-full md:h-[400px]">
      <Skeleton className="h-full w-full rounded-2xl bg-gray-900/20" />
    </section>
  );
}

