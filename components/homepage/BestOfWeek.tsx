import React from "react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";

const BestOfWeek = () => {
  return (
    <section className="relative my-8 h-auto w-full overflow-hidden rounded-2xl px-4 py-8 md:h-[500px] md:px-16 md:py-4">
      {/* Background Image */}
      <div className="absolute inset-0 z-0">
        <Image
          src="/images/aot.jpg"
          alt="Background"
          fill
          className="object-cover blur-md"
          priority
        />
        <div className="bg-primary/50 absolute inset-0 rounded-2xl" />
      </div>

      <div className="relative z-10 container mx-auto flex h-full flex-col justify-center px-4">
        {/* Header */}
        <div className="mb-8 flex items-center justify-between">
          <div className="flex items-center gap-2 text-2xl font-bold text-white">
            <div className="h-8 w-1.5 rounded-full bg-blue-600"></div>
            <span>منتخب هفته</span>
          </div>
        </div>

        {/* Main Content Grid */}
        <div className="flex flex-col gap-8 md:flex-row md:items-start">
          {/* 1. Poster (Right side in RTL) */}
          <div className="group relative mx-auto w-[200px] shrink-0 md:mx-0 lg:w-[240px]">
            <div className="aspect-2/3 overflow-hidden rounded-xl shadow-2xl">
              <Image
                src="/images/aot.jpg"
                alt="Poster"
                fill
                className="rounded-2xl object-cover"
              />
            </div>
            <Button
              size="icon"
              className="absolute right-4 bottom-4 rounded-xl border border-white/20 bg-white/20 text-white backdrop-blur-md transition-colors hover:bg-white/40"
            >
              <Plus className="size-6" />
            </Button>
          </div>

          {/* 2. Description (Center) */}
          <div className="flex flex-1 flex-col text-right text-white">
            <h2
              className="mb-2 text-center text-3xl font-bold md:text-right"
              dir="ltr"
            >
              Uncut Games 2020
            </h2>
            <p className="mb-8 text-justify leading-loose text-gray-200/90 md:pl-12">
              و متون بلکه روزنامه و مجله در ستون و سطرآنچنان که لازم است و برای
              شرایط فعلی تکنولوژی مورد نیاز و کاربردهای متنوع با هدف بهبود
              ابزارهای کاربردی می باشد. کتابهای زیادی در شصت و سه درصد گذشته،
              حال و آینده شناخت فراوان جامعه و متخصصان را می طلبد تا با نرم
              افزارها شناخت بیشتری را برای طراحان رایانه ای علی الخصوص طراحان
              خلاقی و فرهنگ پیشرو در زبان فارسی ایجاد کرد.
            </p>
            <div className="flex justify-center md:justify-end">
              <Button
                size="lg"
                className="w-full md:w-auto"
              >
                مشاهده انیمه
              </Button>
            </div>
          </div>

          {/* 3. Stats & Metadata (Left side in RTL) */}
          <div className="mt-4 flex w-full shrink-0 flex-col gap-6 text-gray-300 md:mt-0 md:w-[250px]">
            {/* Genres */}
            <div className="flex flex-wrap justify-center gap-2 md:justify-end">
              {["خانوادگی", "اکشن", "کمدی"].map((genre) => (
                <div
                  key={genre}
                  className="cursor-default rounded-full border border-white/20 px-5 py-1.5 text-sm text-white transition hover:bg-white/10"
                >
                  {genre}
                </div>
              ))}
            </div>

            {/* Ratings */}
            <div className="space-y-3 text-sm">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2" dir="ltr">
                  <span className="font-bold text-white">7.5</span>
                  <span className="text-xs text-gray-400">از 10</span>
                  <span className="text-xs text-gray-500">(115,954 رای)</span>
                </div>
                <span>: امتیاز AnimeList</span>
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2" dir="ltr">
                  <span className="font-bold text-white">7.5</span>
                  <span className="text-xs text-gray-400">از 10</span>
                  <span className="text-xs text-gray-500">(115,954 رای)</span>
                </div>
                <span>: امتیاز MyAnimeList</span>
              </div>
            </div>

            <div className="my-1 h-px w-full bg-linear-to-l from-transparent via-white/20 to-transparent" />

            {/* Schedule */}
            <div className="space-y-3 text-sm">
              <div className="flex items-center justify-between">
                <span className="text-white">چهارشنبه‌ها ساعت ۲۰:۳۰</span>
                <span>: زمان پخش</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-white">۱۲ قسمت</span>
                <span>: قسمت ها</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default BestOfWeek;
