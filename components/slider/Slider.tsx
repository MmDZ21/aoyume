"use client";
import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Autoplay, Pagination } from "swiper/modules";
import { Button } from "@/components/ui/button";
import { Play, Bookmark, ChevronRight, ChevronLeft } from "lucide-react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

// Mock data
const slides = [
  {
    id: 1,
    title: "عنوان انیمه",
    description:
      "سرنوشت جهان در تعادل است زیرا «ارن» قدرت نهایی تایتان‌ها را آزاد می‌کند. او با عزم شدیدی برای از بین بردن همه کسانی که الدیا را تهدید می‌کنند، ارتش غیرقابل توقفی از تایتان‌های عظیم‌الجثه را به سمت مارلی هدایت می‌کند.",
    image: "/images/aot.jpg",
  },
  {
    id: 2,
    title: "فریرن: فراتر از پایان سفر",
    description:
      "پس از شکست دادن پادشاه شیاطین، گروه قهرمانان به خانه بازمی‌گردند و از هم جدا می‌شوند. فریرن، جادوگر الف، به دلیل عمر طولانی‌اش شاهد پیر شدن و مرگ دوستانش می‌شود و سفری را برای درک بهتر انسان‌ها آغاز می‌کند.",
    image: "images/frieren.jpg",
  },
  {
    id: 3,
    title: "جوجوتسو کایسن",
    description:
      "یوجی ایتادوری، دانش‌آموزی با قدرت بدنی فوق‌العاده، برای نجات دوستش انگشت نفرین‌شده‌ای را می‌خورد و میزبان سوکونا، پادشاه نفرین‌ها، می‌شود. او به دبیرستان جوجوتسو می‌پیوندد تا یاد بگیرد چگونه قدرت خود را کنترل کند.",
    image: "/images/jujutsu.jpg",
  },
];

const Slider = () => {
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
          <SwiperSlide key={slide.id} className="relative h-full w-full">
            {/* Background Image */}
            <div
              className="absolute inset-0 bg-cover bg-center"
              style={{ backgroundImage: `url(${slide.image})` }}
            >
              {/* Gradient Overlay */}
              <div className="from-primary md:from-primary absolute inset-0 bg-linear-to-t via-transparent to-transparent md:bg-linear-to-l md:to-transparent" />
            </div>

            {/* Content */}
            <div className="relative z-30 flex h-full flex-col justify-end px-4 pb-12 text-center text-white md:w-1/2 md:items-start md:justify-center md:px-16 md:pb-0 md:text-right">
              <div className="flex w-full max-w-[600px] flex-col items-center justify-center gap-2 md:items-start">
                <h2 className="mb-2 text-2xl font-bold md:mb-4 md:text-4xl lg:text-5xl">
                  {slide.title}
                </h2>
                {/* Mobile Subtitle */}
                <p className="mb-4 text-sm text-gray-200 md:hidden">
                  زیرنویس چسبیده | پخش آنلاین
                </p>
                {/* Desktop Description */}
                <p className="mb-8 line-clamp-3 hidden text-sm leading-relaxed text-gray-200 md:block md:text-sm">
                  {slide.description}
                </p>
              </div>
              <div className="flex w-full items-center gap-3 md:w-auto md:gap-4">
                {/* Bookmark Button - Icon only on mobile */}
                <Button
                  variant="outline"
                  size="default"
                  className="aspect-square size-12 border-white bg-transparent p-0 text-white hover:bg-white/20 hover:text-white md:aspect-auto md:h-10 md:w-auto md:px-8 md:text-base"
                >
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

        {/* Navigation Buttons - Hidden on mobile */}
        <button className="image-swiper-button-prev bg-primary/50 hover:bg-primary/70 absolute top-1/2 right-4 z-20 hidden size-12 -translate-y-1/2 items-center justify-center rounded-full text-white backdrop-blur-sm transition-colors disabled:opacity-50 md:flex">
          <ChevronRight className="size-7" />
        </button>
        <button className="image-swiper-button-next bg-primary/50 hover:bg-primary/70 absolute top-1/2 left-4 z-20 hidden size-12 -translate-y-1/2 items-center justify-center rounded-full text-white backdrop-blur-sm transition-colors disabled:opacity-50 md:flex">
          <ChevronLeft className="size-7" />
        </button>
      </Swiper>
    </section>
  );
};

export default Slider;
