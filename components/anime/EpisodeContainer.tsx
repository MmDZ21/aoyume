import { Download } from "lucide-react";
import { buttonVariants } from "../ui/button";
import { cn } from "@/lib/utils";

export interface DownloadItem {
  id: string | number;
  quality: string;
  size: string;
  link: string;
  resolution?: string; // e.g., "1080p", "720p"
  episode: number;
}

const EpisodeContainer = ({ item }: { item: DownloadItem }) => {
  return (
    <div className="border-primary/20 bg-primary/5 dark:bg-primary/20 hover:border-primary flex flex-col items-center gap-4 rounded-2xl border p-4 text-center transition-all hover:shadow-[0_0_20px_-5px_rgba(59,130,246,0.15)] sm:flex-row sm:items-center sm:justify-between sm:text-left">
      <div className="text-foreground/50 flex flex-col gap-2 text-sm text-center sm:flex-row sm:flex-wrap sm:gap-6 sm:text-left sm:text-base">
        <span>قسمت {item.episode}</span>
        <span>کیفیت: {item.resolution}p </span>
        <span>حجم: {item.size} MB</span>
      </div>

      <a
        href={item.link}
        className={cn(
          buttonVariants(),
          "w-full md:w-fit px-8 py-5 text-center has-[>svg]:px-8 has-[>svg]:py-5 "
        )}
      >
        <Download className="h-5 w-5" />
        دانلود انیمه
      </a>
    </div>
  );
};

export default EpisodeContainer;
