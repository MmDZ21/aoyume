import { Metadata } from "next";
import { createClient } from "@/utils/supabase/server";
import { mapRowToMediaItem } from "@/lib/mappers";
import MediaCard, { MediaItem } from "@/components/carousel/MediaCard";
import { Pagination } from "@/components/ui/pagination-control";
import { SimpleSort } from "@/components/search/SimpleSort";

type Props = {
  params: Promise<{ slug: string }>;
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const genreName = decodeURIComponent(slug);

  return {
    title: `دانلود و تماشای انیمه‌های ژانر ${genreName} | AoYume`,
    description: `آرشیو کامل انیمه‌های ${genreName} با زیرنویس فارسی و لینک مستقیم`,
    alternates: {
      canonical: `/anime/genre/${slug}`,
    },
  };
}

export default async function GenrePage({ params, searchParams }: Props) {
  const { slug } = await params;
  const sp = await searchParams;
  const genre = decodeURIComponent(slug);
  
  console.log(`[GenrePage] Fetching genre: "${genre}" (slug: "${slug}")`);

  const sort = typeof sp.sort === "string" ? sp.sort : "newest";
  const currentPage = Number(sp.page) || 1;
  const itemsPerPage = 30;

  const supabase = await createClient();

  // Normalize genre name from URL to match DB casing
  const { data: allGenres } = await supabase.rpc("get_all_genre");
  const matchedGenre = allGenres?.find(g => 
    g.english_name.toLowerCase() === genre.toLowerCase()
  );
  const queryGenre = matchedGenre ? matchedGenre.english_name : genre;

  console.log(`[GenrePage] Input: "${genre}", Resolved: "${queryGenre}"`);

  // Build Query
  let queryBuilder = supabase
    .from("complete_anime_details_materialized")
    .select("*", { count: "exact" })
    .eq("post_status", 1)
    .contains("genre_names_en", [queryGenre]);

  // Sorting
  if (sort === "popular") {
    queryBuilder = queryBuilder.order("post_hit", { ascending: false });
  } else if (sort === "score") {
    queryBuilder = queryBuilder.order("dic_rating", { ascending: false, nullsFirst: false });
  } else {
    // Default newest
    queryBuilder = queryBuilder.order("created_at", { ascending: false });
  }

  // Pagination
  const from = (currentPage - 1) * itemsPerPage;
  const to = from + itemsPerPage - 1;
  queryBuilder = queryBuilder.range(from, to);

  const { data: animeList, error, count } = await queryBuilder;

  console.log(`[GenrePage] Result count: ${count}, Error:`, error);

  if (error) {
    console.error("Genre Page Error:", error);
  }

  const items: MediaItem[] = animeList ? animeList.map(mapRowToMediaItem) : [];
  const totalPages = count ? Math.ceil(count / itemsPerPage) : 0;

  const displayGenre = matchedGenre ? matchedGenre.persian_name : genre;

  return (
    <div className="container mx-auto px-4 py-8 min-h-screen">
       <div className="flex flex-col items-center justify-center space-y-2 mb-8 md:mb-12">
        <h1 className="text-3xl md:text-4xl font-extrabold tracking-tight text-primary">
          انیمه‌های ژانر {displayGenre}
        </h1>
        <p className="text-muted-foreground text-lg">
           لیست کامل انیمه‌های {displayGenre} با زیرنویس فارسی
        </p>
      </div>

      <SimpleSort />

      {items.length > 0 ? (
        <>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4 md:gap-6">
            {items.map((item) => (
              <MediaCard key={item.id} item={item} />
            ))}
          </div>
          
          <div className="mt-8">
            <Pagination currentPage={currentPage} totalPages={totalPages} />
          </div>
        </>
      ) : (
        <div className="text-center py-12 text-muted-foreground">
          هیچ انیمه‌ای در این ژانر یافت نشد.
        </div>
      )}
    </div>
  );
}
