import { getPaginatedAnimes } from "@/lib/data";
import { mapRowToMediaItem } from "@/lib/mappers";
import MediaCard, { MediaItem } from "@/components/carousel/MediaCard";
import { Pagination } from "@/components/ui/pagination-control";
import { SimpleSort } from "@/components/search/SimpleSort";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "لیست انیمه‌ها | AoYume",
  description: "مشاهده تمام انیمه‌ها",
};

interface AnimePageProps {
  searchParams: Promise<{
    sort?: string;
    page?: string;
  }>;
}

export default async function AnimePage({ searchParams }: AnimePageProps) {
  const params = await searchParams;
  const sort = params.sort || "newest";
  const currentPage = Number(params.page) || 1;
  const itemsPerPage = 30;

  const { data: animeList, count } = await getPaginatedAnimes({
    page: currentPage,
    limit: itemsPerPage,
    sort,
    genre: "all",
    season: "all",
    status: "all",
    year: null,
  });

  const items: MediaItem[] = animeList ? animeList.map(mapRowToMediaItem) : [];
  const totalPages = count ? Math.ceil(count / itemsPerPage) : 0;

  return (
    <div className="container mx-auto px-4 py-8 min-h-screen">
      <div className="flex flex-col md:flex-row items-center justify-between mb-8">
        <div className="mb-4 md:mb-0">
          <h1 className="text-3xl font-bold text-primary mb-2">لیست انیمه‌ها</h1>
          <p className="text-muted-foreground">آرشیو کامل انیمه‌های آئويومه</p>
        </div>
        <SimpleSort />
      </div>

      {items.length > 0 ? (
        <>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4 md:gap-6">
            {items.map((item) => (
              <MediaCard key={item.id} item={item} />
            ))}
          </div>
          
          <Pagination currentPage={currentPage} totalPages={totalPages} />
        </>
      ) : (
        <div className="text-center py-12 text-muted-foreground">
          موردی یافت نشد.
        </div>
      )}
    </div>
  );
}

