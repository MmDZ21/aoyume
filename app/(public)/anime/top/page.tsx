import { Metadata } from "next";
import { createClient } from "@/utils/supabase/server";
import { mapRowToMediaItem } from "@/lib/mappers";
import MediaCard, { MediaItem } from "@/components/carousel/MediaCard";
import { Pagination } from "@/components/ui/pagination-control";
import { SimpleSort } from "@/components/search/SimpleSort";

type Props = {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
};

export const metadata: Metadata = {
  title: "برترین انیمه‌ها | AoYume",
  description: "لیست برترین انیمه‌های تاریخ با بالاترین امتیاز",
  alternates: {
    canonical: "/anime/top",
  },
};

export default async function TopPage({ searchParams }: Props) {
  const sp = await searchParams;
  
  const sort = typeof sp.sort === "string" ? sp.sort : "score";
  const currentPage = Number(sp.page) || 1;
  const itemsPerPage = 30;

  const supabase = await createClient();

  // Build Query
  let queryBuilder = supabase
    .from("complete_anime_details_materialized")
    .select("*", { count: "exact" })
    .eq("post_status", 1);

  // Sorting
  if (sort === "popular") {
    queryBuilder = queryBuilder.order("post_hit", { ascending: false });
  } else if (sort === "newest") {
    queryBuilder = queryBuilder.order("created_at", { ascending: false });
  } else {
    // Default score or explicit sort=score
    queryBuilder = queryBuilder.order("dic_rating", {
      ascending: false,
      nullsFirst: false,
    });
  }

  // Pagination
  const from = (currentPage - 1) * itemsPerPage;
  const to = from + itemsPerPage - 1;
  queryBuilder = queryBuilder.range(from, to);

  const { data: animeList, error, count } = await queryBuilder;

  if (error) {
    console.error("Top Page Error:", error);
  }

  const items: MediaItem[] = animeList ? animeList.map(mapRowToMediaItem) : [];
  const totalPages = count ? Math.ceil(count / itemsPerPage) : 0;

  return (
    <div className="container mx-auto min-h-screen px-4 py-8">
      <div className="mb-8 flex flex-col items-center justify-center space-y-2 md:mb-12">
        <h1 className="text-primary text-3xl font-extrabold tracking-tight md:text-4xl">
          برترین انیمه‌ها
        </h1>
        <p className="text-muted-foreground text-lg">
          لیست برترین انیمه‌ها بر اساس امتیاز کاربران
        </p>
      </div>

      <SimpleSort defaultValue="score" />

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
        <div className="text-muted-foreground py-12 text-center">
          هیچ انیمه‌ای یافت نشد.
        </div>
      )}
    </div>
  );
}

