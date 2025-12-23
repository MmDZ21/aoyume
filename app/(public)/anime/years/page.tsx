import { Metadata } from "next";
import Link from "next/link";
import { Card, CardContent } from "@/components/ui/card";
import { Calendar } from "lucide-react";

export const metadata: Metadata = {
  title: "آرشیو سال‌های انتشار | AoYume",
  description: "مشاهده آرشیو انیمه‌ها بر اساس سال انتشار",
};

export default function YearsPage() {
  const currentYear = new Date().getFullYear();
  const startYear = 2026;
  const endYear = 1959;
  
  const years = Array.from(
    { length: startYear - endYear + 1 },
    (_, i) => startYear - i
  );

  return (
    <div className="container mx-auto min-h-screen px-4 py-8">
      <div className="mb-8 flex flex-col items-center justify-center space-y-2 md:mb-12">
        <h1 className="text-primary text-3xl font-extrabold tracking-tight md:text-4xl">
          سال‌های انتشار
        </h1>
        <p className="text-muted-foreground text-lg">
          برای مشاهده انیمه‌ها بر اساس سال انتشار کلیک کنید
        </p>
      </div>

      <div className="grid grid-cols-3 gap-4 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-8">
        {years.map((year) => (
          <Link
            key={year}
            href={`/anime/year/${year}`}
            className="group"
          >
            <Card className="relative h-full overflow-hidden border-muted/40 bg-card/50 transition-all duration-300 hover:border-primary/50 hover:bg-card hover:shadow-lg hover:shadow-primary/10 group-hover:-translate-y-1">
              <div className="absolute -right-4 -top-4 text-7xl font-bold text-muted/5 opacity-[0.03] transition-all duration-500 group-hover:scale-110 group-hover:opacity-10 pointer-events-none select-none">
                {year.toString().slice(-2)}
              </div>
              <CardContent className="flex flex-col items-center justify-center p-4 text-center h-full relative z-10">
                <div className="mb-2 rounded-full bg-primary/10 p-2 text-primary transition-colors group-hover:bg-primary group-hover:text-primary-foreground">
                    <Calendar className="h-4 w-4" />
                </div>
                <span className="text-xl font-bold tracking-tight transition-colors group-hover:text-primary">
                  {year}
                </span>
              </CardContent>
            </Card>
          </Link>
        ))}
      </div>
    </div>
  );
}

