import { Metadata } from "next";
import { createClient } from "@/utils/supabase/server";
import Link from "next/link";
import { Card, CardContent } from "@/components/ui/card";
import { Hash } from "lucide-react";

export const metadata: Metadata = {
  title: "لیست ژانرهای انیمه | AoYume",
  description: "مشاهده همه ژانرهای انیمه موجود در وبسایت",
};

export default async function GenresPage() {
  const supabase = await createClient();
  const { data: genres } = await supabase.rpc("get_all_genre");

  return (
    <div className="container mx-auto min-h-screen px-4 py-8">
      <div className="mb-8 flex flex-col items-center justify-center space-y-2 md:mb-12">
        <h1 className="text-primary text-3xl font-extrabold tracking-tight md:text-4xl">
          ژانرهای انیمه
        </h1>
        <p className="text-muted-foreground text-lg">
          برای مشاهده انیمه‌ها بر اساس ژانر کلیک کنید
        </p>
      </div>

      <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6">
        {genres?.map((genre) => (
          <Link
            key={genre.english_name}
            href={`/anime/genre/${genre.english_name.toLowerCase()}`}
            className="group"
          >
            <Card className="relative h-full overflow-hidden border-muted/40 bg-card/50 transition-all duration-300 hover:border-primary/50 hover:bg-card hover:shadow-lg hover:shadow-primary/10 group-hover:-translate-y-1">
              <div className="absolute -right-4 -top-4 text-9xl font-bold text-muted/5 opacity-[0.03] transition-all duration-500 group-hover:scale-110 group-hover:opacity-10 pointer-events-none select-none">
                {genre.english_name.charAt(0)}
              </div>
              <CardContent className="flex flex-col items-center justify-center p-6 text-center h-full relative z-10">
                <div className="mb-3 rounded-full bg-primary/10 p-3 text-primary transition-colors group-hover:bg-primary group-hover:text-primary-foreground">
                    <Hash className="h-6 w-6" />
                </div>
                <span className="text-lg font-bold tracking-tight transition-colors group-hover:text-primary">
                  {genre.persian_name}
                </span>
                <span className="mt-1 text-xs font-medium uppercase tracking-widest text-muted-foreground/70 group-hover:text-muted-foreground">
                  {genre.english_name}
                </span>
              </CardContent>
            </Card>
          </Link>
        ))}
      </div>
    </div>
  );
}
