"use client";

import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import { Menu, ChevronDown, Home, Sparkles, CreditCard, Phone, Film, Calendar, Trophy, Newspaper, X } from "lucide-react";
import Link from "next/link";
import { topbarNavItems, bottombarNavItems } from "@/constants";
import Logo from "./Logo";
import { Separator } from "@/components/ui/separator";
import { cn } from "@/lib/utils";

const MobileNav = () => {
  const getTopbarIcon = (label: string) => {
    switch (label) {
      case "صفحه اصلی":
        return Home;
      case "تبلیغات":
        return Sparkles;
      case "خرید اشتراک":
        return CreditCard;
      case "تماس با ما":
        return Phone;
      default:
        return null;
    }
  };

  const getBottombarIcon = (label: string) => {
    if (label.includes("ژانر")) return Film;
    if (label.includes("سال")) return Calendar;
    if (label.includes("فصل")) return Calendar;
    if (label.includes("وضعیت")) return Film;
    if (label.includes("سینمایی")) return Film;
    if (label.includes("برنامه")) return Calendar;
    if (label.includes("برترین")) return Trophy;
    if (label.includes("اخبار")) return Newspaper;
    return null;
  };

  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button variant="ghost" size="icon" className="md:hidden">
          <Menu className="h-5 w-5" />
          <span className="sr-only">باز کردن منو</span>
        </Button>
      </SheetTrigger>
      <SheetContent 
        side="right" 
        className="w-full sm:max-w-md overflow-y-auto bg-background/95 backdrop-blur-xl border-l border-border/50"
      >
        <div className="flex flex-col h-full">
          {/* Header with Logo */}
          <SheetHeader className="pb-6 border-b border-border/50">
            <SheetTitle className="sr-only">منوی اصلی</SheetTitle>
            <div className="flex items-center justify-between">
              <Logo />
              <SheetTrigger asChild>
                <Button variant="ghost" size="icon" className="h-9 w-9 rounded-lg">
                  <X className="h-4 w-4" />
                  <span className="sr-only">بستن منو</span>
                </Button>
              </SheetTrigger>
            </div>
          </SheetHeader>

          {/* Navigation Content */}
          <div className="flex-1 py-6 space-y-6">
            {/* Topbar Navigation */}
            <div className="space-y-2">
              <h3 className="px-4 text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                منوی اصلی
              </h3>
              <nav className="space-y-1">
                {topbarNavItems.map((item) => {
                  const Icon = getTopbarIcon(item.label);
                  return (
                    <Link
                      key={item.href}
                      href={item.href}
                      className={cn(
                        "flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium",
                        "transition-all duration-200",
                        "hover:bg-primary/10 hover:text-primary",
                        "active:bg-primary/15 active:scale-[0.98]",
                        "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/50 focus-visible:ring-offset-2"
                      )}
                    >
                      {Icon && <Icon className="h-5 w-5 shrink-0" />}
                      <span>{item.label}</span>
                    </Link>
                  );
                })}
              </nav>
            </div>

            <Separator className="bg-border/50" />

            {/* Bottombar Navigation */}
            <div className="space-y-2">
              <h3 className="px-4 text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                دسته‌بندی‌ها
              </h3>
              <nav className="space-y-1">
                {bottombarNavItems.map((item) => {
                  const Icon = getBottombarIcon(item.label);
                  
                  if (item.href) {
                    // Simple link item
                    return (
                      <Link
                        key={item.label}
                        href={item.href}
                        className={cn(
                          "flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium",
                          "transition-all duration-200",
                          "hover:bg-primary/10 hover:text-primary",
                          "active:bg-primary/15 active:scale-[0.98]",
                          "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/50 focus-visible:ring-offset-2"
                        )}
                      >
                        {Icon && <Icon className="h-5 w-5 shrink-0" />}
                        <span>{item.label}</span>
                      </Link>
                    );
                  }

                  // Collapsible item with submenu
                  return (
                    <Collapsible key={item.label} className="space-y-1">
                      <CollapsibleTrigger asChild>
                        <button
                          className={cn(
                            "w-full flex items-center justify-between gap-3 px-4 py-3 rounded-xl text-sm font-medium",
                            "transition-all duration-200",
                            "hover:bg-primary/10 hover:text-primary",
                            "active:bg-primary/15 active:scale-[0.98]",
                            "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/50 focus-visible:ring-offset-2",
                            "data-[state=open]:bg-primary/10 data-[state=open]:text-primary"
                          )}
                        >
                          <div className="flex items-center gap-3 flex-1 text-right">
                            {Icon && <Icon className="h-5 w-5 shrink-0" />}
                            <span>{item.label}</span>
                          </div>
                          <ChevronDown className="h-4 w-4 transition-transform duration-300 data-[state=open]:rotate-180 shrink-0" />
                        </button>
                      </CollapsibleTrigger>
                      <CollapsibleContent className="animate-in slide-in-from-top-2 fade-in overflow-hidden duration-300">
                        <div className="mt-1 space-y-1 pr-4">
                          <div className="border-r-2 border-border/40 mr-2.5 flex flex-col gap-1 pt-1 pr-3">
                            {item.items?.map((subItem) => (
                              <Link
                                key={subItem.label}
                                href={subItem.href}
                                className={cn(
                                  "block px-3 py-2 rounded-lg text-sm transition-colors",
                                  "hover:bg-primary/10 hover:text-primary",
                                  "active:bg-primary/15",
                                  "text-muted-foreground hover:text-foreground",
                                  "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/50 focus-visible:ring-offset-2"
                                )}
                              >
                                {subItem.label}
                              </Link>
                            ))}
                          </div>
                        </div>
                      </CollapsibleContent>
                    </Collapsible>
                  );
                })}
              </nav>
            </div>
          </div>

          {/* Footer with Sign In Button */}
          <div className="pt-4 border-t border-border/50">
            <div className="px-4 pb-4">
              <Button variant="outline" className="w-full" asChild>
                <Link href="/sign-in">ورود</Link>
              </Button>
            </div>
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );
};

export default MobileNav;
