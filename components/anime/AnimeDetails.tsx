import Image from "next/image";
import Link from "next/link";
import { cn, translateSeason } from "@/lib/utils";
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
  const genres = Array.isArray(anime.genres)
    ? (anime.genres as unknown as { name_fa?: string; name_en?: string }[])
        .filter((g) => g.name_fa && g.name_en)
        .map((g) => ({ name: g.name_fa!, slug: g.name_en! }))
    : (anime.genre_names_en || []).map((g) => ({ name: g, slug: g }));
  const malLink = anime.mal_id ? `https://myanimelist.net/anime/${anime.mal_id}` : null;
  const latestUpdate = anime.last_update || "نامشخص";
  const score = anime.dic_rating || 0;
  const malScore = anime.dic_score ? parseFloat(anime.dic_score) : 0;
  const season = translateSeason(anime.season);
  const seasonYear = anime.seasonYear;
  const episodesRaw = anime.episodes_en || anime.episodes_fa;
  const episodes = episodesRaw && episodesRaw !== "0" && episodesRaw !== "?" && episodesRaw.toLowerCase() !== "unknown" ? `${episodesRaw} قسمت` : "نامشخص";
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
          <div className="order-2 flex shrink-0 flex-col items-center sm:items-stretch sm:flex-row gap-4 lg:order-2 lg:w-64 lg:flex-col">
            <RatingBox currentRating={8} />
            <WatchStatusBox currentStatus={"watching"} />
            {malLink && (
              <div className="flex w-full justify-center sm:hidden">
                <Link
                  href={malLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={cn(
                    buttonVariants({ variant: "outline" }),
                    "w-full text-center text-sm"
                  )}
                >
                  مشاهده در MyAnimeList
                </Link>
              </div>
            )}
          </div>

          {/* Poster and Info Section Grouped Together */}
          <div className="order-1 flex flex-col items-center gap-6 lg:flex-row lg:items-start lg:flex-1">
            {/* Poster Section */}
            <div className="group relative shrink-0">
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
              {malLink && (
                <div className="mt-4 hidden sm:flex justify-center">
                  <Link
                    href={malLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={cn(
                      buttonVariants({ variant: "default" }),
                      "w-full text-center text-sm"
                    )}
                  >
                    مشاهده در MyAnimeList
                  </Link>
                </div>
              )}
            </div>

            {/* Info Section */}
            <div className="flex flex-col gap-6 text-center w-full sm:text-right sm:max-w-sm">
              <div className="flex flex-col gap-2">
                <h1 className="text-2xl font-bold sm:text-start md:text-3xl">{title}</h1>
                {anime.dic_title_en && anime.dic_title_en !== title && (
                  <h2 className="text-sm text-muted-foreground sm:text-start font-medium opacity-80">
                    {anime.dic_title_en}
                  </h2>
                )}
                {anime.title_fa && anime.title_fa !== title && (
                  <h3 className="text-sm text-muted-foreground sm:text-start font-medium opacity-80">
                    {anime.title_fa}
                  </h3>
                )}
              </div>

              {anime.dic_status !== 0 && (
                <div className={cn(buttonVariants({ variant: "default" }), "justify-center text-center sm:justify-center sm:text-left")}>
                  <span className="text-primary-foreground/90">آخرین بروزرسانی: </span>
                  <span className="text-primary-foreground">{latestUpdate}</span>
                </div>
              )}

              <div className="flex flex-wrap gap-4 justify-center sm:justify-start">
                {genres.map((genre) => (
                  <Link key={genre.slug} href={`/anime/genre/${genre.slug}`}>
                    <span
                      className={cn(buttonVariants({ variant: "outline" }))}
                    >
                      {genre.name}
                    </span>
                  </Link>
                ))}
              </div>

              <div className="grid w-full max-w-md mx-auto sm:mx-0 grid-cols-1 gap-y-4 sm:gap-y-8 text-sm">
                <div className="flex items-center justify-between gap-4">
                  <span>امتیاز AoYume :</span>
                  <span className="font-medium">
                    <span className="font-bold text-chart-5">{score}</span> از 10
                  </span>
                </div>
                <div className="flex items-center justify-between gap-4">
                  <span>امتیاز MyAnimeList :</span>
                  <span className="font-medium">
                    <span className="font-bold text-chart-5">{malScore}</span> از 10
                  </span>
                </div>
                <div className="flex items-center justify-between gap-4">
                  <span> زمان پخش :</span>
                  <span>
                    {season && ` ${season} ${seasonYear}`}
                  </span>
                </div>
                <div className="flex items-center justify-between gap-4">
                  <span>قسمت ها :</span>
                  <span>{episodes}</span>
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
