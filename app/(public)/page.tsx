

import Popular from "@/components/homepage/Popular";
import Seasonal from "@/components/homepage/Seasonal";
import SliderContainer from "@/components/slider/SliderContainer";
import { Suspense } from "react";
import { SliderSkeleton } from "@/components/slider/SliderSkeleton";
import { CarouselSkeleton } from "@/components/carousel/CarouselSkeleton";
import BestOfWeek from "@/components/homepage/BestOfWeek";

export default function Home() {
  return (
    <div className="w-full space-y-4 py-8 md:space-y-8">
      <Suspense fallback={<SliderSkeleton />}>
        <SliderContainer />
      </Suspense>
      
      {/* Wrap data-fetching components in Suspense */}
      <Suspense fallback={<CarouselSkeleton />}>
        <Seasonal />
      </Suspense>
      <Suspense fallback={<CarouselSkeleton />}>
        <Popular />
      </Suspense>
      
      <div className="border-foreground/80 hidden h-px flex-1 border-t border-dashed sm:block" />
      
      <BestOfWeek />
    </div>
  );
}
