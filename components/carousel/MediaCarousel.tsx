"use client";
import React, { useRef } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import type { Swiper as SwiperType } from "swiper";
import { Navigation } from "swiper/modules";
import {
  ChevronLeft,
  ChevronRight,
  Plus,
  Star,
  Calendar,
  Clock,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@/components/ui/hover-card";
import Link from "next/link";

// Import Swiper styles
import "swiper/css";

interface MediaItem {
  id: number;
  title: string;
  image: string;
  rating: number;
  year: number;
  duration: string;
  description: string;
}

// Mock data based on existing images in the project
const items: MediaItem[] = [
  {
    id: 1,
    title: "FREE GUY",
    image: "/images/aot.jpg",
    rating: 8.9,
    year: 2021,
    duration: "120 min",
    description:
      "A bank teller discovers he is actually a background player in an open-world video game, and decides to become the hero of his own story.",
  },
  {
    id: 2,
    title: "FREE GUY",
    image: "/images/frieren.jpg",
    rating: 9.1,
    year: 2023,
    duration: "24 min",
    description:
      "Elven mage Frieren and her fellow adventurers have defeated the Demon King and brought peace to the land.",
  },
  {
    id: 3,
    title: "FREE GUY",
    image: "/images/jujutsu.jpg",
    rating: 8.7,
    year: 2020,
    duration: "24 min",
    description:
      "A boy swallows a cursed talisman - the finger of a demon - and becomes cursed himself.",
  },
  {
    id: 4,
    title: "FREE GUY",
    image: "/images/aot.jpg",
    rating: 8.9,
    year: 2021,
    duration: "120 min",
    description:
      "A bank teller discovers he is actually a background player in an open-world video game.",
  },
  {
    id: 5,
    title: "FREE GUY",
    image: "/images/frieren.jpg",
    rating: 9.1,
    year: 2023,
    duration: "24 min",
    description:
      "Elven mage Frieren and her fellow adventurers have defeated the Demon King.",
  },
  {
    id: 6,
    title: "FREE GUY",
    image: "/images/jujutsu.jpg",
    rating: 8.7,
    year: 2020,
    duration: "24 min",
    description:
      "A boy swallows a cursed talisman - the finger of a demon - and becomes cursed himself.",
  },
  {
    id: 7,
    title: "FREE GUY",
    image: "/images/aot.jpg",
    rating: 8.9,
    year: 2021,
    duration: "120 min",
    description:
      "A bank teller discovers he is actually a background player in an open-world video game.",
  },
];

interface MediaCarouselProps {
  title?: string;
  link?: string;
}

const MediaCarousel = ({
  title = "انیمه های در حال پخش",
  link = "#",
}: MediaCarouselProps) => {
  const swiperRef = useRef<SwiperType>(null);

  return (
    <div className="w-full space-y-4">
      {/* Header Section */}
      <div className="flex items-center justify-between gap-4">
        {/* Right Side: Title (RTL: Right is start) */}
        <div className="flex items-center gap-2">
          <div className="bg-primary h-6 w-1 rounded-2xl"></div>
          <h2 className="text-primary dark:text-foreground text-sm font-bold md:text-sm">
            {title}
          </h2>
        </div>

        {/* Middle: Dashed Line */}
        <div className="border-foreground/80 hidden h-px flex-1 border-t border-dashed sm:block" />

        {/* Left Side: Buttons (RTL: Left is end) */}
        <div className="flex items-center gap-2">
          <div className="flex items-center gap-2">
            <Button
              variant="secondary"
              size="icon"
              className="bg-secondary/50 hover:bg-secondary h-8 w-8 rounded-2xl"
              onClick={() => swiperRef.current?.slidePrev()}
            >
              <ChevronRight className="size-4" />
            </Button>
            <Button
              variant="secondary"
              size="icon"
              className="bg-secondary/50 hover:bg-secondary h-8 w-8 rounded-2xl"
              onClick={() => swiperRef.current?.slideNext()}
            >
              <ChevronLeft className="size-4" />
            </Button>
          </div>
          <Button
            asChild
            variant="default"
            className="rounded-2xl px-6 text-xs md:text-sm"
          >
            <Link href={link}>مشاهده همه</Link>
          </Button>
        </div>
      </div>

      {/* Carousel Section */}
      <div className="overflow-hidden">
        <Swiper
          onBeforeInit={(swiper) => {
            swiperRef.current = swiper;
          }}
          modules={[Navigation]}
          spaceBetween={16}
          slidesPerView={2.2} // Show part of next slide on mobile
          breakpoints={{
            480: {
              slidesPerView: 3.2,
              spaceBetween: 16,
            },
            640: {
              slidesPerView: 4.2,
              spaceBetween: 20,
            },
            1024: {
              slidesPerView: 5.2,
              spaceBetween: 24,
            },
            1280: {
              slidesPerView: 6,
              spaceBetween: 24,
            },
          }}
          dir="rtl"
          className="overflow-visible!" // Allow overflow for aesthetic
        >
          {items.map((item) => (
            <SwiperSlide key={item.id} className="overflow-visible">
              <HoverCard openDelay={200} closeDelay={200}>
                <HoverCardTrigger asChild>
                  <div className="group relative aspect-2/3 w-full cursor-pointer overflow-hidden rounded-2xl bg-gray-900">
                    {/* Image */}
                    <div
                      className="absolute inset-0 bg-cover bg-center transition-transform duration-500 group-hover:scale-110"
                      style={{ backgroundImage: `url(${item.image})` }}
                    />

                    {/* Gradient Overlay */}
                    <div className="absolute inset-0 bg-linear-to-t from-black/90 via-black/20 to-transparent opacity-60 transition-opacity duration-300 group-hover:opacity-80" />

                    {/* Content */}
                    <div className="absolute inset-x-0 bottom-0 p-4">
                      <h3 className="mb-6 text-center text-xl font-bold tracking-wider text-white uppercase shadow-black drop-shadow-lg">
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

                    <p className="text-sm leading-relaxed text-gray-300">
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
                      >
                        مشاهده جزئیات
                      </Button>
                    </div>
                  </div>
                </HoverCardContent>
              </HoverCard>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </div>
  );
};

export default MediaCarousel;
