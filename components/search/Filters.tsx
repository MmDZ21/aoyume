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
import { Check, ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
} from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

interface FilterProps {
  genres: { english_name: string; persian_name: string }[];
}

export function Filters({ genres }: FilterProps) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [isPending, startTransition] = useTransition();

  const initialGenre = searchParams.get("genre");
  const [selectedGenres, setSelectedGenres] = useState<string[]>(
    initialGenre && initialGenre !== "all" ? initialGenre.split(",") : []
  );
  
  const [season, setSeason] = useState(searchParams.get("season") || "all");
  const [year, setYear] = useState(searchParams.get("year") || "");
  const [status, setStatus] = useState(searchParams.get("status") || "all");
  const [sort, setSort] = useState(searchParams.get("sort") || "newest");
  const [openGenre, setOpenGenre] = useState(false);

  const handleApply = () => {
    startTransition(() => {
      const params = new URLSearchParams();
      if (selectedGenres.length > 0) params.set("genre", selectedGenres.join(","));
      if (season && season !== "all") params.set("season", season);
      if (year) params.set("year", year);
      if (status && status !== "all") params.set("status", status);
      if (sort && sort !== "newest") params.set("sort", sort);

      router.push(`/browse?${params.toString()}`);
    });
  };

  const handleClear = () => {
    setSelectedGenres([]);
    setSeason("all");
    setYear("");
    setStatus("all");
    setSort("newest");
    startTransition(() => {
        router.push("/browse");
    });
  };

  const toggleGenre = (value: string) => {
    setSelectedGenres((current) =>
      current.includes(value)
        ? current.filter((item) => item !== value)
        : [...current, value]
    );
  };

  return (
    <div className="bg-background/80 backdrop-blur-xl p-6 rounded-3xl border border-border shadow-2xl">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
        {/* Genre Multi-Select */}
        <Popover open={openGenre} onOpenChange={setOpenGenre}>
          <PopoverTrigger asChild>
            <Button
              variant="outline"
              role="combobox"
              aria-expanded={openGenre}
              className="w-full h-12 justify-between bg-card border-input focus:ring-primary/50 rounded-xl shadow-sm text-foreground font-normal hover:bg-card"
            >
              {selectedGenres.length > 0
                ? `${selectedGenres.length} انتخاب شده`
                : "ژانرها"}
              <ChevronDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-[200px] p-0" align="start">
            <Command>
              <CommandInput placeholder="جستجوی ژانر..." />
              <CommandList>
                <CommandEmpty>ژانری یافت نشد.</CommandEmpty>
                <CommandGroup>
                  {genres.map((g) => (
                    <CommandItem
                      key={g.english_name}
                      value={g.persian_name} // Search by persian name
                      onSelect={() => toggleGenre(g.english_name)}
                    >
                      <div
                        className={cn(
                          "mr-2 flex h-4 w-4 items-center justify-center rounded-sm border border-primary",
                          selectedGenres.includes(g.english_name)
                            ? "bg-primary text-primary-foreground"
                            : "opacity-50 [&_svg]:invisible"
                        )}
                      >
                        <Check className={cn("h-4 w-4")} />
                      </div>
                      <span>{g.persian_name}</span>
                    </CommandItem>
                  ))}
                </CommandGroup>
                {selectedGenres.length > 0 && (
                  <>
                    <CommandSeparator />
                    <CommandGroup>
                      <CommandItem
                        onSelect={() => setSelectedGenres([])}
                        className="justify-center text-center"
                      >
                        پاک کردن همه
                      </CommandItem>
                    </CommandGroup>
                  </>
                )}
              </CommandList>
            </Command>
          </PopoverContent>
        </Popover>

        {/* Season */}
        <Select value={season} onValueChange={setSeason}>
            <SelectTrigger className="w-full h-12! bg-card border-input focus:ring-primary/50 rounded-xl shadow-sm">
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
            className="w-full h-12 bg-card border-input focus-visible:ring-primary/50 rounded-xl shadow-sm"
        />

        {/* Status */}
         <Select value={status} onValueChange={setStatus}>
            <SelectTrigger className="w-full h-12! bg-card border-input focus:ring-primary/50 rounded-xl shadow-sm">
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
            <SelectTrigger className="w-full h-12! bg-card border-input focus:ring-primary/50 rounded-xl shadow-sm">
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
