"use client";

import Image from "next/image";
import Link from "next/link";
import { WatchlistEntry } from "./AnimeListClient";
import { EditEntryDialog } from "./EditEntryDialog";
import { useState } from "react";
import { MoreVertical, Star, MonitorPlay } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn, slugify } from "@/lib/utils";

interface AnimeListItemProps {
  entry: WatchlistEntry;
  onUpdateEntry: (entry: WatchlistEntry) => void;
  imageBaseUrl: string;
}

export function AnimeListItem({ entry, onUpdateEntry, imageBaseUrl }: AnimeListItemProps) {
  const [isEditOpen, setIsEditOpen] = useState(false);
  const anime = entry.anime;
  const title = anime?.dic_title || anime?.title_en_normalized || "Unknown Title";
  const image = imageBaseUrl && anime
    ? `${imageBaseUrl}${anime.dic_image_url || anime.mal_image_url}` 
    : (anime?.dic_image_url || anime?.mal_image_url || "/images/placeholder.jpg");

  const totalEpisodes = anime?.episodes_en ? parseInt(anime.episodes_en) : 0;
  const progress = totalEpisodes > 0 ? (entry.watched_episodes / totalEpisodes) * 100 : 0;
  
  const animeId = entry.anime_id || entry.id; // Fallback to entry.id if anime_id is missing, though they should be distinct
  const animeHref = `/anime/${animeId}/${slugify(title)}`;

  return (
    <>
      <div className="group relative flex items-center gap-4 bg-card/50 hover:bg-card border border-border/50 hover:border-border p-3 rounded-2xl transition-all duration-300 hover:shadow-sm">
        {/* Cover Image */}
        <Link href={animeHref} className="relative h-20 w-14 sm:h-24 sm:w-16 shrink-0 overflow-hidden rounded-xl shadow-sm">
          <Image
            src={image}
            alt={title}
            fill
            className="object-cover transition-transform duration-500 group-hover:scale-105"
          />
        </Link>

        {/* Content */}
        <div className="flex flex-1 flex-col justify-center gap-2 min-w-0 py-1">
          <div className="flex justify-between items-start gap-2">
            <div className="min-w-0">
              <Link href={animeHref} className="block truncate">
                <h3 className="truncate font-semibold text-base sm:text-lg text-foreground/90 hover:text-primary transition-colors">{title}</h3>
              </Link>
              <p className="text-xs text-muted-foreground font-medium">
                {anime?.air_date || "Unknown Year"}
              </p>
            </div>
            
            {/* Mobile Actions / Status Indicator can go here */}
          </div>

          <div className="flex items-center gap-4 sm:gap-6 mt-1">
            {/* Score */}
            <div className="flex items-center gap-1.5 bg-accent/50 px-2.5 py-1 rounded-full">
              <Star className="w-3.5 h-3.5 text-yellow-500 fill-yellow-500" />
              <span className="text-sm font-semibold">{entry.score || "-"}</span>
            </div>

            {/* Progress */}
            <div className="flex-1 max-w-[200px] flex flex-col gap-1.5">
              <div className="flex justify-between text-xs text-muted-foreground px-0.5">
                <div className="flex items-center gap-1">
                  <MonitorPlay className="w-3 h-3" />
                  <span>{entry.watched_episodes} / {anime?.episodes_en || "?"}</span>
                </div>
                <span>{Math.round(progress)}%</span>
              </div>
              <div className="h-1.5 w-full bg-secondary/50 rounded-full overflow-hidden">
                <div 
                  className="h-full bg-primary rounded-full transition-all duration-500 ease-out"
                  style={{ width: `${Math.min(progress, 100)}%` }}
                />
              </div>
            </div>
          </div>
        </div>

        {/* Edit Trigger */}
        <Button
          variant="ghost"
          size="icon"
          className="h-8 w-8 rounded-full opacity-0 group-hover:opacity-100 transition-all focus:opacity-100 shrink-0"
          onClick={() => setIsEditOpen(true)}
        >
          <MoreVertical className="h-4 w-4" />
        </Button>
      </div>

      <EditEntryDialog
        open={isEditOpen}
        onOpenChange={setIsEditOpen}
        entry={entry}
        onUpdate={onUpdateEntry}
      />
    </>
  );
}
