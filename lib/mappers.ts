import { MediaItem } from "@/components/carousel/MediaCard";
import { Database } from "@/types/database.types";

export interface RelatedAnimeJson {
  info: string;
  anime_id: number;
  dic_score: string;
  dic_title: string;
  dic_types: number;
  dic_status: number;
  episodes_en: string;
  small_image: string;
  relation_type?: string;
}

export function mapJsonToMediaItem(item: RelatedAnimeJson): MediaItem {
  return {
    id: item.anime_id,
    title: item.dic_title,
    image: item.small_image
      ? `${process.env.IMAGE_URL}${item.small_image}`
      : "/images/placeholder.jpg",
    rating: parseFloat(item.dic_score) || 0,
    year: 0,
    duration: item.episodes_en ? `${item.episodes_en} قسمت` : "",
    description: item.relation_type || "",
  };
}

type AnimeDetailsRow = Database["public"]["Views"]["complete_anime_details_materialized"]["Row"];

export function mapRowToMediaItem(item: AnimeDetailsRow): MediaItem {
  const year = item.air_date
    ? new Date(item.air_date).getFullYear()
    : new Date().getFullYear();

  return {
    id: item.anime_id ?? 0,
    title: item.dic_title || item.title_en_normalized || "Unknown",
    image:
      process.env.IMAGE_URL +
      (item.dic_image_url || item.mal_image_url || "/images/placeholder.jpg"),
    rating: item.dic_rating || parseFloat(item.dic_score || "0") || 0,
    year: year,
    duration: item.duration_en || item.duration_fa || "24m",
    description: item.summary_fa || item.summary_en || "",
  };
}

