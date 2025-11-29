import { Download } from "lucide-react";
import { cn } from "@/lib/utils";

export interface DownloadItem {
  id: string | number;
  quality: string;
  size: string;
  link: string;
  resolution?: string; // e.g., "1080p", "720p"
}

export interface DownloadBoxProps {
  title?: string;
  items: DownloadItem[];
  className?: string;
}

export function DownloadBox({
  title = "دانلود باکس",
  items,
  className,
}: DownloadBoxProps) {
  // Group items by resolution if needed, or just render a flat list.
  // For a reusable server component without client-side state for tabs inside the download box,
  // we might want to show all, or rely on a parent component to filter.
  // Based on the design, there are quality buttons. If we want to keep it server-side,
  // those buttons might be links to query params (e.g. ?quality=1080) or we just display all and let client handle simple filtering if strictly needed,
  // BUT the user asked for "server side as possible".
  // 
  // Option A: Show all qualities in sections.
  // Option B: The quality selector requires interactivity (Client Component).
  //
  // However, the user said "do not make unnecessary client components".
  // A quality filter is a perfect candidate for a small client component wrapper, OR
  // we can just list them all or grouping them.
  // 
  // Let's look at the previous code. It had buttons for 480/720/1080.
  // If we want to make it reusable and server-side, we can accept the "qualities" list and "items" list.
  // But the interaction (clicking a quality filters the list) is inherently client-side.
  // 
  // Strategy:
  // Make a "DownloadSection" component that takes items and renders them.
  // If filtering is required, we can wrap it in a Client Component that manages the filter state,
  // but pass the data in props.
  //
  // The user's prompt "make it flexible and reusable" suggests separating the UI.
  
  return (
    <div className={cn("space-y-8", className)}>
      {/* Header */}
      <div className="text-right">
        <h2 className="text-xl font-bold text-white">{title}</h2>
      </div>

      {/* List */}
      <div className="flex flex-col gap-4">
        {items.map((item) => (
          <div
            key={item.id}
            className="group flex items-center justify-between rounded-2xl border border-[#1e293b] bg-[#0f172a] p-4 transition-all hover:border-blue-500/50 hover:shadow-[0_0_20px_-5px_rgba(59,130,246,0.15)]"
          >
            <div className="flex items-center gap-8 text-slate-400">
              <span className="font-mono text-lg">{item.quality}</span>
              <span className="font-mono text-lg text-blue-500">
                {item.size}
              </span>
            </div>

            <a 
              href={item.link}
              className="flex items-center gap-3 rounded-xl bg-[#1e293b] px-6 py-3 text-sm font-medium text-slate-200 transition-colors group-hover:bg-blue-600 group-hover:text-white"
            >
              <Download className="h-5 w-5" />
              دانلود انیمه
            </a>
          </div>
        ))}
      </div>
    </div>
  );
}

