"use client";

import * as React from "react";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { cn } from "@/lib/utils";

interface QualitySelectorProps {
  qualities: string[];
  selected: string;
  onChange: (quality: string) => void;
  className?: string;
}

export function QualitySelector({
  qualities,
  selected,
  onChange,
  className,
}: QualitySelectorProps) {
  return (
    <Tabs
      value={selected}
      onValueChange={(value) => value && onChange(value)}
      className={cn("w-full md:w-fit", className)}
      dir="rtl"
    >
      <TabsList className="flex h-auto w-full flex-wrap justify-center gap-2 bg-transparent p-0 sm:justify-start">
        {qualities.map((q) => (
          <TabsTrigger
            key={q}
            value={q}
            className={cn(
              "border-primary/10 bg-primary/5 text-xs text-muted-foreground hover:bg-primary/20 data-[state=active]:border-primary data-[state=active]:bg-primary dark:border-primary/30 dark:bg-primary/20 dark:text-muted-foreground dark:hover:bg-primary/40 dark:data-[state=active]:border-primary dark:data-[state=active]:bg-primary cursor-pointer rounded-2xl border px-4 py-2 font-medium transition-all hover:text-primary data-[state=active]:text-primary-foreground data-[state=active]:shadow-lg dark:hover:text-primary dark:data-[state=active]:text-primary-foreground dark:data-[state=active]:shadow-lg sm:px-6 sm:text-sm"
            )}
          >
            {q}
          </TabsTrigger>
        ))}
      </TabsList>
    </Tabs>
  );
}
