"use client";

import * as React from "react";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { cn } from "@/lib/utils";

export interface TabItem {
  value: string;
  label: React.ReactNode;
  content: React.ReactNode;
}

interface ReusableTabsProps {
  defaultValue: string;
  tabs: TabItem[];
  className?: string;
  listClassName?: string;
  triggerClassName?: string;
  contentClassName?: string;
  dir?: "ltr" | "rtl";
}

export function ReusableTabs({
  defaultValue,
  tabs,
  className,
  listClassName,
  triggerClassName,
  contentClassName,
  dir = "rtl",
}: ReusableTabsProps) {
  return (
    <Tabs defaultValue={defaultValue} className={cn("w-full", className)} dir={dir}>
      <TabsList
        className={cn(
          "flex h-auto w-full flex-wrap justify-start gap-3 bg-transparent p-0",
          listClassName
        )}
      >
        {tabs.map((tab) => (
          <TabsTrigger
            key={tab.value}
            value={tab.value}
            className={cn(
              "rounded-2xl border border-white/10 bg-[#1e293b]/50 px-6 py-3 text-slate-300 transition-all hover:bg-white/5 data-[state=active]:border-blue-500/50 data-[state=active]:bg-blue-600 data-[state=active]:text-white data-[state=active]:shadow-lg",
              triggerClassName
            )}
          >
            {tab.label}
          </TabsTrigger>
        ))}
      </TabsList>
      {tabs.map((tab) => (
        <TabsContent
          key={tab.value}
          value={tab.value}
          className={cn("mt-8", contentClassName)}
        >
          {tab.content}
        </TabsContent>
      ))}
    </Tabs>
  );
}

