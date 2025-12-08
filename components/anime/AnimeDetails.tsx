import Image from "next/image";
import { cn } from "@/lib/utils";
import { buttonVariants } from "../ui/button";
import { RatingBox } from "./RatingBox";
import { WatchStatusBox } from "./WatchStatusBox";
import { Synopsis } from "./Synopsis";
import { Database } from "@/types/database.types";

type AnimeDetailsRow = Database["public"]["Views"]["complete_anime_details_materialized"]["Row"];

interface AnimeDetailsProps {
  anime: AnimeDetailsRow;
  className?: string;
}

export function AnimeDetails({ anime, className }: AnimeDetailsProps) {
  const coverImage = process.env.IMAGE_URL + (anime.wide_image || anime.dic_image_url || anime.mal_image_url || "/images/placeholder.jpg");
  const posterImage = process.env.IMAGE_URL + (anime.dic_image_url || anime.mal_image_url || "/images/placeholder.jpg");
  const title = anime.dic_title || anime.title_en_normalized || "Unknown Title";
  const genres = anime.genre_names_en || [];
  const latestUpdate = anime.last_update || "نامشخص";
  const score = anime.dic_rating || 0;
  const malScore = anime.dic_score ? parseFloat(anime.dic_score) : 0;
  const broadcastTime = anime.broadcast_fa || anime.broadcast_en || "Unknown";
  const episodes = anime.episodes_en || anime.episodes_fa || "0";
  const synopsis = anime.summary_fa || anime.summary_en || "No synopsis available.";

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
          alt={`${title} cover`}
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
          <div className="order-2 flex shrink-0 flex-col md:flex-row gap-4 lg:order-2 lg:w-64 lg:flex-col">
            <RatingBox currentRating={8} />
            <WatchStatusBox currentStatus={"watching"} />
          </div>

          {/* Poster and Info Section Grouped Together */}
          <div className="order-1 flex flex-col gap-6 lg:flex-row lg:items-start">
            {/* Poster Section */}
            <div className="group relative mx-auto shrink-0 lg:mx-0">
              <div className="relative h-96 w-64 overflow-hidden rounded-2xl shadow-2xl">
                <Image
                  src={posterImage}
                  alt={title}
                  fill
                  className="object-cover"
                />
                <div className="absolute top-4 right-4 flex flex-col gap-2">
                  {/* Overlay icons if needed */}
                </div>
              </div>
            </div>

            {/* Info Section */}
            <div className="flex flex-col gap-6 text-right max-w-sm">
              <h1 className="text-2xl font-bold text-center md:text-start md:text-3xl">{title}</h1>

              <div className={cn(buttonVariants({ variant: "default" }))}>
                <span className="text-muted-foreground">آخرین بروزرسانی: </span>{latestUpdate}
              </div>

              <div className="flex flex-wrap gap-4 justify-start">
                {genres.map((genre) => (
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
                    <span className="font-bold text-yellow-500">{score}</span> از 10
                  </span>
                </div>
                <div className="flex items-center justify-between gap-4">
                  <span>امتیاز MyAnimeList :</span>
                  <span className="font-medium">
                    <span className="font-bold text-yellow-500">{malScore}</span> از 10
                  </span>
                </div>
                <div className="flex items-center justify-between gap-4">
                  <span> زمان پخش :</span>
                  <span>{broadcastTime}</span>
                </div>
                <div className="flex items-center justify-between gap-4">
                  <span>قسمت ها :</span>
                  <span>{episodes} قسمت</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Section: Synopsis with Show More button */}
        <Synopsis text={synopsis} />
      </div>
    </div>
  );
}
