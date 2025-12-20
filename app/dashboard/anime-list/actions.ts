"use server";

import { getALAnimeList, getMalAnimeList, getUserWatchlist } from "@/lib/data";
import { createClient } from "@/utils/supabase/server";
import { ALMediaEntry, MalAnimeEntry } from "@/types/anime";

export async function importAniList(username: string) {
  try {
    const data = await getALAnimeList(username);

    if (Array.isArray(data)) {
      return { success: false, error: "Failed to fetch AniList data" };
    }

    const lists = data?.data?.MediaListCollection?.lists || [];
    const allEntries = lists.flatMap((list) => list.entries || []);

    return {
      success: true,
      data: {
        lists,
        allEntries,
      },
    };
  } catch (error) {
    console.error("Error in importAniList:", error);
    return {
      success: false,
      error: error instanceof Error ? error.message : "Unknown error",
    };
  }
}

export async function importMalList(username: string) {
  try {
    const data = await getMalAnimeList(username);

    if (!Array.isArray(data)) {
      console.error("MAL data is not an array:", data);
      return { 
        success: false, 
        error: `Unexpected data format from MAL API. Expected array, got ${typeof data}.` 
      };
    }

    if (data.length === 0) {
      return { 
        success: false, 
        error: "No anime entries found for this MAL username." 
      };
    }

    return {
      success: true,
      data,
    };
  } catch (error) {
    console.error("Error in importMalList:", error);
    return {
      success: false,
      error: error instanceof Error ? error.message : "Unknown error occurred while importing MAL list",
    };
  }
}

// Map AniList status to status number
function mapAniListStatus(status: string): number {
  const statusMap: Record<string, number> = {
    CURRENT: 2, // watching
    PLANNING: 1, // planToWatch
    COMPLETED: 3, // completed
    DROPPED: 4, // dropped
    PAUSED: 5, // onHold
    REPEATING: 2, // watching
  };
  return statusMap[status] ?? 1; // Default to planToWatch
}

// Map MAL status number to status number
function mapMalStatus(status: number): number {
  const statusMap: Record<number, number> = {
    1: 2, // watching (MAL 1 -> watching 2)
    2: 3, // completed (MAL 2 -> completed 3)
    3: 5, // on_hold (MAL 3 -> onHold 5)
    4: 4, // dropped (MAL 4 -> dropped 4)
    6: 1, // plan_to_watch (MAL 6 -> planToWatch 1)
  };
  return statusMap[status] ?? 1; // Default to planToWatch
}

// Convert AniList entries to operations format
function mapAniListToOperations(entries: ALMediaEntry[]): any[] {
  return entries
    .filter((entry) => entry.media?.idMal != null) // Only include entries with MAL ID
    .map((entry) => ({
      anime_id: entry.media.idMal!, // Use MAL ID from AniList data (non-null assertion after filter)
      num_watched_episodes: entry.progress || 0,
      score: entry.score || 0,
      status: mapAniListStatus(entry.status),
    }));
}

// Convert MAL entries to operations format
function mapMalToOperations(entries: MalAnimeEntry[]): any[] {
  return entries.map((entry) => ({
    anime_id: entry.anime_id, // MAL anime ID
    num_watched_episodes: entry.num_watched_episodes || 0,
    score: entry.score || 0,
    status: mapMalStatus(entry.status),
  }));
}

// Extract notes from MAL entries (separate from operations since RPC doesn't handle notes)
function extractMalNotes(
  entries: MalAnimeEntry[]
): Array<{ anime_id: number; notes: string | null }> {
  return entries
    .map((entry) => {
      const notes = entry.editable_notes || entry.notes || null;
      const notesValue = notes && notes.trim() !== "" ? notes.trim() : null;
      return {
        anime_id: entry.anime_id,
        notes: notesValue,
      };
    })
    .filter((item) => item.notes !== null); // Only include entries with notes
}

