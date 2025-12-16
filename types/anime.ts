export interface AnimeDetails {
  id: string;
  title: string;
  poster: string;
  cover?: string;
  genres: string[];
  score: number;
  voters: number; // e.g., 115954
  myAnimeListScore: number;
  myAnimeListVoters: number;
  status: string; // e.g., "Updating"
  latestUpdate: string; // e.g., "Episode 10 Season 2"
  broadcastTime: string; // e.g., "Wednesdays at 20:30"
  episodes: number; // Total episodes
  synopsis: string;
  downloadedCount: number;
  watchedCount: number;
  ageRating?: string; // e.g., "13+ سال"
  network?: string; // e.g., "نت فلیکس"
  networkLogo?: string; // e.g., "N" for Netflix
}

export interface Episode {
  id: number;
  anime_id: number;
  episode_number: number;
  quality: string;
  created_at: string;
  thumbnail: string;
  size: string;
  link: string;
  direct_link: string;
  subinfo: string;
  direct_link_status: "uploaded" | "pending" | "failed";
}

export interface QualityGroup {
  quality: string;
  episodes: Episode[];
}

export type EpisodesList = QualityGroup[];

// AniList Types
export interface ALMediaTitle {
  romaji: string;
  english: string;
  native: string;
  userPreferred: string;
}

export interface ALMediaCoverImage {
  extraLarge: string;
  large: string;
  medium: string;
  color: string;
}

export interface ALMedia {
  id: number;
  idMal?: number; // MAL ID if available
  title: ALMediaTitle;
  coverImage: ALMediaCoverImage;
  episodes?: number;
  status?: string;
  averageScore?: number;
  genres?: string[];
}

export interface ALMediaEntry {
  id: number;
  mediaId: number;
  status: "CURRENT" | "PLANNING" | "COMPLETED" | "DROPPED" | "PAUSED" | "REPEATING";
  score: number;
  progress: number;
  media: ALMedia;
}

export interface ALMediaList {
  name: string;
  isCustomList: boolean;
  entries: ALMediaEntry[];
}

export interface ALMediaListCollection {
  lists: ALMediaList[];
}

export interface AnilistResponse {
  data: {
    MediaListCollection: ALMediaListCollection;
  };
}

// MyAnimeList Types
export interface MalAnimeEntry {
  status: number; // 1: watching, 2: completed, 3: on hold, 4: dropped, 6: plan to watch
  score: number;
  tags: string;
  is_rewatching: number; // 0 or 1
  num_watched_episodes: number;
  created_at: number;
  updated_at: number;
  anime_title: string;
  anime_title_eng: string;
  anime_num_episodes: number;
  anime_airing_status: number; // 1: airing, 2: finished, 3: not yet aired
  anime_id: number;
  anime_studios: any | null; // Placeholder for now
  anime_licensors: any | null; // Placeholder for now
  anime_season: any | null; // Placeholder for now
  anime_total_members: number;
  anime_total_scores: number;
  anime_score_val: number;
  anime_score_diff: number;
  anime_popularity: number;
  has_episode_video: boolean;
  has_promotion_video: boolean;
  has_video: boolean;
  video_url: string;
  genres: any[]; // Placeholder for now
  demographics: any[]; // Placeholder for now
  title_localized: string | null;
  anime_url: string;
  anime_image_path: string;
  is_added_to_list: boolean;
  anime_media_type_string: string;
  anime_mpaa_rating_string: string;
  start_date_string: string | null;
  finish_date_string: string | null;
  anime_start_date_string: string;
  anime_end_date_string: string;
  days_string: string | null;
  storage_string: string;
  priority_string: string;
  notes: string;
  editable_notes: string;
}

export type MalListResponse = MalAnimeEntry[];