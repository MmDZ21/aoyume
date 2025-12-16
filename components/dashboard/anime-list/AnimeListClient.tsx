"use client";

import { useState, useMemo } from "react";
import { AnimeListHeader } from "./AnimeListHeader";
import { AnimeListSection } from "./AnimeListSection";
import { ImportListDialogs } from "@/app/dashboard/anime-list/ImportListDialogs";
import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";

export type WatchlistEntry = {
  id: number;
  anime_id: number | null;
  score: number | null;
  status_id: number | null;
  watched_episodes: number;
  notes: string | null;
  last_updated: string;
  anime: {
    dic_title: string | null;
    title_en_normalized: string | null;
    dic_image_url: string | null;
    mal_image_url: string | null;
    air_date: string | null;
    episodes_en: string | null;
    episodes_fa: string | null;
  } | null;
};

interface AnimeListClientProps {
  initialData: WatchlistEntry[];
  userId: string;
  imageBaseUrl: string;
}

const statusMap: Record<number, string> = {
  1: "Plan to Watch",
  2: "Watching",
  3: "Completed",
  4: "Dropped",
  5: "On Hold",
  // Map Persian translations if you prefer headers in Persian
  // 1: "برای تماشا",
  // 2: "در حال تماشا",
  // 3: "تکمیل شده",
  // 4: "رها شده",
  // 5: "متوقف شده",
};

export function AnimeListClient({ initialData, userId, imageBaseUrl }: AnimeListClientProps) {
  const [entries, setEntries] = useState<WatchlistEntry[]>(initialData);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedStatus, setSelectedStatus] = useState<number | "all">("all");

  const filteredEntries = useMemo(() => {
    let result = entries;

    if (selectedStatus !== "all") {
      result = result.filter((entry) => entry.status_id === selectedStatus);
    }

    if (searchQuery) {
      const lowerQuery = searchQuery.toLowerCase();
      result = result.filter((entry) =>
        entry.anime?.dic_title?.toLowerCase().includes(lowerQuery) ||
        entry.anime?.title_en_normalized?.toLowerCase().includes(lowerQuery)
      );
    }

    return result;
  }, [entries, selectedStatus, searchQuery]);

  // Group by status if "all" is selected, otherwise just show the selected status list
  const groupedEntries = useMemo(() => {
    if (selectedStatus !== "all") {
      return { [selectedStatus]: filteredEntries };
    }

    const groups: Record<number, WatchlistEntry[]> = {};
    // Initialize groups order
    [2, 1, 3, 5, 4].forEach(status => groups[status] = []);

    filteredEntries.forEach((entry) => {
      const status = entry.status_id || 0;
      if (!groups[status]) groups[status] = [];
      groups[status].push(entry);
    });
    return groups;
  }, [filteredEntries, selectedStatus]);

  const handleUpdateEntry = (updatedEntry: WatchlistEntry) => {
    setEntries((prev) =>
      prev.map((entry) => (entry.id === updatedEntry.id ? updatedEntry : entry))
    );
  };

  return (
    <div className="w-full space-y-8 px-0 md:px-6 py-6">
      <div className="flex flex-col gap-6 md:flex-row md:items-center md:justify-between pb-6 border-b border-border/40">
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-foreground">انیمه های من</h1>
          <p className="text-muted-foreground mt-1 text-sm">مدیریت لیست تماشا و پیشرفت انیمه ها</p>
        </div>
        <div className="flex items-center gap-3">
          <ImportListDialogs />
        </div>
      </div>

      <div className="flex flex-col gap-8 lg:flex-row-reverse lg:items-start">
        {/* Sidebar Filters */}
        <aside className="w-full lg:w-64 shrink-0 space-y-6 lg:sticky lg:top-24">
          <div className="relative group">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground group-focus-within:text-primary transition-colors" />
            <Input
              placeholder="جستجو در لیست..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-9 bg-card/50 border-border/50 focus-visible:ring-primary/20 transition-all rounded-xl"
            />
          </div>
          
          <AnimeListHeader
            selectedStatus={selectedStatus}
            onSelectStatus={setSelectedStatus}
            counts={useMemo(() => {
              const counts: Record<string, number> = { all: entries.length };
              entries.forEach(e => {
                const s = e.status_id || 0;
                counts[s] = (counts[s] || 0) + 1;
              });
              return counts;
            }, [entries])}
          />
        </aside>

        {/* Main Content */}
        <div className="flex-1 min-w-0 space-y-10">
          {Object.entries(groupedEntries).map(([statusId, list]) => {
            const statusNum = parseInt(statusId);
            if (list.length === 0) return null;
            
            return (
              <AnimeListSection
                key={statusId}
                statusId={statusNum}
                title={statusMap[statusNum] || "Unknown"}
                entries={list}
                onUpdateEntry={handleUpdateEntry}
                imageBaseUrl={imageBaseUrl}
              />
            );
          })}
          
          {filteredEntries.length === 0 && (
            <div className="flex flex-col items-center justify-center py-20 px-4 text-center border-2 border-dashed rounded-3xl border-muted bg-card/30">
              <div className="w-16 h-16 bg-muted/50 rounded-full flex items-center justify-center mb-4">
                <Search className="w-8 h-8 text-muted-foreground" />
              </div>
              <h3 className="text-lg font-medium">موردی یافت نشد</h3>
              <p className="text-muted-foreground mt-1 max-w-sm">
                هیچ انیمه‌ای با این مشخصات در لیست شما پیدا نشد.
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
