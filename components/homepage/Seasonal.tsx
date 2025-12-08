import React from "react";
import MediaCarousel from "../carousel/MediaCarousel";
import { createClient } from "@/utils/supabase/server";
import { Database } from "@/types/database.types";
import type { MediaItem } from "../carousel/MediaCard";
import { cache } from "react";

type AnimeDetailsRow = Database["public"]["Views"]["complete_anime_details_materialized"]["Row"];

// Cache the data fetching to deduplicate requests if rendered multiple times
const getSeasonalAnime = cache(async () => {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from("complete_anime_details_materialized")
    .select("*")
    .eq("season", "fall")
    .eq("seasonYear", 2025)
    .limit(10)
    .order("post_hit", { ascending: false });

  if (error) {
    console.error("Supabase Error:", error);
    throw new Error("Failed to fetch anime data");
  }

  return data;
});

const Seasonal = async () => {
  const data = await getSeasonalAnime();

  if (!data || data.length === 0) {
    return null;
  }

  // Map database data to MediaItem format
  const items: MediaItem[] = data
    .filter(
      (item): item is AnimeDetailsRow & { anime_id: number } =>
        item.anime_id !== null
    )
    .map((item) => {
      const year = item.air_date
        ? new Date(item.air_date).getFullYear()
        : new Date().getFullYear();

      return {
        id: item.anime_id,
        title: item.dic_title || item.title_en_normalized || "Unknown",
        image:
          process.env.IMAGE_URL +
          (item.dic_image_url ||
            item.mal_image_url ||
            "/images/placeholder.jpg"),
        rating: item.dic_rating || parseFloat(item.dic_score || "0") || 0,
        year: year,
        duration: item.duration_en || item.duration_fa || "24m",
        description: item.summary_fa || item.summary_en || "",
      };
    });

  return (
    <MediaCarousel
      title="انیمه های فصلی"
      link="/anime/seasonal"
      items={items}
    />
  );
};

export default Seasonal;
