import MediaCarouselController from "@/components/homepage/MediaCarouselController";
import BestOfWeek from "@/components/homepage/BestOfWeek";
import SliderContainer from "@/components/slider/SliderContainer";

export default function Home() {
  return (
    <div className="w-full py-8 space-y-4 md:space-y-8">
      <SliderContainer />
      <MediaCarouselController />
      <MediaCarouselController />
      <div className="border-foreground/80 hidden h-px flex-1 border-t border-dashed sm:block" />
      <BestOfWeek />
    </div>
  );
}
