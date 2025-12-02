import MediaCard, { MediaItem } from "@/components/carousel/MediaCard";

interface MediaGridProps {
  items: MediaItem[];
}

export const MediaGrid = ({ items }: MediaGridProps) => (
  <div className="grid grid-cols-2 gap-4 min-[480px]:grid-cols-3 sm:grid-cols-4 sm:gap-5 lg:grid-cols-5 lg:gap-6 xl:grid-cols-6">
    {items.map((item) => (
      <MediaCard key={item.id} item={item} />
    ))}
  </div>
);
