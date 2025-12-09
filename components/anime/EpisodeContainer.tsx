import { Download, PlayCircle } from "lucide-react";
import { buttonVariants } from "../ui/button";
import { cn } from "@/lib/utils";
import Image from "next/image";

export interface DownloadItem {
  id: string | number;
  quality: string;
  size: string;
  link: string;
  resolution?: string;
  episode: number;
  thumbnail?: string;
}

const EpisodeContainer = ({ item }: { item: DownloadItem }) => {
  return (
    <div className="group relative flex aspect-video w-full flex-col justify-end overflow-hidden rounded-2xl bg-zinc-900 text-white shadow-md transition-all duration-300 hover:shadow-xl md:aspect-video">
      {/* Background Image */}
      <div className="absolute inset-0 z-0">
        {item.thumbnail ? (
          <Image
            src={item.thumbnail}
            alt={`Episode ${item.episode}`}
            fill
            className="object-cover transition-transform duration-700 sm:group-hover:scale-105"
          />
        ) : (
          <div className="flex h-full w-full items-center justify-center bg-zinc-800">
            <PlayCircle className="h-12 w-12 text-white/20" />
          </div>
        )}
        
        {/* Gradients */}
        {/* 1. Base Gradient - Adjusted for mobile to match desktop hover style (less visible base, more visible overlay) */}
        <div className="absolute inset-0 bg-linear-to-t from-black/90 via-black/20 to-transparent opacity-40 transition-opacity duration-300 sm:opacity-80 sm:group-hover:opacity-40" />
        
        {/* 2. Overlay - Visible on mobile to match desktop hover */}
        <div className="absolute inset-0 bg-black/60 opacity-100 backdrop-blur-[2px] transition-all duration-300 sm:opacity-0 sm:group-hover:opacity-100" />
      </div>

      {/* Top Badges */}
      <div className="absolute left-4 top-4 z-20 flex gap-2">
         <span className="rounded-full bg-black/40 px-3 py-1 text-xs font-medium text-white/90 backdrop-blur-md transition-all duration-300 group-hover:bg-primary/80 group-hover:text-primary-foreground">
          {item.resolution}
        </span>
      </div>

      {/* Content */}
      <div className="relative z-10 w-full p-4 sm:p-6">
        <div className="transform transition-all duration-300 sm:translate-y-8 sm:group-hover:translate-y-0">
          
          {/* Main Title Row */}
          <div className="flex items-end justify-between">
            <div>
              <h3 className="text-xl font-bold leading-none tracking-tight text-white drop-shadow-md sm:text-2xl">
                قسمت {item.episode}
              </h3>
            </div>
          </div>

          {/* Details & Button - Always visible on mobile, expanded on hover for desktop */}
          <div className="mt-4 grid grid-rows-[1fr] opacity-100 transition-all duration-300 sm:grid-rows-[0fr] sm:opacity-0 sm:group-hover:grid-rows-[1fr] sm:group-hover:opacity-100">
            <div className="overflow-hidden">
               {/* Details */}
              <div className="mb-4 flex items-center gap-4 text-sm text-gray-200">
                <span className="font-medium text-primary-foreground/90">حجم: {item.size} MB</span>
                <span className="h-1 w-1 rounded-full bg-white/40" />
                <span className="font-medium text-primary-foreground/90">کیفیت: {item.quality}</span>
              </div>

              {/* Action Button */}
              <a
                href={item.link}
                className={cn(
                  buttonVariants({ variant: "default" }),
                  "w-full"
                )}
              >
                <Download className="h-4 w-4" />
                دانلود مستقیم
              </a>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
};

export default EpisodeContainer;
