"use client";

import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { useRouter, useSearchParams } from "next/navigation";
import { useState, useTransition } from "react";

interface FilterProps {
  genres: { english_name: string; persian_name: string }[];
}

export function Filters({ genres }: FilterProps) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [isPending, startTransition] = useTransition();

  const [genre, setGenre] = useState(searchParams.get("genre") || "all");
  const [season, setSeason] = useState(searchParams.get("season") || "all");
  const [year, setYear] = useState(searchParams.get("year") || "");
  const [status, setStatus] = useState(searchParams.get("status") || "all");
  const [sort, setSort] = useState(searchParams.get("sort") || "newest");

  const handleApply = () => {
    startTransition(() => {
      const params = new URLSearchParams();
      if (genre && genre !== "all") params.set("genre", genre);
      if (season && season !== "all") params.set("season", season);
      if (year) params.set("year", year);
      if (status && status !== "all") params.set("status", status);
      if (sort && sort !== "newest") params.set("sort", sort);

      router.push(`/browse?${params.toString()}`);
    });
  };

  const handleClear = () => {
    setGenre("all");
    setSeason("all");
    setYear("");
    setStatus("all");
    setSort("newest");
    startTransition(() => {
        router.push("/browse");
    });
  };

  return (
    <div className="bg-background/80 backdrop-blur-xl p-6 rounded-3xl border border-border shadow-2xl">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
        {/* Genre */}
        <Select value={genre} onValueChange={setGenre}>
          <SelectTrigger className="w-full h-12! bg-secondary/30 border-transparent focus:ring-primary/50 rounded-xl">
            <SelectValue placeholder="ژانرها" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">همه ژانرها</SelectItem>
            {genres.map((g) => (
              <SelectItem key={g.english_name} value={g.english_name}>
                {g.persian_name}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>

        {/* Season */}
        <Select value={season} onValueChange={setSeason}>
            <SelectTrigger className="w-full h-12! bg-secondary/30 border-transparent focus:ring-primary/50 rounded-xl">
                <SelectValue placeholder="فصل انتشار" />
            </SelectTrigger>
            <SelectContent>
                <SelectItem value="all">همه فصل‌ها</SelectItem>
                <SelectItem value="winter">زمستان</SelectItem>
                <SelectItem value="spring">بهار</SelectItem>
                <SelectItem value="summer">تابستان</SelectItem>
                <SelectItem value="fall">پاییز</SelectItem>
            </SelectContent>
        </Select>

        {/* Year */}
        <Input 
            type="number" 
            placeholder="سال انتشار" 
            value={year} 
            onChange={(e) => setYear(e.target.value)}
            className="w-full h-12 bg-secondary/30 border-transparent focus-visible:ring-primary/50 rounded-xl"
        />

        {/* Status */}
         <Select value={status} onValueChange={setStatus}>
            <SelectTrigger className="w-full h-12! bg-secondary/30 border-transparent focus:ring-primary/50 rounded-xl">
                <SelectValue placeholder="وضعیت پخش" />
            </SelectTrigger>
            <SelectContent>
                <SelectItem value="all">همه وضعیت‌ها</SelectItem>
                <SelectItem value="airing">در حال پخش</SelectItem>
                <SelectItem value="finished">پایان یافته</SelectItem>
                <SelectItem value="not_aired">پخش نشده</SelectItem>
            </SelectContent>
        </Select>

        {/* Sort */}
         <Select value={sort} onValueChange={setSort}>
            <SelectTrigger className="w-full h-12! bg-secondary/30 border-transparent focus:ring-primary/50 rounded-xl">
                <SelectValue placeholder="مرتب سازی" />
            </SelectTrigger>
            <SelectContent>
                <SelectItem value="newest">جدیدترین</SelectItem>
                <SelectItem value="popular">محبوب‌ترین</SelectItem>
                <SelectItem value="score">امتیاز</SelectItem>
            </SelectContent>
        </Select>
      </div>

      <div className="flex gap-4 mt-6 justify-center">
        <Button 
            onClick={handleApply} 
            disabled={isPending} 
            className="h-12 flex-1 text-base font-bold bg-primary text-primary-foreground hover:bg-primary/90 rounded-xl shadow-lg shadow-primary/20"
        >
            {isPending ? "در حال جستجو..." : "جستجوی پیشرفته"}
        </Button>
        
        <Button 
            variant="outline" 
            onClick={handleClear} 
            disabled={isPending}
            className="h-12 px-8 rounded-xl border-border hover:bg-accent"
        >
            پاک کردن
        </Button>
      </div>
    </div>
  );
}

