"use client";
import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Autoplay } from "swiper/modules";
import { Button } from "@/components/ui/button";
import { Play, Bookmark, ChevronRight, ChevronLeft } from "lucide-react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/navigation";

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
    <section className="relative h-[400px] w-full md:h-[400px]">
      <Swiper
        dir="rtl"
        modules={[Navigation, Autoplay]}
        navigation={{
          nextEl: ".image-swiper-button-next",
          prevEl: ".image-swiper-button-prev",
          disabledClass: "swiper-button-disabled",
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
              {/* Gradient Overlay - Dark on Right (Content side) to Transparent on Left */}
              <div className="from-primary absolute inset-0 bg-linear-to-l to-transparent" />
            </div>

            {/* Content */}
            <div className="gap- relative z-10 flex h-fit max-w-[600px] flex-col justify-center text-right text-white">
              <div>
                <h2 className="mb-4 text-3xl font-bold md:text-4xl lg:text-5xl">
                  {slide.title}
                </h2>
                <p className="mb-8 line-clamp-3 text-sm leading-relaxed text-gray-200 md:text-sm">
                  {slide.description}
                </p>
              </div>
              <div className="flex flex-wrap gap-4">
                <Button
                  size="lg"
                  className="bg-primary text-primary-foreground hover:bg-primary/90 gap-2 text-base"
                >
                  <Play className="fill-current" size={20} />
                  مشاهده انیمه
                </Button>
                <Button
                  variant="outline"
                  size="lg"
                  className="gap-2 border-white bg-transparent text-base text-white hover:bg-white/20 hover:text-white"
                >
                  <Bookmark size={20} />
                  افزودن به لیست تماشا
                </Button>
              </div>
            </div>
          </SwiperSlide>
        ))}

        {/* Navigation Buttons */}
        <div className="absolute bottom-8 left-8 z-20 flex gap-4 ltr:right-8 ltr:left-auto rtl:right-auto rtl:left-8">
          <button className="image-swiper-button-prev bg-primary/50 flex size-12 items-center justify-center rounded-lg text-white backdrop-blur-sm transition-colors hover:bg-white/20 disabled:opacity-50">
            <ChevronRight size={28} />
          </button>
          <button className="image-swiper-button-next bg-primary/50 flex size-12 items-center justify-center rounded-lg text-white backdrop-blur-sm transition-colors hover:bg-white/20 disabled:opacity-50">
            <ChevronLeft size={28} />
          </button>
        </div>
      </Swiper>
    </section>
  );
};

export default Slider;
