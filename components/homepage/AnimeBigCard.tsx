import Image from "next/image";
import { Button, buttonVariants } from "@/components/ui/button";
import { PlayCircle, Plus } from "lucide-react";
import { cn, slugify } from "@/lib/utils";
import { Database } from "@/types/database.types";
import Link from "next/link";

type AnimeDetailsRow = Database["public"]["Views"]["complete_anime_details_materialized"]["Row"];

interface AnimeBigCardProps {
  anime: AnimeDetailsRow;
}

const AnimeBigCard = ({ anime }: AnimeBigCardProps) => {
  const title = anime.dic_title || anime.title_en_normalized || "Unknown";
  const latestUpdate = anime.last_update || "نامشخص";
  const genres = Array.isArray(anime.genres)
    ? (anime.genres as unknown as { name_fa?: string }[])
        .map((g) => g.name_fa)
        .filter((g): g is string => !!g)
    : anime.genre_names_en || [];
  const score = anime.dic_score || "0";
  const malScore = anime.dic_rating || "0"; // Assuming dic_rating is MAL score or similar numeric rating
  const broadcastTime = anime.broadcast_fa || anime.broadcast_en || "نامشخص";
  const episodes = anime.episodes_en || anime.episodes_fa || "?";
  const description = anime.summary_fa || anime.summary_en || "";
  const background = anime.wide_image ? `${process.env.IMAGE_URL}${anime.wide_image}` : (anime.dic_image_url ? `${process.env.IMAGE_URL}${anime.dic_image_url}` : "/images/placeholder.jpg");
  const poster = anime.dic_image_url ? `${process.env.IMAGE_URL}${anime.dic_image_url}` : (anime.mal_image_url || "/images/placeholder.jpg");
  const href = `/anime/${anime.anime_id}/${slugify(anime.dic_title!)}`;

  return (
    <section className="relative my-8 h-auto w-full overflow-hidden rounded-2xl px-4 py-8 md:h-[500px] md:px-16 md:py-4 shadow-2xl">
      {/* Background Image */}
      <div className="absolute inset-0 z-0">
        <Image
          src={background}
          alt="Background"
          fill
          className="object-cover"
          priority
        />
        <div className="bg-gradient-to-br from-black/75 via-black/70 to-black/75 dark:from-background/90 dark:via-background/85 dark:to-background/90 absolute inset-0 rounded-2xl" />
      </div>

      <div className="relative z-10 container mx-auto flex h-full flex-col justify-center px-4">
        {/* Header */}
        <div className="mb-8 flex gap-4 items-center justify-between">
          <div className="flex items-center gap-2 text-2xl font-bold text-white">
            <PlayCircle className="text-primary size-8" />
            <span>منتخب هفته</span>
          </div>
          <div className="border-white/30 hidden h-px flex-1 border-t border-dashed sm:block" />
        </div>

        {/* Main Content Grid */}
        <div className="flex flex-col gap-8 md:flex-row md:items-start">
          {/* 1. Poster (Right side in RTL) */}
          <div className="group relative mx-auto w-[200px] shrink-0 md:mx-0 lg:w-[240px]">
            <div className="aspect-2/3 overflow-hidden rounded-xl shadow-2xl">
              <Image
                src={poster}
                alt="Poster"
                fill
                className="rounded-2xl object-cover"
              />
            </div>
            <Button
              size="icon"
              className="absolute right-4 bottom-4 rounded-xl border border-white/30 bg-white/20 text-white backdrop-blur-md transition-colors hover:bg-white/30"
            >
              <Plus className="size-6" />
            </Button>
          </div>

          {/* 2. Description (Center) */}
          <div className="flex flex-1 flex-col text-right text-white">
            <h2
              className="mb-2 text-center text-3xl font-bold md:text-right"
              dir="ltr"
            >
              {anime.dic_title || "Unknown"}
            </h2>
            <p className="mb-8 text-justify leading-loose text-white/90 md:pl-12 line-clamp-4">
              {description}
            </p>
            <div className="flex justify-center md:justify-start">
              <Button size="lg" className="w-full md:w-auto" asChild>
                <Link href={href}>
                  مشاهده انیمه
                </Link>
              </Button>
            </div>
          </div>

          {/* 3. Stats & Metadata (Left side in RTL) */}
          <div className="flex flex-col gap-6 text-right max-w-[280px]">

              <div className="flex flex-wrap gap-4 justify-start">
                {genres.slice(0, 6).map((genre) => (
                  <span
                    key={genre}
                    className={cn(buttonVariants({ variant: "outline" }), "border-white/30 text-white bg-white/10 hover:bg-white/20 hover:text-white")}
                  >
                    {genre}
                  </span>
                ))}
              </div>

              <div className="grid w-full max-w-md grid-cols-1 gap-y-8 text-sm text-white">
                <div className="flex items-center justify-between gap-4">
                  <span className="text-white/80">امتیاز AoYume :</span>
                  <span className="font-medium text-white">
                    <span className="font-bold text-chart-5">{score}</span> از 10
                  </span>
                </div>
                <div className="flex items-center justify-between gap-4">
                  <span className="text-white/80">امتیاز MyAnimeList :</span>
                  <span className="font-medium text-white">
                    <span className="font-bold text-chart-5">{malScore}</span> از 10
                  </span>
                </div>
                <div className="flex items-center justify-between gap-4">
                  <span className="text-white/80"> زمان پخش :</span>
                  <span className="text-white">{broadcastTime}</span>
                </div>
                <div className="flex items-center justify-between gap-4">
                  <span className="text-white/80">قسمت ها :</span>
                  <span className="text-white">{episodes} قسمت</span>
                </div>
              </div>
            </div>
        </div>
      </div>
    </section>
  );
};


export default AnimeBigCard;
