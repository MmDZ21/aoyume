import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@/components/ui/hover-card";
import { Plus, Star, Calendar, Clock } from "lucide-react";
import { Button } from "../ui/button";
import Link from "next/link";
import Image from "next/image";
import { slugify } from "@/lib/utils";

export interface MediaItem {
  id: number;
  title: string;
  image: string;
  rating: number;
  year: number;
  duration: string;
  description: string;
}

const MediaCard = ({ item }: { item: MediaItem }) => {
  const href = `/anime/${item.id}/${slugify(item.title)}`;

  return (
    <HoverCard openDelay={200} closeDelay={200}>
      <HoverCardTrigger asChild>
        <Link href={href}>
          <div className="group relative aspect-2/3 w-full cursor-pointer overflow-hidden rounded-2xl bg-gray-900">
            {/* Image */}
            <Image
              src={item.image}
              alt={item.title}
              fill
              className="object-cover transition-transform duration-500 group-hover:scale-110"
              sizes="(max-width: 480px) 33vw, (max-width: 640px) 25vw, (max-width: 1024px) 20vw, 16vw"
            />

            {/* Gradient Overlay */}
            <div className="absolute inset-0 bg-linear-to-t from-black/90 via-black/20 to-transparent opacity-60 transition-opacity duration-300 group-hover:opacity-80" />

            {/* Content */}
            <div className="absolute inset-x-0 bottom-0 p-4">
              <h3 className="mb-6 line-clamp-2 text-center text-xl font-bold tracking-wider text-white uppercase shadow-black drop-shadow-lg">
                {item.title}
              </h3>

              {/* Add Button */}
              <div className="absolute right-4 bottom-4 translate-y-0 transition-all duration-300 group-hover:-translate-y-1">
                <Button
                  size="icon"
                  className="hover:bg-primary hover:text-primary-foreground h-10 w-10 rounded-2xl bg-white/20 text-white backdrop-blur-sm"
                >
                  <Plus className="size-6" />
                </Button>
              </div>
            </div>
          </div>
        </Link>
      </HoverCardTrigger>
      <HoverCardContent
        className="w-72 rounded-2xl border-white/10 bg-gray-900/95 text-white backdrop-blur-md md:w-80"
        side="left"
        align="start"
        sideOffset={-10}
      >
        <div className="space-y-4">
          <div className="flex items-start justify-between gap-2">
            <h4 className="text-lg font-bold">{item.title}</h4>
            <div className="bg-primary/20 text-primary flex items-center gap-1 rounded px-1.5 py-0.5 text-xs font-medium">
              <Star className="size-3 fill-current" />
              {item.rating}
            </div>
          </div>

          <div className="flex items-center gap-4 text-xs text-gray-300">
            <div className="flex items-center gap-1">
              <Calendar className="size-3" />
              {item.year}
            </div>
            <div className="flex items-center gap-1">
              <Clock className="size-3" />
              {item.duration}
            </div>
            <div className="rounded border border-gray-600 px-1.5 py-0.5 text-[10px] uppercase">
              HD
            </div>
          </div>

          <p className="line-clamp-4 text-sm leading-relaxed text-gray-300">
            {item.description}
          </p>

          <div className="flex gap-2 pt-2">
            <Button className="bg-primary hover:bg-primary/90 h-9 flex-1 rounded-xl text-xs md:text-sm">
              <Plus className="mr-1 size-4" />
              افزودن به لیست
            </Button>
            <Button
              variant="outline"
              className="h-9 flex-1 rounded-xl border-white/20 bg-transparent text-xs hover:bg-white/10 hover:text-white md:text-sm"
              asChild
            >
              <Link href={href}>مشاهده جزئیات</Link>
            </Button>
          </div>
        </div>
      </HoverCardContent>
    </HoverCard>
  );
};

export default MediaCard;
