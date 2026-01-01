import { getCurrentSeasonYear, getPaginatedAnimes } from "@/lib/data";
import { SeasonalFilters } from "@/components/anime/SeasonalFilters";
import MediaCard, { MediaItem } from "@/components/carousel/MediaCard";
import { mapRowToMediaItem } from "@/lib/mappers";
import { Pagination } from "@/components/ui/pagination-control";
import { SimpleSort } from "@/components/search/SimpleSort";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "انیمه‌های فصلی | AoYume",
  description: "آرشیو کامل انیمه‌های فصلی",
};

interface SeasonalIndexPageProps {
  searchParams: Promise<{
    page?: string;
    sort?: string;
  }>;
}

export default async function SeasonalIndexPage({ searchParams }: SeasonalIndexPageProps) {
  const currentData = await getCurrentSeasonYear();
  const season = (currentData?.season as string) || "winter";
  const year = Number(currentData?.year) || new Date().getFullYear();

  const { page, sort: sortParam } = await searchParams;

  const currentPage = Number(page) || 1;
  const itemsPerPage = 30;
  const sort = sortParam || "newest";

  const { data: animeList, count } = await getPaginatedAnimes({
    page: currentPage,
    limit: itemsPerPage,
    season,
    year,
    sort,
  });

  const items: MediaItem[] = animeList ? animeList.map(mapRowToMediaItem) : [];
  const totalPages = count ? Math.ceil(count / itemsPerPage) : 0;

  // Map season english names to persian for display
  const seasonNames: Record<string, string> = {
    spring: "بهار",
    summer: "تابستان",
    fall: "پاییز",
    winter: "زمستان",
  };

  return (
    <div className="container mx-auto min-h-screen px-4 py-8">
      <div className="mb-12 flex flex-col items-center justify-center space-y-4">
        <h1 className="text-4xl font-extrabold tracking-tight text-primary lg:text-5xl">
          انیمه‌های فصل {seasonNames[season] || season} {year}
        </h1>
        <p className="text-lg text-muted-foreground">
          مشاهده و دانلود جدیدترین انیمه‌های فصلی
        </p>
      </div>

      <div className="mb-8 flex justify-center">
        <SeasonalFilters defaultSeason={season} defaultYear={year.toString()} />
      </div>

      <SimpleSort />

      {items.length > 0 ? (
        <>
          <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 md:gap-6 lg:grid-cols-5 xl:grid-cols-6">
            {items.map((item) => (
              <MediaCard key={item.id} item={item} />
            ))}
          </div>
          
          <div className="mt-8">
            <Pagination currentPage={currentPage} totalPages={totalPages} />
          </div>
        </>
      ) : (
        <div className="rounded-xl border border-primary/20 bg-card/30 py-12 text-center text-muted-foreground">
          <p className="text-xl">برای فصل و سال انتخاب شده انیمه‌ای یافت نشد.</p>
        </div>
      )}
    </div>
  );
}
