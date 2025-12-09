import { createClient } from "@/utils/supabase/server";
import { cache } from "react";
import { EpisodesList } from "@/types/anime";

// Data fetching function with cache control
export const getAnimeDetails = cache(async (id: number) => {
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
export const getAnimeEpisodes = cache(async (id: number) => {
  const supabase = await createClient();
  const { data, error } = await supabase.rpc("get_episodes_grouped_by_quality", {
    anime_id_param: id,
  });

  if (error) {
    console.error("Supabase Error (Episodes):", error);
    return [];
  }

  const imageBaseUrl = process.env.IMAGE_URL || "";
  const episodesList = data as unknown as EpisodesList;

  // Prepend IMAGE_URL to thumbnails since client components can't access process.env.IMAGE_URL
  const episodesWithImages = episodesList.map((group) => ({
    ...group,
    episodes: group.episodes.map((episode) => ({
      ...episode,
      thumbnail: episode.thumbnail ? `${imageBaseUrl}${episode.thumbnail}` : episode.thumbnail,
    })),
  }));

  return episodesWithImages;
});
