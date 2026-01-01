"use client";

import { useRouter, useSearchParams, useParams } from "next/navigation";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Label } from "@/components/ui/label";

const seasons = [
  { value: "spring", label: "بهار" },
  { value: "summer", label: "تابستان" },
  { value: "fall", label: "پاییز" },
  { value: "winter", label: "زمستان" },
];

export function SeasonalFilters({ defaultSeason, defaultYear }: { defaultSeason?: string, defaultYear?: string }) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const params = useParams(); // Get path params

  // Prefer path params, fallback to props/searchParams
  const currentYear = (params.year as string) || searchParams.get("year") || defaultYear || new Date().getFullYear().toString();
  const currentSeason = (params.season as string) || searchParams.get("season") || defaultSeason || "winter";

  // Generate years: current year + 1 down to 1970
  const thisYear = new Date().getFullYear() + 1;
  const years = Array.from({ length: thisYear - 1970 }, (_, i) => thisYear - i);

  const handleYearChange = (year: string) => {
    // Navigate to new URL structure: /anime/seasonal/[year]/[season]
    const params = new URLSearchParams(searchParams.toString());
    params.delete("year"); // Remove from query params as it's now in path
    params.delete("season"); // Remove from query params as it's now in path
    params.set("page", "1"); // Reset page on filter change
    
    // Use current season if not explicitly changing, or default to winter
    const season = currentSeason || "winter";
    
    router.push(`/anime/seasonal/${year}/${season}?${params.toString()}`);
  };

  const handleSeasonChange = (season: string) => {
    // Navigate to new URL structure: /anime/seasonal/[year]/[season]
    const params = new URLSearchParams(searchParams.toString());
    params.delete("year"); // Remove from query params as it's now in path
    params.delete("season"); // Remove from query params as it's now in path
    params.set("page", "1"); // Reset page on filter change

    // Use current year if not explicitly changing
    const year = currentYear || new Date().getFullYear().toString();

    router.push(`/anime/seasonal/${year}/${season}?${params.toString()}`);
  };

  return (
    <div className="mx-auto w-full max-w-2xl rounded-3xl border border-primary/20 bg-background/80 p-6 shadow-2xl backdrop-blur-xl">
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
        <div className="flex flex-col gap-2">
          <Label className="text-base font-medium">فصل انتشار</Label>
          <Select value={currentSeason} onValueChange={handleSeasonChange}>
            <SelectTrigger className="h-12 w-full rounded-xl border border-input bg-card shadow-sm focus:ring-primary/50">
              <SelectValue placeholder="انتخاب فصل" />
            </SelectTrigger>
            <SelectContent>
              {seasons.map((season) => (
                <SelectItem key={season.value} value={season.value}>
                  {season.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div className="flex flex-col gap-2">
          <Label className="text-base font-medium">سال انتشار</Label>
          <Select value={currentYear} onValueChange={handleYearChange}>
            <SelectTrigger className="h-12 w-full rounded-xl border border-input bg-card shadow-sm focus:ring-primary/50">
              <SelectValue placeholder="انتخاب سال" />
            </SelectTrigger>
            <SelectContent>
              {years.map((year) => (
                <SelectItem key={year} value={year.toString()}>
                  {year}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>
    </div>
  );
}

