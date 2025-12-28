import { Suspense } from "react";
import { DownloadContainer } from "./DownloadContainer";
import { getAnimeEpisodes } from "@/lib/data";
import { Skeleton } from "@/components/ui/skeleton";

interface AsyncDownloadSectionProps {
  animeId: number;
  hasAccess: boolean;
}

export async function AsyncDownloadSection({
  animeId,
  hasAccess,
}: AsyncDownloadSectionProps) {
  const episodes = await getAnimeEpisodes(animeId);

  return <DownloadContainer episodes={episodes} hasAccess={hasAccess} />;
}

export function DownloadSectionSkeleton() {
  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <Skeleton className="bg-muted/20 h-8 w-32" />
        <Skeleton className="bg-muted/20 h-10 w-full md:w-48" />
      </div>
      <div className="space-y-4">
        <Skeleton className="bg-muted/20 h-16 w-full rounded-xl" />
        <Skeleton className="bg-muted/20 h-16 w-full rounded-xl" />
        <Skeleton className="bg-muted/20 h-16 w-full rounded-xl" />
      </div>
    </div>
  );
}
