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
  subinfo: string;
  direct_link_status: "uploaded" | "pending" | "failed"; // Assuming possible values based on example
}

export interface QualityGroup {
  quality: string;
  episodes: Episode[];
}

export type EpisodesList = QualityGroup[];
