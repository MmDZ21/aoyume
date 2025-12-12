import { createClient } from "@/utils/supabase/server";
import { cache } from "react";
import { AnilistResponse, EpisodesList, MalListResponse } from "@/types/anime";

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

  // Handle null data - RPC might return null if no episodes found or access denied
  if (!data) {
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

export const getALAnimeList = cache(async (username: string) => {
  const supabase = await createClient();
  const { data, error } = await supabase.functions.invoke<AnilistResponse>("al-anime-list", {
    body: { username: username },
  });

  if (error) {
    console.error("Supabase Error (Anime List):", error);
    return [];
  }
  return data;
});

export const getMalAnimeList = cache(async (username: string) => {
  const supabase = await createClient();
  const { data, error } = await supabase.functions.invoke<MalListResponse>("mal-anime-list", {
    body: { username: username },
  });

  if (error) {
    console.error("Supabase Error (Mal Anime List):", error);
    return [];
  }
  return data;
});