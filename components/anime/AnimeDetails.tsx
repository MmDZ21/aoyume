import Image from "next/image";
import { cn } from "@/lib/utils";
import type { AnimeDetails as AnimeDetailsType } from "@/types/anime";
import { buttonVariants } from "../ui/button";
import { RatingBox } from "./RatingBox";
import { WatchStatusBox } from "./WatchStatusBox";

interface AnimeDetailsProps {
  anime: AnimeDetailsType;
  className?: string;
}

export function AnimeDetails({ anime, className }: AnimeDetailsProps) {
  const coverImage = anime.cover || anime.poster;

  return (
    <div
      className={cn(
        "border-primary/20 relative w-full overflow-hidden rounded-2xl border-2",
        className
      )}
    >
      {/* Background Image */}
      <div className="absolute inset-0 z-0">
        <Image
          src={coverImage}
          alt={`${anime.title} cover`}
          fill
          className="object-cover"
          priority
          quality={75}
        />
        {/* Dark overlay for better text readability */}
        <div className="from-background to-background/80 absolute inset-0 bg-linear-to-r" />
      </div>

      <div className="relative z-10 flex flex-col gap-8 p-6 md:p-10">
        <div className="flex flex-col gap-8 lg:flex-row lg:items-stretch lg:justify-between">
          {/* Stats Section (Desktop: Right, Mobile: Bottom) */}
          <div className="order-2 flex shrink-0 flex-row gap-4 lg:order-2 lg:w-64 lg:flex-col">
            <RatingBox currentRating={8} />
            <WatchStatusBox currentStatus={"watching"} />
          </div>

          {/* Poster and Info Section Grouped Together */}
          <div className="order-1 flex flex-col gap-6 lg:flex-row lg:items-start">
            {/* Poster Section */}
            <div className="group relative mx-auto shrink-0 lg:mx-0">
              <div className="relative h-96 w-64 overflow-hidden rounded-2xl shadow-2xl">
                <Image
                  src={anime.poster}
                  alt={anime.title}
                  fill
                  className="object-cover"
                />
                <div className="absolute top-4 right-4 flex flex-col gap-2">
                  {/* Overlay icons if needed */}
                </div>
              </div>
            </div>

            {/* Info Section */}
            <div className="flex flex-col gap-6 text-right">
              <h1 className="text-2xl font-bold text-center md:text-left md:text-3xl">{anime.title}</h1>

              <div className={cn(buttonVariants({ variant: "default" }))}>
                {anime.latestUpdate}
              </div>

              <div className="flex flex-wrap gap-4 justify-center md:justify-start">
                {anime.genres.map((genre) => (
                  <span
                    key={genre}
                    className={cn(buttonVariants({ variant: "outline" }))}
                  >
                    {genre}
                  </span>
                ))}
              </div>

              <div className="grid w-full max-w-md grid-cols-1 gap-y-8 text-sm">
                <div className="flex items-center justify-between gap-4">
                  <span>امتیاز AoYume :</span>
                  <span className="font-medium">
                    <span className="font-bold text-yellow-500">{anime.score}</span> از 10
                  </span>
                </div>
                <div className="flex items-center justify-between gap-4">
                  <span>امتیاز MyAnimeList :</span>
                  <span className="font-medium">
                    <span className="font-bold text-yellow-500">{anime.myAnimeListScore}</span> از 10
                  </span>
                </div>
                <div className="flex items-center justify-between gap-4">
                  <span> زمان پخش :</span>
                  <span>{anime.broadcastTime}</span>
                </div>
                <div className="flex items-center justify-between gap-4">
                  <span>قسمت ها :</span>
                  <span>{anime.episodes} قسمت</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Section: Synopsis */}
        <div className="mt-4 border-t border-white/10 pt-6 text-right">
          <h3 className="mb-2 text-lg font-semibold">خلاصه انیمه :</h3>
          <p className="text-sm leading-relaxed md:text-sm">
            {anime.synopsis}
          </p>
        </div>
      </div>
    </div>
  );
}
