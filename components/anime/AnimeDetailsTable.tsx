import React from "react";
import { cn } from "@/lib/utils";
import { Database } from "@/types/database.types";

type AnimeDetailsRow = Database["public"]["Views"]["complete_anime_details_materialized"]["Row"];

interface AnimeDetailsTableProps {
  anime: AnimeDetailsRow;
}

interface DetailItem {
  label: string;
  value: string | number | React.ReactNode;
  className?: string;
}

export function AnimeDetailsTable({ anime }: AnimeDetailsTableProps) {
  const genres = Array.isArray(anime.genres)
    ? (anime.genres as unknown as { name_fa?: string }[])
        .map((g) => g.name_fa)
        .filter((g): g is string => !!g)
    : anime.genre_names_en || [];
  const status = anime.dic_status === 1 ? "Airing" : "Finished";
  const episodes = anime.episodes_en || anime.episodes_fa || "0";
  const broadcastTime = anime.broadcast_fa || anime.broadcast_en || "Unknown";
  const latestUpdate = anime.last_update || "Unknown";
  const score = anime.dic_rating || 0;
  const voters = 0; // Not available in view
  const malScore = anime.dic_score || "0";
  const malVoters = anime.dic_scored_by?.replace(/,/g, "") || "0";
  const downloadedCount = 0; // Not available in view
  const watchedCount = anime.post_hit || 0;
  
  const items: DetailItem[] = [
    {
      label: "رده سنی",
      value: "13+ سال", // Placeholder
    },
    {
      label: "شبکه پخش",
      value: (
        <div className="flex items-center gap-1.5">
          {/* Placeholder for network logo logic */}
          <span className="text-base font-bold text-destructive">
            N
          </span>
          <span>{"نت فلیکس"}</span>
        </div>
      ),
    },
    {
      label: "ژانر",
      value: genres.join("، "),
      className: "col-span-2",
    },
    {
      label: "وضعیت",
      value: status,
    },
    {
      label: "تعداد قسمت‌ها",
      value: `${episodes} قسمت`,
    },
    {
      label: "زمان پخش",
      value: broadcastTime,
      className: "col-span-2",
    },
    {
      label: "آخرین بروزرسانی",
      value: latestUpdate,
      className: "col-span-2",
    },
    {
      label: "امتیاز AoYume",
      value: (
        <div className="flex items-baseline gap-1">
          <span className="">{score}</span>
          <span className="">/ 10</span>
        </div>
      ),
    },
    {
      label: "رای‌دهندگان",
      value: voters.toLocaleString("fa-IR"),
    },
    {
      label: "امتیاز MAL",
      value: (
        <div className="flex items-baseline gap-1">
          <span className="">{malScore}</span>
          <span className="">/ 10</span>
        </div>
      ),
    },
    {
      label: "رای‌دهندگان MAL",
      value: parseInt(malVoters).toLocaleString("fa-IR"),
    },
    {
      label: "تعداد دانلود",
      value: downloadedCount.toLocaleString("fa-IR"),
    },
    {
      label: "تعداد مشاهده",
      value: watchedCount.toLocaleString("fa-IR"),
    },
  ];

  return (
    <div className="grid grid-cols-2 gap-3 md:gap-4 md:grid-cols-4" dir="rtl">
      {items.map((item, index) => {
        const isScore = item.label.includes("امتیاز");
        const isStatus = item.label === "وضعیت";
        
        return (
          <div
            key={index}
            className={cn(
              "group relative overflow-hidden rounded-xl border border-border/60 bg-card/50 backdrop-blur-sm p-5 shadow-sm transition-all duration-300 hover:border-primary/50 hover:bg-card hover:shadow-md",
              isScore && "hover:border-chart-5/50",
              isStatus && "hover:border-chart-4/50",
              item.className
            )}
          >
            {/* Subtle top accent */}
            <div className="absolute top-0 left-0 right-0 h-0.5 bg-gradient-to-r from-transparent via-primary/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            
            <div className="flex flex-col gap-1">
              <span className="text-xs font-medium text-muted-foreground/60">
                {item.label}
              </span>
              <div className={cn(
                "line-clamp-2 text-sm font-semibold leading-relaxed",
                isScore && "text-chart-5",
                isStatus && status === "Airing" ? "text-chart-4" : "text-foreground",
                !isScore && !isStatus && "text-foreground"
              )}>
                {item.value}
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
