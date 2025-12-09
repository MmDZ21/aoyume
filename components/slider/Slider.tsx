"use client";
import React from "react";
import Image from "next/image";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Autoplay, Pagination } from "swiper/modules";
import { Button } from "@/components/ui/button";
import { Play, Bookmark, ChevronRight, ChevronLeft } from "lucide-react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

export interface SliderItem {
  id: number;
  title: string;
  image: string;
  description: string;
}

interface SliderProps {
  slides: SliderItem[];
}

const Slider = ({ slides }: SliderProps) => {
  if (!slides || slides.length === 0) return null;

  return (
    <section className="relative h-[500px] w-full md:h-[400px]">
      <Swiper
        dir="rtl"
        modules={[Navigation, Autoplay, Pagination]}
        navigation={{
          nextEl: ".image-swiper-button-next",
          prevEl: ".image-swiper-button-prev",
          disabledClass: "swiper-button-disabled",
        }}
        pagination={{
          clickable: true,
          dynamicBullets: true,
        }}
        autoplay={{ delay: 5000 }}
        className="h-full w-full rounded-2xl"
        loop={true}
      >
        {slides.map((slide) => (
          <SwiperSlide
            key={slide.id}
            className="relative h-full w-full rounded-2xl"
          >
            {/* Background Image */}
            <div className="absolute inset-0 rounded-2xl">
              <Image
                src={slide.image}
                alt={slide.title}
                fill
                className="object-cover rounded-2xl"
                priority={true}
              />
              {/* Gradient Overlay */}
              <div className="absolute inset-0 rounded-2xl z-10">
                <div className="from-black dark:from-background absolute inset-0 rounded-2xl bg-linear-to-t to-transparent md:bg-linear-to-l"></div>
              </div>
            </div>

            {/* Content */}
            <div className="relative z-30 flex h-full flex-col justify-end px-4 pb-12 text-center md:w-1/2 md:items-start md:justify-center md:px-16 md:pb-0 md:text-right">
              <div className="flex w-full max-w-[600px] flex-col items-center justify-center gap-2 md:items-start">
                <h2 className="text-primary-foreground dark:text-foreground mb-2 line-clamp-2 text-2xl font-bold md:mb-4 md:text-4xl lg:text-5xl">
                  {slide.title}
                </h2>
                {/* Mobile Subtitle */}
                <p className="text-primary-foreground dark:text-foreground mb-4 text-sm md:hidden">
                  زیرنویس چسبیده | پخش آنلاین
                </p>
                {/* Desktop Description */}
                <div className="hidden md:block">
                  <p className="text-primary-foreground dark:text-foreground mb-8 line-clamp-4 text-sm leading-relaxed md:text-sm">
                    {slide.description}
                  </p>
                </div>
              </div>
              <div className="flex w-full items-center gap-3 md:w-auto md:gap-4">
                {/* Bookmark Button - Icon only on mobile */}
                <Button variant="outline" size="default" className="">
                  <Bookmark size={20} />
                  <span className="hidden md:mr-2 md:inline">
                    افزودن به لیست تماشا
                  </span>
                </Button>

                {/* Watch Button - Full width on mobile */}
                <Button
                  size="default"
                  className="bg-primary text-primary-foreground hover:bg-primary/90 h-12 flex-1 gap-2 text-sm md:h-10 md:flex-none md:px-8 md:text-base"
                >
                  <Play className="fill-current" size={20} />
                  <span>شروع تماشای آنلاین</span>
                </Button>
              </div>
            </div>
          </SwiperSlide>
        ))}

        {/* Navigation Buttons - Hidden on mobile, bottom left on desktop */}
        <div
          className="absolute bottom-8 left-8 z-20 hidden gap-3 md:flex"
          dir="ltr"
        >
          <button className="image-swiper-button-next bg-primary/50 hover:bg-primary/70 flex size-12 items-center justify-center rounded-xl text-white backdrop-blur-sm transition-colors disabled:opacity-50">
            <ChevronLeft className="size-7" />
          </button>
          <button className="image-swiper-button-prev bg-primary/50 hover:bg-primary/70 flex size-12 items-center justify-center rounded-xl text-white backdrop-blur-sm transition-colors disabled:opacity-50">
            <ChevronRight className="size-7" />
          </button>
        </div>
      </Swiper>
    </section>
  );
};

export default Slider;
