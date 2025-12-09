import { cn } from "@/lib/utils";
import EpisodeContainer, { DownloadItem } from "./EpisodeContainer";

export type { DownloadItem };

export interface DownloadBoxProps {
  title?: string;
  items: DownloadItem[];
  className?: string;
}

export function DownloadBox({ items, className }: DownloadBoxProps) {
  return (
    <div className={cn("w-full", className)}>
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {items.map((item) => (
          <EpisodeContainer key={item.id} item={item} />
        ))}
      </div>
    </div>
  );
}
