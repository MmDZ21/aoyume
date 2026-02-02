import { createClient } from "@/utils/supabase/server";
import { notFound, redirect } from "next/navigation";
import { AnimeDetails } from "@/components/anime/AnimeDetails";
import { ReusableTabs, TabItem } from "@/components/ui/ReusableTabs";
import {
  AsyncDownloadSection,
  DownloadSectionSkeleton,
} from "@/components/anime/AsyncDownloadSection";
import { AnimeDetailsTable } from "@/components/anime/AnimeDetailsTable";
import { MediaItem } from "@/components/carousel/MediaCard";
import { MediaGrid } from "@/components/carousel/MediaGrid";
import { CommentsSection } from "@/components/comments/CommentsSection";
import { Metadata } from "next";
import { Suspense } from "react";
import { slugify } from "@/lib/utils";
import { mapJsonToMediaItem, RelatedAnimeJson } from "@/lib/mappers";
import { getAnimeDetails, getAnimeEpisodes } from "@/lib/data";
import PlayerWrapper from "@/components/anime/PlayerWrapper";


// Reusable tab content wrapper
const TabContent = ({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) => (
  <div className="space-y-6">
    <h3 className="text-primary dark:text-foreground text-center text-xl font-bold md:text-start">
      {title}
    </h3>
    {children}
  </div>
);

type PageProps = {
  params: Promise<{ id: string; slug: string }>;
};

// 1. Generate Metadata for SEO
export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { id } = await params;
  const animeId = parseInt(id, 10);

  if (isNaN(animeId)) return { title: "Anime Not Found" };

  const anime = await getAnimeDetails(animeId);

  if (!anime) return { title: "Anime Not Found" };

  return {
    title: `${anime.dic_title} | دانلود و تماشای آنلاین`,
    description:
      anime.summary_fa?.substring(0, 160) || `دانلود انیمه ${anime.dic_title}`,
    openGraph: {
      title: anime.dic_title || undefined,
      description: anime.summary_fa?.substring(0, 160) || undefined,
      images: anime.dic_image_url ? [{ url: anime.dic_image_url }] : [],
    },
  };
}

export default async function AnimeDetailsPage({ params }: PageProps) {
  const { id, slug } = await params;
  const animeId = parseInt(id, 10);

  if (isNaN(animeId)) notFound();

  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  // Fetch critical data (Details) - Blocking for SEO/Redirect
  const animeData = await getAnimeDetails(animeId);

  if (!animeData) notFound();

  // Fetch episodes for OnlinePlayer
  const episodes = await getAnimeEpisodes(animeId);

  // Validate Slug for SEO (Canonical URL)
  const expectedSlug = slugify(
    animeData.dic_title || animeData.title_en_normalized || ""
  );
  const currentSlug = decodeURIComponent(slug);

  if (expectedSlug && currentSlug !== expectedSlug) {
    redirect(`/anime/${id}/${expectedSlug}`);
  }

  // Process Related and Similar items (Derived from animeData)
  const relatedItems: MediaItem[] = Array.isArray(animeData.related_anime)
    ? (animeData.related_anime as unknown as RelatedAnimeJson[]).map(
      mapJsonToMediaItem
    )
    : [];

  const similarItems: MediaItem[] = Array.isArray(animeData.recommendations)
    ? (animeData.recommendations as unknown as RelatedAnimeJson[]).map(
      mapJsonToMediaItem
    )
    : [];

  const tabs: TabItem[] = [
    {
      value: "download",
      label: "دانلود",
      content: (
        <Suspense fallback={<DownloadSectionSkeleton />}>
          <AsyncDownloadSection animeId={animeId} hasAccess={!!user} />
        </Suspense>
      ),
    },
    {
      value: "watch",
      label: "پخش آنلاین",
      content: (
        <TabContent title="تماشای آنلاین">
          <PlayerWrapper episodes={episodes} />
        </TabContent>
      ),
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
      content: (
        <div className="text-center text-slate-400">محتوای بخش تریلر</div>
      ),
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
            <CommentsSection animeId={animeId} />
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
