import Slider from "./Slider";
import { createClient } from "@/utils/supabase/server";

const SliderContainer = async () => {
  const supabase = await createClient();
  const { data: sliderData, error } = await supabase.rpc("get_main_slider");

  if (error) {
    console.error("Error fetching slider data:", error);
    return null;
  }

  if (!sliderData || sliderData.length === 0) {
    return null;
  }

  const slides = sliderData.map((item) => ({
    id: item.anime_id,
    title: item.dic_title || item.title_en_normalized || "Unknown Title",
    image: item.wide_image 
      ? `${process.env.IMAGE_URL}${item.wide_image}` 
      : "/images/placeholder-wide.jpg",
    description: item.summary_fa || item.summary_en || "",
  }));

  return (
    <div>
      <Slider slides={slides} />
    </div>
  );
};

export default SliderContainer;
