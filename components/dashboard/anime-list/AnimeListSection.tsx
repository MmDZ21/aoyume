"use client";

import { WatchlistEntry } from "./AnimeListClient";
import { AnimeListItem } from "./AnimeListItem";

interface AnimeListSectionProps {
  statusId: number;
  title: string;
  entries: WatchlistEntry[];
  onUpdateEntry: (entry: WatchlistEntry) => void;
  imageBaseUrl: string;
}

export function AnimeListSection({
  statusId,
  title,
  entries,
  onUpdateEntry,
  imageBaseUrl,
}: AnimeListSectionProps) {
  return (
    <div className="space-y-5 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="flex items-center gap-3 pb-2 border-b border-border/40">
        <div className="h-6 w-1 rounded-full bg-primary/60" />
        <h2 className="text-xl font-bold tracking-tight text-foreground">{title}</h2>
        <span className="text-xs font-medium px-2 py-0.5 rounded-full bg-muted text-muted-foreground ml-auto">
          {entries.length}
        </span>
      </div>
      <div className="flex flex-col gap-3 sm:gap-4">
        {entries.map((entry) => (
          <div key={entry.id} className="min-w-0">
            <AnimeListItem
              entry={entry}
              onUpdateEntry={onUpdateEntry}
              imageBaseUrl={imageBaseUrl}
            />
          </div>
        ))}
      </div>
    </div>
  );
}