// Bulk update watchlist with AniList data
export async function bulkUpdateWatchlistFromAniList(username: string) {
  try {
    const supabase = await createClient();
    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user) {
      return { success: false, error: "User not authenticated" };
    }

    const importResult = await importAniList(username);
    if (!importResult.success) {
      return importResult;
    }

    const allEntries = importResult.data?.allEntries || [];
    const operations = mapAniListToOperations(allEntries);

    const { data, error } = await supabase.rpc(
      "bulk_update_watchlist_with_mal_id",
      {
        operations,
        user_id_param: user.id,
      }
    );

    if (error) {
      console.error("Error in bulk_update_watchlist_with_mal_id:", error);
      return { success: false, error: error.message };
    }

    return {
      success: true,
      data,
      importedCount: operations.length,
    };
  } catch (error) {
    console.error("Error in bulkUpdateWatchlistFromAniList:", error);
    return {
      success: false,
      error: error instanceof Error ? error.message : "Unknown error",
    };
  }
}

// Bulk update watchlist with MAL data
export async function bulkUpdateWatchlistFromMal(username: string) {
  try {
    const supabase = await createClient();
    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user) {
      return { success: false, error: "User not authenticated" };
    }

    const importResult = await importMalList(username);
    if (!importResult.success) {
      return importResult;
    }

    const malEntries = Array.isArray(importResult.data)
      ? importResult.data
      : [];

    const operations = mapMalToOperations(malEntries);
    const notesEntries = extractMalNotes(malEntries);

    // Bulk update watchlist entries
    const { data, error } = await supabase.rpc(
      "bulk_update_watchlist_with_mal_id",
      {
        operations,
        user_id_param: user.id,
      }
    );

    if (error) {
      console.error("Error in bulk_update_watchlist_with_mal_id:", error);
      return { success: false, error: error.message };
    }

    // Update notes separately (RPC doesn't handle notes)
    if (notesEntries.length > 0) {
      // Get anime_id for each MAL ID
      const { data: animeData, error: animeError } = await supabase
        .from("animes")
        .select("anime_id, mal_id")
        .in(
          "mal_id",
          notesEntries.map((e) => e.anime_id)
        );

      if (!animeError && animeData) {
        // Create a map of mal_id -> anime_id
        const malToAnimeId = new Map(
          animeData.map((a) => [a.mal_id, a.anime_id])
        );

        // Update notes for each entry
        const notesUpdates = notesEntries
          .map((entry) => {
            const animeId = malToAnimeId.get(entry.anime_id);
            if (!animeId) return null;
            return { animeId, notes: entry.notes };
          })
          .filter(
            (item): item is { animeId: number; notes: string | null } =>
              item !== null
          );

        // Batch update notes
        for (const { animeId, notes } of notesUpdates) {
          await supabase
            .from("user_anime_list")
            .update({ notes })
            .eq("anime_id", animeId)
            .eq("user_id", user.id);
        }
      }
    }

    return {
      success: true,
      data,
      importedCount: operations.length,
    };
  } catch (error) {
    console.error("Error in bulkUpdateWatchlistFromMal:", error);
    return {
      success: false,
      error: error instanceof Error ? error.message : "Unknown error",
    };
  }
}

export async function updateWatchlistEntry(
  animeId: number,
  statusId: number,
  score: number,
  episodes: number,
  notes: string
) {
  try {
    const supabase = await createClient();
    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user) {
      return { success: false, error: "User not authenticated" };
    }

    const { data, error } = await supabase.rpc("update_watchlist_entry", {
      anime_id_param: animeId,
      new_status: statusId,
      new_score: score,
      new_episode: episodes,
      user_id_param: user.id,
    });

    if (error) {
      console.error("Error updating watchlist entry:", error);
      return { success: false, error: error.message };
    }

    // Update notes separately since the RPC doesn't support it
    if (notes !== undefined) {
      const { error: notesError } = await supabase
        .from("user_anime_list")
        .update({ notes })
        .eq("anime_id", animeId)
        .eq("user_id", user.id);

      if (notesError) {
        console.error("Error updating notes:", notesError);
      }
    }

    return { success: true, data };
  } catch (error) {
    console.error("Error in updateWatchlistEntry:", error);
    return {
      success: false,
      error: error instanceof Error ? error.message : "Unknown error",
    };
  }
}

// Fetch watchlist for client-side refresh
export async function fetchWatchlist() {
  try {
    const supabase = await createClient();
    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user) {
      return { success: false, error: "User not authenticated" };
    }

    const watchlist = await getUserWatchlist(user.id);
    return {
      success: true,
      data: watchlist,
    };
  } catch (error) {
    console.error("Error fetching watchlist:", error);
    return {
      success: false,
      error: error instanceof Error ? error.message : "Unknown error",
    };
  }
}
