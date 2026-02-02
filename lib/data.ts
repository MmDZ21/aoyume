import { createClient } from "@/utils/supabase/server";
import { cache } from "react";
import { AnilistResponse, EpisodesList, MalListResponse } from "@/types/anime";
import { CommentWithReplies } from "@/types/comment";
import { QueryData } from "@supabase/supabase-js";

// Fetch current season and year
export const getCurrentSeasonYear = cache(async () => {
  const supabase = await createClient();
  
  const yearQuery = supabase.rpc("get_current_season_year");
  const seasonQuery = supabase.rpc("get_current_season");

  const [yearResult, seasonResult] = await Promise.all([yearQuery, seasonQuery]);
  
  if (yearResult.error || seasonResult.error) {
    console.error("Supabase Error (Current Season/Year):", yearResult.error || seasonResult.error);
    return { season: "unknown", year: new Date().getFullYear() };
  }

  const year = yearResult.data;
  const season = seasonResult.data;

  return { year, season };
});

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

// Fetch episodes manually from table to bypass RPC limitations
export const getAnimeEpisodes = cache(async (id: number) => {
  const supabase = await createClient();
  
  // Fetch raw episodes from the table
  const { data: rawEpisodes, error } = await supabase
    .from("episodes")
    .select("*")
    .eq("anime_id", id)
    .order("number", { ascending: true });

  if (error) {
    console.error("Supabase Error (Episodes Table):", error);
    return [];
  }

  if (!rawEpisodes) {
    return [];
  }

    // console.log("Raw Episodes Data:", JSON.stringify(rawEpisodes[0], null, 2));

  // Group by quality manually
  const imageBaseUrl = process.env.IMAGE_URL || "";
  const groupedEpisodes: Record<string, typeof rawEpisodes> = {};

  rawEpisodes.forEach((episode) => {
    const quality = episode.quality || "Unknown";
    if (!groupedEpisodes[quality]) {
      groupedEpisodes[quality] = [];
    }
    groupedEpisodes[quality].push(episode);
  });

  // Convert to EpisodesList format
  const episodesList: EpisodesList = Object.entries(groupedEpisodes).map(([quality, episodes]) => ({
    quality,
    episodes: episodes.map((ep) => {
        // Handle subtitles: if it's a string (stringified JSON), parse it.
        let parsedSubtitles = ep.subtitles;
        if (typeof parsedSubtitles === 'string') {
            try {
                parsedSubtitles = JSON.parse(parsedSubtitles);
            } catch (e) {
                console.error("Failed to parse subtitles JSON:", e);
                parsedSubtitles = null;
            }
        }

        return {
            ...ep,
            // Ensure properties match Episode interface
            number: ep.number, 
            thumbnail: ep.thumbnail ? `${imageBaseUrl}${ep.thumbnail}` : null,
            subtitles: parsedSubtitles as { url: string; lang: string }[] | null, // Cast JSON to correct type
            // Provide defaults for missing fields if needed, or rely on TS interface matching
            direct_link_status: ep.direct_link_status as "uploaded" | "pending" | "failed" | "never",
        };
    }),
  }));

  // Sort groups by quality (optional, e.g., 1080p -> 720p -> 480p)
  // Simple alphanumeric sort for now
  episodesList.sort((a, b) => b.quality.localeCompare(a.quality, undefined, { numeric: true }));

  return episodesList;
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

export const getPaginatedAnimes = cache(async (params: {
  page?: number;
  limit?: number;
  genre?: string;
  season?: string;
  year?: number | null;
  status?: string;
  sort?: string;
}) => {
  const {
    page = 1,
    limit = 30,
    genre = "all",
    season = "all",
    year = null,
    status = "all",
    sort = "newest",
  } = params;

  const supabase = await createClient();
  
  let queryBuilder = supabase
    .from("complete_anime_details_materialized")
    .select("*", { count: "exact" })
    .eq("post_status", 1);

  if (genre !== "all") {
    const selectedGenres = genre.split(",");
    queryBuilder = queryBuilder.contains("genre_names_en", selectedGenres);
  }

  if (season !== "all") {
    const validSeasons = ["spring", "summer", "fall", "winter", "unknown"];
    if (validSeasons.includes(season)) {
       // @ts-expect-error - PostgREST filter type mismatch for custom enum
       queryBuilder = queryBuilder.eq("season", season);
    }
  }

  if (year) {
    queryBuilder = queryBuilder.eq("seasonYear", year);
  }

  if (status !== "all") {
    if (status === "airing") queryBuilder = queryBuilder.eq("dic_status", 1);
    else if (status === "finished") queryBuilder = queryBuilder.eq("dic_status", 2);
    else if (status === "not_aired") queryBuilder = queryBuilder.eq("dic_status", 3);
  }

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
  const from = (page - 1) * limit;
  const to = from + limit - 1;
  queryBuilder = queryBuilder.range(from, to);

  const { data, error, count } = await queryBuilder;

  if (error) {
    console.error("Browse Error:", error);
    return { data: [], count: 0 };
  }

  return { data, count };
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
