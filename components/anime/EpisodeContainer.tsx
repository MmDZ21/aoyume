"use client";

import { Download, PlayCircle, Loader2 } from "lucide-react";
import { buttonVariants } from "../ui/button";
import { cn } from "@/lib/utils";
import Image from "next/image";
import { useState } from "react";
import { createClient } from "@/utils/supabase/client";
import { toast } from "sonner";

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
  const [loading, setLoading] = useState(false);
  const supabase = createClient();

  const handleDownload = async () => {
    try {
      setLoading(true);
      console.log("Invoking web-get-link with id:", item.id);

      const { data, error } = await supabase.functions.invoke("web-get-link", {
        body: { file_id: item.id },
      });

      if (error) {
        console.error("Edge Function Error Details:", error);
        throw error;
      }

      console.log("Edge Function Response:", data);

      if (data?.direct_link) {
        window.open(data.direct_link, "_blank");
      } else {
        throw new Error("Link not found in response");
      }
    } catch (error: any) {
      console.error("Error getting download link:", error);
      let message =
        error?.context?.statusText ||
        error?.message ||
        "خطا در دریافت لینک دانلود";

      if (error?.context?.status === 429 || error?.status === 429) {
        message = "شما به محدودیت دانلود رسیده‌اید";
      }

      toast.error(`خطا: ${message}`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="group bg-muted text-foreground relative flex aspect-video w-full flex-col justify-end overflow-hidden rounded-2xl shadow-md transition-all duration-300 hover:shadow-xl md:aspect-video">
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
          <div className="bg-muted/80 flex h-full w-full items-center justify-center">
            <PlayCircle className="text-muted-foreground/40 h-12 w-12" />
          </div>
        )}

        {/* Gradients */}
        {/* 1. Base Gradient - Adjusted for mobile to match desktop hover style (less visible base, more visible overlay) */}
        <div className="absolute inset-0 bg-linear-to-t from-black/90 via-black/20 to-transparent opacity-40 transition-opacity duration-300 sm:opacity-80 sm:group-hover:opacity-40" />

        {/* 2. Overlay - Visible on mobile to match desktop hover */}
        <div className="bg-background/60 absolute inset-0 opacity-100 backdrop-blur-[2px] transition-all duration-300 sm:opacity-0 sm:group-hover:opacity-100" />
      </div>

      {/* Top Badges */}
      <div className="absolute top-4 left-4 z-20 flex gap-2">
        <span className="bg-background/80 text-foreground group-hover:bg-primary/80 group-hover:text-primary-foreground rounded-full px-3 py-1 text-xs font-medium backdrop-blur-md transition-all duration-300">
          {item.resolution}
        </span>
      </div>

      {/* Content */}
      <div className="relative z-10 w-full p-4 sm:p-6">
        <div className="transform transition-all duration-300 sm:translate-y-8 sm:group-hover:translate-y-0">
          {/* Main Title Row */}
          <div className="flex items-end justify-between">
            <div>
              <h3 className="text-foreground text-xl leading-none font-bold tracking-tight drop-shadow-md sm:text-2xl">
                قسمت {item.episode}
              </h3>
            </div>
          </div>

          {/* Details & Button - Always visible on mobile, expanded on hover for desktop */}
          <div className="mt-4 grid grid-rows-[1fr] opacity-100 transition-all duration-300 sm:grid-rows-[0fr] sm:opacity-0 sm:group-hover:grid-rows-[1fr] sm:group-hover:opacity-100">
            <div className="overflow-hidden">
              {/* Details */}
              <div className="text-foreground mb-4 flex items-center gap-4 text-sm">
                <span className="font-medium">حجم: {item.size} MB</span>
                <span className="bg-foreground/60 h-1 w-1 rounded-full" />
                <span className="font-medium">کیفیت: {item.quality}</span>
              </div>

              {/* Action Button */}
              <button
                onClick={handleDownload}
                disabled={loading}
                className={cn(
                  buttonVariants({ variant: "default" }),
                  "w-full cursor-pointer"
                )}
              >
                {loading ? (
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                ) : (
                  <Download className="mr-2 h-4 w-4" />
                )}
                {loading ? "در حال دریافت..." : "دانلود مستقیم"}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EpisodeContainer;
