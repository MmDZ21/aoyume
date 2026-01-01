"use client";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useRouter, useSearchParams } from "next/navigation";
import { useTransition } from "react";

export function SimpleSort({ defaultValue = "newest" }: { defaultValue?: string }) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [isPending, startTransition] = useTransition();

  const currentSort = searchParams.get("sort") || defaultValue;

  const handleSortChange = (value: string) => {
    startTransition(() => {
      const params = new URLSearchParams(searchParams.toString());
      if (value === defaultValue) {
        params.delete("sort");
      } else {
        params.set("sort", value);
      }
      
      // Reset page to 1 when sorting changes
      params.delete("page");

      router.push(`?${params.toString()}`);
    });
  };

  return (
    <div className="flex justify-end mb-6">
      <div className="flex items-center gap-2">
        <span className="text-sm text-muted-foreground hidden sm:inline-block">مرتب‌سازی بر اساس:</span>
        <Select value={currentSort} onValueChange={handleSortChange} disabled={isPending}>
            <SelectTrigger className="w-[160px] h-10 bg-background/50 backdrop-blur-sm border-border rounded-xl">
            <SelectValue placeholder="مرتب سازی" />
            </SelectTrigger>
            <SelectContent>
                <SelectItem value="newest">جدیدترین</SelectItem>
                <SelectItem value="popular">محبوب‌ترین</SelectItem>
                <SelectItem value="score">امتیاز</SelectItem>
            </SelectContent>
        </Select>
      </div>
    </div>
  );
}

