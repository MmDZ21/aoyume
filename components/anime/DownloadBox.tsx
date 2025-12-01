import { cn } from "@/lib/utils";
import EpisodeContainer from "./EpisodeContainer";

export interface DownloadItem {
  id: string | number;
  quality: string;
  size: string;
  link: string;
  resolution?: string; // e.g., "1080p", "720p"
  episode: number;
}

export interface DownloadBoxProps {
  title?: string;
  items: DownloadItem[];
  className?: string;
}

export function DownloadBox({ items, className }: DownloadBoxProps) {
  return (
    <div className={cn("space-y-8", className)}>
      {/* List */}
      <div className="flex flex-col gap-4">
        {items.map((item) => (
          <EpisodeContainer key={item.id} item={item} />
        ))}
      </div>
    </div>
  );
}
