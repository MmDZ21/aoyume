import { Metadata } from "next";
import { getUserWatchlist } from "@/lib/data";
import { createClient } from "@/utils/supabase/server";
import { AnimeListClient } from "@/components/dashboard/anime-list/AnimeListClient";
import { redirect } from "next/navigation";

export const metadata: Metadata = {
  title: "انیمه های من",
};

export default async function AnimeListPage() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    redirect("/sign-in");
  }

  const watchlist = await getUserWatchlist(user.id);
  const imageBaseUrl = process.env.IMAGE_URL || "";

  return <AnimeListClient initialData={watchlist} userId={user.id} imageBaseUrl={imageBaseUrl} />;
}
