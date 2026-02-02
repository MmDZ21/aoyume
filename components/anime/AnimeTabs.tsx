"use client";

import * as React from "react";
import { ReusableTabs, TabItem } from "@/components/ui/ReusableTabs";
import {
  AsyncDownloadSection,
  DownloadSectionSkeleton,
} from "@/components/anime/AsyncDownloadSection";
import { AnimeDetailsTable } from "@/components/anime/AnimeDetailsTable";
import { MediaItem } from "@/components/carousel/MediaCard";
import { MediaGrid } from "@/components/carousel/MediaGrid";
import { CommentsSection } from "@/components/comments/CommentsSection";
import { Database } from "@/types/database.types";
import { Suspense } from "react";

const TabContent = ({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) => (
  <div className="space-y-6">
    <h3 className="text-primary dark:text-foreground text-center text-xl font-bold md:text-start">
      {title}
    </h3>
    {children}
  </div>
);

type AnimeDetailsRow =
  Database["public"]["Views"]["complete_anime_details_materialized"]["Row"];

type AnimeTabsProps = {
  animeId: number;
  hasAccess: boolean;
  relatedItems: MediaItem[];
  similarItems: MediaItem[];
  animeData: AnimeDetailsRow;
};

export function AnimeTabs({
  animeId,
  hasAccess,
  relatedItems,
  similarItems,
  animeData,
}: AnimeTabsProps) {
  const tabs: TabItem[] = React.useMemo(() => {
    const baseTabs: TabItem[] = [
      {
        value: "download",
        label: "دانلود",
        content: (
          <Suspense fallback={<DownloadSectionSkeleton />}>
            <AsyncDownloadSection animeId={animeId} hasAccess={hasAccess} />
          </Suspense>
        ),
      },
      {
        value: "details",
        label: "جزئیات",
        content: (
          <TabContent title="جزئیات کامل">
            <AnimeDetailsTable anime={animeData} />
          </TabContent>
        ),
      },
      {
        value: "trailer",
        label: "تریلر",
        content: (
          <div className="text-center text-slate-400">محتوای بخش تریلر</div>
        ),
      },
      {
        value: "related",
        label: "مرتبط",
        content: (
          <TabContent title="انیمه های مرتبط">
            <MediaGrid items={relatedItems} />
          </TabContent>
        ),
      },
      {
        value: "similar",
        label: "مشابه",
        content: (
          <TabContent title="انیمه های مشابه">
            <MediaGrid items={similarItems} />
          </TabContent>
        ),
      },
      {
        value: "comments",
        label: "نظرات",
        content: (
          <TabContent title="نظرات کاربران">
            <Suspense fallback={<div>Loading comments...</div>}>
              <CommentsSection animeId={animeId} />
            </Suspense>
          </TabContent>
        ),
      },
    ];

    return baseTabs;
  }, [animeId, hasAccess, relatedItems, similarItems, animeData]);

  return <ReusableTabs defaultValue="download" tabs={tabs} />;
}

