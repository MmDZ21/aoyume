"use client";

import { useState, useEffect, useMemo } from "react";
import { DownloadBox, DownloadItem } from "./DownloadBox";
import { QualitySelector } from "./QualitySelector";
import { EpisodesList } from "@/types/anime";
import { Button } from "../ui/button";
import Link from "next/link";
import { Lock } from "lucide-react";

interface DownloadContainerProps {
  episodes?: EpisodesList;
  items?: DownloadItem[]; // Keep for backward compatibility or different usage if needed
  hasAccess?: boolean; // New prop to check user access
}

export function DownloadContainer({
  episodes,
  items,
  hasAccess = false, // Default to false if not provided
}: DownloadContainerProps) {
  // Extract qualities from episodes if provided
  const availableQualities = useMemo(() => episodes?.map((group) => group.quality) || [], [episodes]);
  
  const [selectedQuality, setSelectedQuality] = useState<string>(
    availableQualities.length > 0 ? availableQualities[availableQualities.length - 1] : "1080"
  );

  // Update selected quality if available qualities change (e.g. data load)
  useEffect(() => {
    if (availableQualities.length > 0 && !availableQualities.includes(selectedQuality)) {
      setSelectedQuality(availableQualities[availableQualities.length - 1]);
    }
  }, [availableQualities, selectedQuality]);

  // If user is not logged in, show unauthenticated message
  if (!hasAccess) {
    return (
      <div className="flex flex-col items-center justify-center gap-4 rounded-2xl border border-primary/20 bg-primary/5 p-8 text-center md:p-12">
        <div className="rounded-full bg-primary/10 p-4">
          <Lock className="h-8 w-8 text-primary" />
        </div>
        <div className="space-y-2">
          <h3 className="text-xl font-bold">برای دانلود باید وارد شوید</h3>
          <p className="text-muted-foreground">
            برای دسترسی به لینک‌های دانلود، لطفاً ابتدا وارد حساب کاربری خود شوید یا ثبت‌نام کنید.
          </p>
        </div>
        <div className="flex gap-4 pt-2">
          <Button asChild>
            <Link href="/sign-in">ورود به حساب</Link>
          </Button>
          <Button variant="outline" asChild>
            <Link href="/sign-up">ثبت‌نام</Link>
          </Button>
        </div>
      </div>
    );
  }

  // If episodes data is provided, use it
  const mappedItems = useMemo(() => {
    if (!episodes || episodes.length === 0) return [];
    
    const selectedGroup = episodes.find((g) => g.quality === selectedQuality);
    
    const items: DownloadItem[] = selectedGroup
      ? selectedGroup.episodes
          .filter((ep) => ep.direct_link_status === "uploaded")
          .map((ep) => ({
            id: ep.id,
            quality: ep.quality,
            size: ep.size,
            link: ep.direct_link,
            resolution: ep.quality,
            episode: ep.episode_number,
            thumbnail: ep.thumbnail,
          }))
      : [];

    // Sort by episode number
    return items.sort((a, b) => a.episode - b.episode);
  }, [episodes, selectedQuality]);

  if (episodes && episodes.length > 0) {

    return (
      <div className="space-y-6">
        <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <h2 className="text-center text-xl font-bold text-primary dark:text-foreground md:text-left">
            دانلود باکس
          </h2>
          {availableQualities.length > 0 && (
            <QualitySelector
              qualities={availableQualities}
              selected={selectedQuality}
              onChange={setSelectedQuality}
              className="w-full md:w-auto"
            />
          )}
        </div>
        {mappedItems.length > 0 ? (
          <DownloadBox items={mappedItems} />
        ) : (
          <div className="text-center text-muted-foreground py-8">
             لینک‌های دانلود برای کیفیت {selectedQuality} موجود نیست.
          </div>
        )}
      </div>
    );
  }

  // Fallback to old behavior if items provided directly
  if (items) {
    const qualities = ["480", "720", "1080"]; // Default fallback
    // Logic for old items filtering (omitted/simplified for now as we move to new system)
    return (
        <div className="space-y-6">
          <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
            <h2 className="text-center text-xl font-bold text-primary dark:text-foreground md:text-left">
              دانلود باکس
            </h2>
          </div>
          <DownloadBox items={items} />
        </div>
    );
  }

  return (
    <div className="text-center py-10 text-muted-foreground">
      هیچ لینک دانلودی موجود نیست.
    </div>
  );
}
