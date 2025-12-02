import React from "react";
import type { AnimeDetails as AnimeDetailsType } from "@/types/anime";
import { cn } from "@/lib/utils";

interface AnimeDetailsTableProps {
  anime: AnimeDetailsType;
}

interface DetailItem {
  label: string;
  value: string | number | React.ReactNode;
  className?: string;
}

export function AnimeDetailsTable({ anime }: AnimeDetailsTableProps) {
  const items: DetailItem[] = [
    {
      label: "رده سنی",
      value: anime.ageRating || "13+ سال",
    },
    {
      label: "شبکه پخش",
      value: (
        <div className="flex items-center gap-1.5">
          {anime.networkLogo && (
            <span className="text-base font-bold text-[#E50914]">
              {anime.networkLogo}
            </span>
          )}
          <span>{anime.network || "نت فلیکس"}</span>
        </div>
      ),
    },
    {
      label: "ژانر",
      value: anime.genres.join("، "),
      className: "col-span-2",
    },
    {
      label: "وضعیت",
      value: anime.status,
    },
    {
      label: "تعداد قسمت‌ها",
      value: `${anime.episodes} قسمت`,
    },
    {
      label: "زمان پخش",
      value: anime.broadcastTime,
      className: "col-span-2",
    },
    {
      label: "آخرین بروزرسانی",
      value: anime.latestUpdate,
      className: "col-span-2",
    },
    {
      label: "امتیاز AoYume",
      value: (
        <div className="flex items-baseline gap-1">
          <span className="">{anime.score}</span>
          <span className="">/ 10</span>
        </div>
      ),
    },
    {
      label: "رای‌دهندگان",
      value: anime.voters.toLocaleString("fa-IR"),
    },
    {
      label: "امتیاز MAL",
      value: (
        <div className="flex items-baseline gap-1">
          <span className="">{anime.myAnimeListScore}</span>
          <span className="">/ 10</span>
        </div>
      ),
    },
    {
      label: "رای‌دهندگان MAL",
      value: anime.myAnimeListVoters.toLocaleString("fa-IR"),
    },
    {
      label: "تعداد دانلود",
      value: anime.downloadedCount.toLocaleString("fa-IR"),
    },
    {
      label: "تعداد مشاهده",
      value: anime.watchedCount.toLocaleString("fa-IR"),
    },
  ];

  return (
    <div className="grid grid-cols-2 gap-3 md:grid-cols-4" dir="rtl">
      {items.map((item, index) => {
        return (
          <div
            key={index}
            className={cn(
              "group bg-primary/5 dark:bg-primary/20 hover:bg-primary/10 border-border/50 hover:border-primary/10 relative overflow-hidden rounded-2xl border p-4 transition-all duration-300",
              item.className
            )}
          >
            <div className="relative z-10 flex flex-col gap-1">
              <div className="text-muted-foreground mb-1 flex items-center gap-2">
                <span className="text-xs font-medium">{item.label}</span>
              </div>
              <div className="text-foreground line-clamp-1 text-sm font-semibold">
                {item.value}
              </div>
            </div>

            {/* Decorative background gradient on hover */}
            <div className="from-primary/5 absolute inset-0 bg-linear-to-br to-transparent opacity-0 transition-opacity group-hover:opacity-100" />
          </div>
        );
      })}
    </div>
  );
}
