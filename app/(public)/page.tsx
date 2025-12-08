
import BestOfWeek from "@/components/homepage/BestOfWeek";
import Popular from "@/components/homepage/Popular";
import Seasonal from "@/components/homepage/Seasonal";
import SliderContainer from "@/components/slider/SliderContainer";
import { Suspense } from "react";

export default function Home() {
  return (
    <div className="w-full space-y-4 py-8 md:space-y-8">
      <SliderContainer />
      
      {/* Wrap data-fetching components in Suspense */}
      <Suspense fallback={<div className="h-64 w-full animate-pulse rounded-2xl bg-gray-900/20" />}>
        <Seasonal />
      </Suspense>
      <Suspense fallback={<div className="h-64 w-full animate-pulse rounded-2xl bg-gray-900/20" />}>
        <Popular />
      </Suspense>
      
      <div className="border-foreground/80 hidden h-px flex-1 border-t border-dashed sm:block" />
      
      <Suspense fallback={<div className="h-64 w-full animate-pulse rounded-2xl bg-gray-900/20" />}>
        <BestOfWeek />
      </Suspense>
    </div>
  );
}
