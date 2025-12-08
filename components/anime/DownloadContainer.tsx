"use client";

import { useState, useEffect } from "react";
import { DownloadBox, DownloadItem } from "./DownloadBox";
import { QualitySelector } from "./QualitySelector";
import { EpisodesList } from "@/types/anime";

interface DownloadContainerProps {
  episodes?: EpisodesList;
  items?: DownloadItem[]; // Keep for backward compatibility or different usage if needed
}

export function DownloadContainer({
  episodes,
  items,
}: DownloadContainerProps) {
  // Extract qualities from episodes if provided
  const availableQualities = episodes?.map((group) => group.quality) || [];
  
  const [selectedQuality, setSelectedQuality] = useState<string>(
    availableQualities.length > 0 ? availableQualities[availableQualities.length - 1] : "1080"
  );

  // Update selected quality if available qualities change (e.g. data load)
  useEffect(() => {
    if (availableQualities.length > 0 && !availableQualities.includes(selectedQuality)) {
      setSelectedQuality(availableQualities[availableQualities.length - 1]);
    }
  }, [availableQualities, selectedQuality]);

  // If episodes data is provided, use it
  if (episodes && episodes.length > 0) {
    const selectedGroup = episodes.find((g) => g.quality === selectedQuality);
    
    const mappedItems: DownloadItem[] = selectedGroup
      ? selectedGroup.episodes.map((ep) => ({
          id: ep.id,
          quality: ep.quality,
          size: ep.size,
          link: ep.link,
          resolution: ep.quality,
          episode: ep.episode_number,
        }))
      : [];

    // Sort by episode number
    mappedItems.sort((a, b) => a.episode - b.episode);

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
