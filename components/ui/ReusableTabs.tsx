"use client";

import * as React from "react";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { cn } from "@/lib/utils";

export interface TabItem {
  value: string;
  label: React.ReactNode;
  content: React.ReactNode;
  href?: string;
  openInNewTab?: boolean;
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
  const contentTabs = tabs.filter((tab) => !tab.href);

  return (
    <Tabs
      defaultValue={defaultValue}
      className={cn("w-full", className)}
      dir={dir}
    >
      <TabsList
        className={cn(
          "flex h-auto w-full flex-col gap-2 bg-transparent p-0 md:flex-row md:flex-wrap md:justify-start",
          listClassName
        )}
      >
        {tabs.map((tab) => {
          const classes = cn(
            "inline-flex flex-1 items-center justify-center whitespace-nowrap px-4 text-sm font-medium hover:bg-primary/20 dark:hover:bg-primary/40 data-[state=active]:border-primary data-[state=active]:bg-primary dark:data-[state=active]:border-primary dark:data-[state=active]:bg-primary bg-primary/5 dark:bg-primary/20 text-muted-foreground dark:text-muted-foreground border-primary/10 dark:border-primary/30 cursor-pointer rounded-2xl border py-3 text-center transition-all hover:text-primary data-[state=active]:text-primary-foreground data-[state=active]:shadow-lg dark:hover:text-primary dark:data-[state=active]:text-primary-foreground dark:data-[state=active]:shadow-lg md:text-left",
            "w-full md:w-auto",
            triggerClassName
          );

          if (tab.href) {
            return (
              <a
                key={tab.value}
                href={tab.href}
                className={classes}
                target={tab.openInNewTab ? "_blank" : undefined}
                rel={tab.openInNewTab ? "noreferrer noopener" : undefined}
              >
                {tab.label}
              </a>
            );
          }

          return (
            <TabsTrigger key={tab.value} value={tab.value} className={classes}>
              {tab.label}
            </TabsTrigger>
          );
        })}
      </TabsList>
      {contentTabs.map((tab) => (
        <TabsContent
          key={tab.value}
          value={tab.value}
          className={cn("mt-4", contentClassName)}
        >
          {tab.content}
        </TabsContent>
      ))}
    </Tabs>
  );
}
