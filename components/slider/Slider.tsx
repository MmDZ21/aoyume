"use client";
import React from "react";
import Image from "next/image";
import Link from "next/link";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Autoplay, Pagination, EffectFade } from "swiper/modules";
import { Button } from "@/components/ui/button";
import { Play, Bookmark, ChevronRight, ChevronLeft } from "lucide-react";
import parse from "html-react-parser";

// Import Swiper styles
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/effect-fade";

export interface SliderItem {
  id: number;
  title: string;
  image: string;
  description: string;
  slug: string;
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
        modules={[Navigation, Autoplay, Pagination, EffectFade]}
        effect="fade"
        fadeEffect={{ crossFade: true }}
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
            className="group relative h-full w-full rounded-2xl"
          >
            {/* Background Image */}
            <div className="absolute inset-0 rounded-2xl">
              <Image
                src={slide.image}
                alt={slide.title}
                fill
                className="rounded-2xl object-cover"
                priority={true}
              />
              {/* Gradient Overlay */}
              <div className="absolute inset-0 z-10 rounded-2xl">
                <div className="absolute inset-0 rounded-2xl bg-linear-to-t from-black/60 to-transparent md:bg-linear-to-l dark:from-background"></div>
              </div>
            </div>

            {/* Content */}
            <div className="absolute inset-x-0 bottom-24 z-30 flex flex-col px-4 text-center md:bottom-auto md:top-[60px] md:w-1/2 md:items-start md:px-16 md:text-right">
              <div className="flex w-full max-w-[600px] flex-col items-center justify-center gap-2 md:items-start">
                <h2
                  dir="ltr"
                  className="text-primary-foreground dark:text-foreground mb-2 line-clamp-2 text-2xl font-bold md:mb-4 md:text-4xl lg:text-5xl"
                >
                  {slide.title}
                </h2>
                {/* Mobile Subtitle */}
                <p className="text-primary-foreground dark:text-foreground mb-4 text-sm md:hidden">
                  زیرنویس چسبیده | پخش آنلاین
                </p>
                {/* Desktop Description */}
                <div className="hidden md:block">
                  <div className="text-primary-foreground dark:text-foreground mb-8 line-clamp-4 text-sm leading-relaxed md:text-sm">
                    {parse(slide.description)}
                  </div>
                </div>
              </div>
            </div>

            {/* Action Buttons - Inside Slide */}
            <div className="absolute bottom-8 left-0 right-0 z-20 flex items-center justify-start gap-4 px-4 md:px-16 pointer-events-none">
              <div className="pointer-events-none group-[.swiper-slide-active]:pointer-events-auto flex w-full max-w-md items-center gap-3 md:w-auto md:gap-4">
                {/* Watch Button - Full width on mobile */}
                <Button
                  size="default"
                  className="bg-primary text-primary-foreground hover:bg-primary/90 h-12 flex-1 gap-2 text-sm md:h-10 md:flex-none md:px-8 md:text-base"
                  asChild
                >
                  <Link href={`/anime/${slide.id}/${slide.slug}`}>
                    <Play className="fill-current" size={20} />
                    <span>مشاهده انیمه</span>
                  </Link>
                </Button>
                {/* Bookmark Button - Icon only on mobile */}
                <Button variant="outline" className="h-12 md:h-10 bg-white/20 text-white border-white/30 hover:bg-white/30 hover:text-white backdrop-blur-sm dark:bg-white/10 dark:border-white/20 dark:hover:bg-white/20">
                  <Bookmark size={20} />
                  <span className="hidden md:mr-2 md:inline">
                    افزودن به لیست تماشا
                  </span>
                </Button>
              </div>
            </div>
          </SwiperSlide>
        ))}

        {/* Bottom Controls - Navigation Only */}
        <div className="absolute bottom-8 left-0 right-0 z-20 flex items-center justify-end gap-4 px-4 md:px-16 pointer-events-none">
          {/* Navigation Buttons - Hidden on mobile, bottom left on desktop */}
          <div
            className="pointer-events-auto hidden gap-3 md:flex"
            dir="ltr"
          >
            <button className="image-swiper-button-next bg-primary/50 hover:bg-primary/70 flex size-12 items-center justify-center rounded-xl text-primary-foreground backdrop-blur-sm transition-colors disabled:opacity-50">
              <ChevronLeft className="size-7" />
            </button>
            <button className="image-swiper-button-prev bg-primary/50 hover:bg-primary/70 flex size-12 items-center justify-center rounded-xl text-primary-foreground backdrop-blur-sm transition-colors disabled:opacity-50">
              <ChevronRight className="size-7" />
            </button>
          </div>
        </div>
      </Swiper>
    </section>
  );
};

export default Slider;
