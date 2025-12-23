import { Metadata } from "next";
import { createClient } from "@/utils/supabase/server";
import { mapRowToMediaItem } from "@/lib/mappers";
import MediaCard, { MediaItem } from "@/components/carousel/MediaCard";
import { Pagination } from "@/components/ui/pagination-control";
import { SimpleSort } from "@/components/search/SimpleSort";

type Props = {
  params: Promise<{ status: string }>;
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
};

const statusMap: Record<string, { label: string; value: number }> = {
  ongoing: { label: "در حال پخش", value: 1 },
  completed: { label: "پایان یافته", value: 2 },
  upcoming: { label: "بزودی", value: 3 },
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { status } = await params;
  const statusInfo = statusMap[status.toLowerCase()];
  const persianStatus = statusInfo ? statusInfo.label : status;

  return {
    title: `دانلود و تماشای انیمه‌های ${persianStatus} | AoYume`,
    alternates: {
      canonical: `/anime/status/${status}`,
    },
  };
}

export default async function StatusPage({ params, searchParams }: Props) {
  const { status } = await params;
  const sp = await searchParams;
  const statusLower = status.toLowerCase();
  const statusInfo = statusMap[statusLower];

  if (!statusInfo) {
    return (
      <div className="container mx-auto min-h-screen px-4 py-8 text-center">
        <p className="text-muted-foreground text-lg">وضعیت نامعتبر است.</p>
      </div>
    );
  }

  const sort = typeof sp.sort === "string" ? sp.sort : "newest";
  const currentPage = Number(sp.page) || 1;
  const itemsPerPage = 30;

  const supabase = await createClient();

  // Build Query
  let queryBuilder = supabase
    .from("complete_anime_details_materialized")
    .select("*", { count: "exact" })
    .eq("post_status", 1)
    .eq("dic_status", statusInfo.value);

  // Sorting
  if (sort === "popular") {
    queryBuilder = queryBuilder.order("post_hit", { ascending: false });
  } else if (sort === "score") {
    queryBuilder = queryBuilder.order("dic_rating", {
      ascending: false,
      nullsFirst: false,
    });
  } else {
    // Default newest
    queryBuilder = queryBuilder.order("created_at", { ascending: false });
  }

  // Pagination
  const from = (currentPage - 1) * itemsPerPage;
  const to = from + itemsPerPage - 1;
  queryBuilder = queryBuilder.range(from, to);

  const { data: animeList, error, count } = await queryBuilder;

  if (error) {
    console.error("Status Page Error:", error);
  }

  const items: MediaItem[] = animeList ? animeList.map(mapRowToMediaItem) : [];
  const totalPages = count ? Math.ceil(count / itemsPerPage) : 0;

  return (
    <div className="container mx-auto min-h-screen px-4 py-8">
      <div className="mb-8 flex flex-col items-center justify-center space-y-2 md:mb-12">
        <h1 className="text-primary text-3xl font-extrabold tracking-tight md:text-4xl">
          انیمه‌های {statusInfo.label}
        </h1>
        <p className="text-muted-foreground text-lg">
          لیست کامل انیمه‌های {statusInfo.label} با زیرنویس فارسی
        </p>
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
        <div className="text-muted-foreground py-12 text-center">
          هیچ انیمه‌ای با این وضعیت یافت نشد.
        </div>
      )}
    </div>
  );
}

