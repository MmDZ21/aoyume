import { Suspense } from "react";
import { DownloadContainer } from "./DownloadContainer";
import { getAnimeEpisodes } from "@/lib/data";
import { Skeleton } from "@/components/ui/skeleton";

interface AsyncDownloadSectionProps {
  animeId: number;
  hasAccess: boolean;
}

export async function AsyncDownloadSection({ animeId, hasAccess }: AsyncDownloadSectionProps) {
  const episodes = await getAnimeEpisodes(animeId);

  return <DownloadContainer episodes={episodes} hasAccess={hasAccess} />;
}

export function DownloadSectionSkeleton() {
  return (
    <div className="space-y-6">
       <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <Skeleton className="h-8 w-32 bg-gray-900/20" />
          <Skeleton className="h-10 w-full md:w-48 bg-gray-900/20" />
       </div>
       <div className="space-y-4">
          <Skeleton className="h-16 w-full rounded-xl bg-gray-900/20" />
          <Skeleton className="h-16 w-full rounded-xl bg-gray-900/20" />
          <Skeleton className="h-16 w-full rounded-xl bg-gray-900/20" />
       </div>
    </div>
  )
}

