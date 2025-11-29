import Image from "next/image";
import { Download, Play, Bookmark, ChevronUp, ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils";
import type { AnimeDetails as AnimeDetailsType } from "@/types/anime";

interface AnimeDetailsProps {
  anime: AnimeDetailsType;
  className?: string;
}

export function AnimeDetails({ anime, className }: AnimeDetailsProps) {
  return (
    <div
      className={cn(
        "relative w-full overflow-hidden rounded-3xl bg-white text-white shadow-xl",
        className
      )}
    >

      <div className="relative z-10 flex flex-col gap-8 p-6 md:p-10">
        <div className="flex flex-col gap-8 lg:flex-row lg:items-start">
          {/* Left Section: Interactive Stats (Desktop: Left, Mobile: Bottom or separate) 
              In RTL, this is visually on the left (End).
          */}
          <div className="order-3 flex shrink-0 flex-row gap-4 lg:order-3 lg:w-64 lg:flex-col">
            {/* Download Stats */}
            <div className="flex h-40 flex-1 flex-col items-center justify-center gap-4 rounded-2xl border border-white/5 bg-[#1e293b]/50 p-6 backdrop-blur-sm">
              <Download className="h-8 w-8 text-slate-400" />
              <span className="text-sm text-slate-300">
                قسمت های دانلود شده
              </span>
              <div className="flex w-full items-center justify-center gap-6">
                <span className="text-sm text-slate-400">240</span>
                <div className="flex flex-col items-center gap-1 text-slate-500">
                  <ChevronUp className="h-4 w-4" />
                  <ChevronDown className="h-4 w-4" />
                </div>
                <span className="text-sm text-slate-400">10</span>
              </div>
            </div>

            {/* Watched Stats */}
            <div className="flex h-40 flex-1 flex-col items-center justify-center gap-4 rounded-2xl border border-white/5 bg-[#1e293b]/50 p-6 backdrop-blur-sm">
              <Play className="h-8 w-8 text-slate-400" />
              <span className="text-sm text-slate-300">
                قسمت های مشاهده شده
              </span>
              <div className="flex w-full items-center justify-center gap-6">
                <span className="text-sm text-slate-400">240</span>
                <div className="flex flex-col items-center gap-1 text-slate-500">
                  <ChevronUp className="h-4 w-4" />
                  <ChevronDown className="h-4 w-4" />
                </div>
                <span className="text-sm text-slate-400">10</span>
              </div>
            </div>
          </div>

          {/* Middle Section: Info */}
          <div className="order-2 flex flex-1 flex-col gap-6 text-right lg:items-end">
            <h1 className="text-3xl font-bold text-white md:text-4xl">
              {anime.title}
            </h1>

            <div className="inline-flex items-center gap-2 rounded-full bg-blue-600/80 px-4 py-1.5 text-sm text-white backdrop-blur-md">
              {anime.latestUpdate}
            </div>

            <div className="flex flex-wrap justify-end gap-2">
              {anime.genres.map((genre) => (
                <span
                  key={genre}
                  className="cursor-default rounded-full border border-white/20 px-4 py-1 text-sm transition-colors hover:bg-white/10"
                >
                  {genre}
                </span>
              ))}
            </div>

            <div className="grid w-full max-w-md grid-cols-1 gap-y-3 text-sm text-slate-300">
              <div className="flex items-center justify-between gap-4">
                <span className="font-medium text-blue-400">
                  7.5 از 10{" "}
                  <span className="text-xs text-slate-500">
                    ({anime.voters.toLocaleString()} رای)
                  </span>
                </span>
                <span>: Anime List امتیاز</span>
              </div>
              <div className="flex items-center justify-between gap-4">
                <span className="font-medium text-blue-400">
                  7.5 از 10{" "}
                  <span className="text-xs text-slate-500">
                    ({anime.myAnimeListVoters.toLocaleString()} رای)
                  </span>
                </span>
                <span>: My Anime List امتیاز</span>
              </div>
              <div className="flex items-center justify-between gap-4">
                <span>{anime.broadcastTime}</span>
                <span>: زمان پخش</span>
              </div>
              <div className="flex items-center justify-between gap-4">
                <span>{anime.episodes} قسمت</span>
                <span>: قسمت ها</span>
              </div>
            </div>
          </div>

          {/* Right Section: Poster */}
          <div className="group relative order-1 mx-auto shrink-0 lg:order-1 lg:mx-0">
            <div className="relative h-96 w-64 overflow-hidden rounded-2xl shadow-2xl">
              <Image
                src={anime.poster}
                alt={anime.title}
                fill
                className="object-cover"
              />
              <div className="absolute top-0 right-0 p-0">
                <div className="cursor-pointer rounded-bl-2xl bg-blue-600/90 p-3 text-white backdrop-blur-md transition-colors hover:bg-blue-700">
                  <Bookmark className="h-6 w-6" />
                </div>
              </div>
              <div className="absolute top-4 right-4 flex flex-col gap-2">
                {/* Overlay icons if needed */}
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Section: Synopsis */}
        <div className="mt-4 border-t border-white/10 pt-6 text-right">
          <h3 className="mb-2 text-lg font-semibold text-slate-200">
            : خلاصه فیلم
          </h3>
          <p className="text-sm leading-relaxed text-slate-400 md:text-base">
            {anime.synopsis}
          </p>
        </div>
      </div>
    </div>
  );
}
