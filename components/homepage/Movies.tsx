import React from "react";
import MediaCarousel from "../carousel/MediaCarousel";
import { createClient } from "@/utils/supabase/server";
import { Database } from "@/types/database.types";
import type { MediaItem } from "../carousel/MediaCard";
import { cache } from "react";
import { mapRowToMediaItem } from "@/lib/mappers";

type AnimeDetailsRow = Database["public"]["Views"]["complete_anime_details_materialized"]["Row"];

// Cache the data fetching to deduplicate requests if rendered multiple times
const getAnimeMovies = cache(async () => {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from("complete_anime_details_materialized")
    .select("*")
    .eq("post_status", 1)
    .eq("dic_types", 3) // 3 is for Movies
    .limit(10)
    .order("created_at", { ascending: false });

  if (error) {
    console.error("Supabase Error:", error);
    throw new Error("Failed to fetch anime movies data");
  }

  return data;
});

const Movies = async () => {
  const data = await getAnimeMovies();

  if (!data || data.length === 0) {
    return null;
  }

  // Map database data to MediaItem format
  const items: MediaItem[] = data
    .filter(
      (item): item is AnimeDetailsRow & { anime_id: number } =>
        item.anime_id !== null
    )
    .map(mapRowToMediaItem);

  return (
    <MediaCarousel
      title="انیمه‌های سینمایی"
      link="/anime/movies"
      items={items}
    />
  );
};

export default Movies;

