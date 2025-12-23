import { createClient } from "@/utils/supabase/server";
import { Filters } from "@/components/search/Filters";
import MediaCard, { MediaItem } from "@/components/carousel/MediaCard";
import { mapRowToMediaItem } from "@/lib/mappers";
import { Metadata } from "next";
import { Pagination } from "@/components/ui/pagination-control";

export const metadata: Metadata = {
  title: "جستجوی پیشرفته | AoYume",
  description: "فیلتر و جستجوی پیشرفته انیمه ها",
};

interface BrowsePageProps {
  searchParams: Promise<{
    genre?: string;
    season?: string;
    year?: string;
    status?: string;
    sort?: string;
    page?: string;
  }>;
}

export default async function BrowsePage({ searchParams }: BrowsePageProps) {
  const params = await searchParams;
  const genreParam = params.genre || "all";
  const season = params.season || "all";
  const year = params.year ? parseInt(params.year) : null;
  const status = params.status || "all";
  const sort = params.sort || "newest";
  const currentPage = Number(params.page) || 1;
  const itemsPerPage = 30;

  const supabase = await createClient();

  // Fetch Genres
  const { data: genresData } = await supabase.rpc("get_all_genre");
  const genres = genresData || [];

  // Build Query
  let queryBuilder = supabase
    .from("complete_anime_details_materialized")
    .select("*", { count: "exact" })
    .eq("post_status", 1);

  if (genreParam !== "all") {
    const selectedGenres = genreParam.split(",");
    queryBuilder = queryBuilder.contains("genre_names_en", selectedGenres);
  }

  if (season !== "all") {
    // Cast season to match Enum type, relying on user providing valid string via select
    // or validating it against known values
    const validSeasons = ["spring", "summer", "fall", "winter", "unknown"];
    if (validSeasons.includes(season)) {
       queryBuilder = queryBuilder.eq("season", season as any);
    }
  }

  if (year) {
    queryBuilder = queryBuilder.eq("seasonYear", year);
  }

  if (status !== "all") {
    if (status === "airing") queryBuilder = queryBuilder.eq("dic_status", 1);
    else if (status === "finished") queryBuilder = queryBuilder.eq("dic_status", 2);
    else if (status === "not_aired") queryBuilder = queryBuilder.eq("dic_status", 3);
  }

  // Sorting
  if (sort === "popular") {
    queryBuilder = queryBuilder.order("post_hit", { ascending: false });
  } else if (sort === "score") {
    queryBuilder = queryBuilder.order("dic_rating", { ascending: false, nullsFirst: false });
  } else {
    // Default newest (created_at or updated_at or last_update)
    // Using created_at based on typical needs, or last_update
    queryBuilder = queryBuilder.order("created_at", { ascending: false });
  }

  // Pagination
  const from = (currentPage - 1) * itemsPerPage;
  const to = from + itemsPerPage - 1;
  queryBuilder = queryBuilder.range(from, to);

  const { data: animeList, error, count } = await queryBuilder;

  if (error) {
    console.error("Browse Error:", error);
  }

  const items: MediaItem[] = animeList ? animeList.map(mapRowToMediaItem) : [];
  const totalPages = count ? Math.ceil(count / itemsPerPage) : 0;

  return (
    <div className="container mx-auto px-4 py-8 min-h-screen">
      <div className="flex flex-col items-center justify-center space-y-2 mb-12">
        <h1 className="text-4xl font-extrabold tracking-tight lg:text-5xl text-primary">آرشیو انیمه‌ها</h1>
        <p className="text-muted-foreground text-lg">جستجوی پیشرفته با فیلترهای دقیق</p>
      </div>
      
      <div className="mb-4 md:mb-8"><Filters genres={genres} /></div>

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
          با فیلترهای انتخاب شده موردی یافت نشد.
        </div>
      )}
    </div>
  );
}
