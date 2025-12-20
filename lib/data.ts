import { createClient } from "@/utils/supabase/server";
import { cache } from "react";
import { AnilistResponse, EpisodesList, MalListResponse } from "@/types/anime";
import { CommentWithReplies } from "@/types/comment";
import { QueryData } from "@supabase/supabase-js";

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
  const { data, error } = await supabase.functions.invoke<MalListResponse | { data?: MalListResponse; error?: string }>("mal-anime-list", {
    body: { username: username },
  });

  if (error) {
    console.error("Supabase Error (Mal Anime List):", error);
    console.error("Error details:", JSON.stringify(error, null, 2));
    throw new Error(`Failed to fetch MAL list: ${error.message || "Unknown error"}`);
  }
  
  // Handle case where function returns wrapped response
  if (data && typeof data === 'object' && !Array.isArray(data)) {
    // Check if it's an error response
    if ('error' in data && data.error) {
      throw new Error(`MAL API error: ${data.error}`);
    }
    
    // Check if data is wrapped in a 'data' property
    if ('data' in data && Array.isArray(data.data)) {
      return data.data;
    }
    
    // Log the unexpected structure for debugging
    console.error("MAL API returned unexpected object structure:", JSON.stringify(data, null, 2));
    throw new Error(`MAL API returned unexpected data format. Expected array, got object with keys: ${Object.keys(data).join(', ')}`);
  }
  
  // Check if data is an array (expected format)
  if (!Array.isArray(data)) {
    console.error("MAL API returned non-array data:", data);
    console.error("Data type:", typeof data);
    throw new Error(`MAL API returned unexpected data format. Expected array, got ${typeof data}.`);
  }
  
  return data;
});

export const getUserWatchlist = cache(async (userId: string) => {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from("user_anime_list")
    .select(`
      *,
      anime:complete_anime_details_materialized(*)
    `)
    .eq("user_id", userId);

  if (error) {
    console.error("Error fetching watchlist:", error);
    return [];
  }
  return data;
});

export const getAnimeComments = cache(async (animeId: number, page: number = 1, limit: number = 10) => {
  const supabase = await createClient();
  const start = (page - 1) * limit;
  const end = start + limit - 1;

  // 1. Get top-level comments with count (for pagination)
  const commentsQuery = supabase
    .from("comments")
    .select(`
      *,
      profiles (
        name,
        avatar
      ),
      replies:comments!parent_id(count)
    `, { count: "exact" })
    .eq("anime_id", animeId)
    .eq("verified", true)
    .is("parent_id", null)
    .order("created_at", { ascending: false })
    .range(start, end);

  // 2. Get total count of all verified comments for this anime (including replies)
  const totalCountQuery = supabase
    .from("comments")
    .select('id', { count: 'exact', head: true })
    .eq("anime_id", animeId)
    .eq("verified", true);

  const [commentsResult, totalCountResult] = await Promise.all([commentsQuery, totalCountQuery]);

  const { data, error, count: topLevelCount } = commentsResult;
  const { count: totalCount } = totalCountResult;

  if (error) {
    console.error("Supabase Error (Comments):", error);
    return { comments: [], count: 0, totalCount: 0 };
  }

  type CommentsWithProfileAndCount = QueryData<typeof commentsQuery>;

  const comments: CommentWithReplies[] = (data as CommentsWithProfileAndCount).map((item) => ({
    ...item,
    name: item.profiles?.name || null,
    avatar: item.profiles?.avatar || null,
    replies_count: Array.isArray(item.replies) && item.replies.length > 0 
      ? item.replies[0].count 
      : 0,
    replies: []
  }));

  // Return both counts: 'count' for pagination (top-level), 'totalCount' for display (all)
  return { comments, count: topLevelCount || 0, totalCount: totalCount || 0 };
});

export const getCommentReplies = cache(async (commentId: string) => {
  const supabase = await createClient();
  
  const query = supabase
    .from("comments")
    .select(`
      *,
      profiles (
        name,
        avatar
      ),
      replies:comments!parent_id(count)
    `)
    .eq("parent_id", commentId)
    .eq("verified", true)
    .order("created_at", { ascending: true });
    
  type RepliesWithProfile = QueryData<typeof query>;

  const { data, error } = await query;

  if (error) {
    console.error("Supabase Error (Replies):", error);
    return [];
  }
  
  const replies: CommentWithReplies[] = (data as RepliesWithProfile).map((item) => ({
    ...item,
    name: item.profiles?.name || null,
    avatar: item.profiles?.avatar || null,
    replies_count: Array.isArray(item.replies) && item.replies.length > 0 
      ? item.replies[0].count 
      : 0,
    replies: []
  }));

  return replies;
});
