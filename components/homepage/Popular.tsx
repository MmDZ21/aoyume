import React from "react";
import MediaCarousel from "../carousel/MediaCarousel";
import { createClient } from "@/utils/supabase/server";
import { Database } from "@/types/database.types";
import type { MediaItem } from "../carousel/MediaCard";
import { cache } from "react";
import { mapRowToMediaItem } from "@/lib/mappers";

type AnimeDetailsRow = Database["public"]["Views"]["complete_anime_details_materialized"]["Row"];

// Cache the data fetching to deduplicate requests if rendered multiple times
const getPopularAnime = cache(async () => {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from("complete_anime_details_materialized")
    .select("*")
    .limit(10)
    .order("post_hit", { ascending: false });

  if (error) {
    console.error("Supabase Error:", error);
    throw new Error("Failed to fetch popular anime data");
  }

  return data;
});

const Popular = async () => {
  const data = await getPopularAnime();

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
      title="محبوب ترین ها"
      link="/browse?sort=popular"
      items={items}
    />
  );
};

export default Popular;
