"use client";
import React, { useRef } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import type { Swiper as SwiperType } from "swiper";
import { Navigation } from "swiper/modules";
import {
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import "swiper/css";
import MediaCard from "./MediaCard";
import type { MediaItem } from "./MediaCard";

interface MediaCarouselProps {
  title?: string;
  link?: string;
  items: MediaItem[];
}

const MediaCarousel = ({
  title = "انیمه های در حال پخش",
  link = "#",
  items,
}: MediaCarouselProps) => {
  const swiperRef = useRef<SwiperType>(null);

  if (!items || items.length === 0) {
    return null;
  }

  return (
    <div className="w-full space-y-4">
      {/* Header Section */}
      <div className="flex items-center justify-between gap-4">
        {/* Right Side: Title (RTL: Right is start) */}
        <div className="flex items-center gap-2">
          <div className="bg-primary h-6 w-1 rounded-2xl"></div>
          <h2 className="text-primary dark:text-foreground text-sm font-bold md:text-base">
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
              <MediaCard item={item} />
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </div>
  );
};

export default MediaCarousel;
