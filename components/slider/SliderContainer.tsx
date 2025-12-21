import Slider from "./Slider";
import { createClient } from "@/utils/supabase/server";

const SliderContainer = async () => {
  const supabase = await createClient();
  const { data: sliderData, error } = await supabase.rpc("get_main_slider");

  if (error) {
    console.error("Error fetching slider data:", error);
    console.error("Error details:", JSON.stringify(error, null, 2));
    return null;
  }

  if (!sliderData || sliderData.length === 0) {
    console.warn("No slider data returned from get_main_slider");
    return null;
  }

  console.log("Slider data received:", sliderData.length, "items");

  const imageBaseUrl = process.env.IMAGE_URL || "";
  
  const slides = sliderData.map((item) => ({
    id: item.anime_id,
    title: item.dic_title || item.title_en_normalized || "Unknown Title",
    image: item.wide_image 
      ? `${imageBaseUrl}${item.wide_image}` 
      : "/images/placeholder-wide.jpg",
    description: item.summary_fa || item.summary_en || "",
  }));

  console.log("Processed slides:", slides.length, "slides");

  return (
    <div>
      <Slider slides={slides} />
    </div>
  );
};

export default SliderContainer;
