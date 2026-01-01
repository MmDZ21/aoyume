import { getCurrentSeasonYear } from "@/lib/data";
import { redirect } from "next/navigation";

export default async function SeasonalIndexPage() {
  const currentData = await getCurrentSeasonYear();
  const season = (currentData?.season as string) || "winter";
  const year = Number(currentData?.year) || new Date().getFullYear();

  redirect(`/anime/seasonal/${year}/${season}`);
}
