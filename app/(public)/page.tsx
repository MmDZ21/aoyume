import MediaCarouselController from "@/components/homepage/MediaCarouselController";
import BestOfWeek from "@/components/homepage/BestOfWeek";
import SliderContainer from "@/components/slider/SliderContainer";

export default function Home() {
  return (
    <div className="w-full py-8">
      <SliderContainer />
      <MediaCarouselController />
      <MediaCarouselController />
      <BestOfWeek />
    </div>
  );
}
