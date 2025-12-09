import { createClient } from "@/utils/supabase/server";
import { notFound, redirect } from "next/navigation";
import { AnimeDetails } from "@/components/anime/AnimeDetails";
import { ReusableTabs, TabItem } from "@/components/ui/ReusableTabs";
import { DownloadContainer } from "@/components/anime/DownloadContainer";
import { DownloadItem } from "@/components/anime/DownloadBox";
import { AnimeDetailsTable } from "@/components/anime/AnimeDetailsTable";
import { MediaItem } from "@/components/carousel/MediaCard";
import { MediaGrid } from "@/components/carousel/MediaGrid";
import { CommentsSection } from "@/components/comments/CommentsSection";
import { Metadata } from "next";
import { Suspense, cache } from "react";
import { slugify } from "@/lib/utils";
import { EpisodesList } from "@/types/anime";

interface RelatedAnimeJson {
  info: string;
  anime_id: number;
  dic_score: string;
  dic_title: string;
  dic_types: number;
  dic_status: number;
  episodes_en: string;
  small_image: string;
  relation_type?: string;
}

function mapJsonToMediaItem(item: RelatedAnimeJson): MediaItem {
  return {
    id: item.anime_id,
    title: item.dic_title,
    image: item.small_image ? `${process.env.IMAGE_URL}${item.small_image}` : "/images/placeholder.jpg",
    rating: parseFloat(item.dic_score) || 0,
    year: 0,
    duration: item.episodes_en ? `${item.episodes_en} قسمت` : "",
    description: item.relation_type || "",
  };
}

// Reusable tab content wrapper
const TabContent = ({ title, children }: { title: string; children: React.ReactNode }) => (
  <div className="space-y-6">
    <h3 className="text-center text-xl font-bold text-primary dark:text-foreground md:text-start">
      {title}
    </h3>
    {children}
  </div>
);

type PageProps = {
  params: Promise<{ id: string; slug: string }>;
};

// 1. Generate Metadata for SEO
export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { id } = await params;
  const animeId = parseInt(id, 10);
  
  if (isNaN(animeId)) return { title: "Anime Not Found" };

  const supabase = await createClient();
  const { data: anime } = await supabase
    .from("complete_anime_details_materialized")
    .select("dic_title, summary_fa, dic_image_url")
    .eq("anime_id", animeId)
    .single();

  if (!anime) return { title: "Anime Not Found" };

  return {
    title: `${anime.dic_title} | دانلود و تماشای آنلاین`,
    description: anime.summary_fa?.substring(0, 160) || `دانلود انیمه ${anime.dic_title}`,
    openGraph: {
      title: anime.dic_title || undefined,
      description: anime.summary_fa?.substring(0, 160) || undefined,
      images: anime.dic_image_url ? [{ url: anime.dic_image_url }] : [],
    },
  };
}

// 2. Data fetching function with cache control
const getAnimeDetails = cache(async (id: number) => {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from("complete_anime_details_materialized")
    .select("*")
    .eq("anime_id", id)
    .maybeSingle();

  if (error) {
    console.error("Supabase Error:", error);
    throw new Error("Failed to fetch anime data");
  }

  return data;
});

// Fetch episodes using RPC
const getAnimeEpisodes = cache(async (id: number) => {
  const supabase = await createClient();
  const { data, error } = await supabase.rpc("get_episodes_grouped_by_quality", {
    anime_id_param: id,
  });

  if (error) {
    console.error("Supabase Error (Episodes):", error);
    return [];
  }
  // console.log({episodes: data});
  return data as unknown as EpisodesList;
});

export default async function AnimeDetailsPage({ params }: PageProps) {
  const { id, slug } = await params;
  const animeId = parseInt(id, 10);

  if (isNaN(animeId)) notFound();

  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  // Fetch data in parallel
  const animeDataPromise = getAnimeDetails(animeId);
  const episodesDataPromise = getAnimeEpisodes(animeId);

  const [animeData, episodesData] = await Promise.all([animeDataPromise, episodesDataPromise]);

  if (!animeData) notFound();

  // Validate Slug for SEO (Canonical URL)
  const expectedSlug = slugify(animeData.dic_title || animeData.title_en_normalized || "");
  const currentSlug = decodeURIComponent(slug);

  if (expectedSlug && currentSlug !== expectedSlug) {
    redirect(`/anime/${id}/${expectedSlug}`);
  }

  // Process Related and Similar items
  const relatedItems: MediaItem[] = Array.isArray(animeData.related_anime)
    ? (animeData.related_anime as unknown as RelatedAnimeJson[]).map(mapJsonToMediaItem)
    : [];

  const similarItems: MediaItem[] = Array.isArray(animeData.recommendations)
    ? (animeData.recommendations as unknown as RelatedAnimeJson[]).map(mapJsonToMediaItem)
    : [];

  const tabs: TabItem[] = [
    {
      value: "download",
      label: "دانلود",
      content: <DownloadContainer episodes={episodesData} hasAccess={!!user} />,
    },
    {
      value: "details",
      label: "جزئیات",
      content: (
        <TabContent title="جزئیات کامل">
          <AnimeDetailsTable anime={animeData} />
        </TabContent>
      ),
    },
    {
      value: "trailer",
      label: "تریلر",
      content: <div className="text-center text-slate-400">محتوای بخش تریلر</div>,
    },
    {
      value: "related",
      label: "مرتبط",
      content: (
        <TabContent title="انیمه های مرتبط">
          <MediaGrid items={relatedItems} />
        </TabContent>
      ),
    },
    {
      value: "similar",
      label: "مشابه",
      content: (
        <TabContent title="انیمه های مشابه">
          <MediaGrid items={similarItems} />
        </TabContent>
      ),
    },
    {
      value: "comments",
      label: "نظرات",
      content: (
        <TabContent title="نظرات کاربران">
          {/* 3. Wrap heavy client components in Suspense if they fetch their own data */}
          <Suspense fallback={<div>Loading comments...</div>}>
            <CommentsSection />
          </Suspense>
        </TabContent>
      ),
    },
  ];

  return (
    <div className="w-full space-y-4 py-8 md:space-y-8">
      {/* 4. Use Priority for LCP image in AnimeDetails (passed via props if needed) */}
      <AnimeDetails anime={animeData} />
      <div>
        <ReusableTabs defaultValue="download" tabs={tabs} />
      </div>
    </div>
  );
}
