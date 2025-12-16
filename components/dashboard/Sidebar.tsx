"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  Star,
  UserCog,
  MessageSquare,
  Heart,
  Bell,
  LogOut,
  ChevronDown,
  User,
  Crown,
} from "lucide-react";
import { cn } from "@/lib/utils";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import { useState } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";

interface SidebarProps {
  user: any;
}

export function Sidebar({ user }: SidebarProps) {
  const pathname = usePathname();
  const [isListsOpen, setIsListsOpen] = useState(true);

  const menuItems = [
    {
      title: "داشبورد",
      href: "/dashboard",
      icon: LayoutDashboard,
    },
    {
      title: "اشتراک ویژه",
      href: "/dashboard/subscription",
      icon: Crown,
      variant: "vip",
    },
    {
      title: "تنظیمات",
      href: "/dashboard/settings",
      icon: UserCog,
    },
    {
      title: "تیکت ها",
      href: "/dashboard/tickets",
      icon: MessageSquare,
    },
  ];

  const bottomItems = [
    {
      title: "اطلاعیه ها",
      href: "/dashboard/notifications",
      icon: Bell,
    },
  ];

  const isActive = (path: string) => pathname === path;
  const isVip = user?.user_metadata?.vip_days > 0;

  return (
    <aside className="w-full md:w-72 shrink-0 flex flex-col gap-6 md:top-24 h-fit">
      {/* User Profile Card - Modern Glass Effect */}
      <div className="relative overflow-hidden rounded-3xl bg-card border border-border/50 shadow-sm p-6 group">
        <div className="absolute inset-0 bg-linear-to-br from-primary/5 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
        
        <div className="relative z-10 flex flex-col items-center text-center gap-4">
          <div className="relative">
            <div className={cn(
              "absolute -inset-1 rounded-full opacity-70 blur-md transition-all duration-500",
              isVip ? "bg-linear-to-br from-yellow-400 to-amber-600" : "bg-linear-to-br from-primary/40 to-primary/10"
            )} />
            <Avatar className="h-20 w-20 border-2 border-background relative">
              <AvatarImage src={user?.user_metadata?.avatar_url} className="object-cover" />
              <AvatarFallback className="bg-muted text-muted-foreground">
                <User className="h-8 w-8" />
              </AvatarFallback>
            </Avatar>
            {isVip && (
              <div className="absolute -top-1 -right-1 bg-yellow-500 text-white p-1 rounded-full shadow-lg border-2 border-background">
                <Crown className="w-3 h-3 fill-current" />
              </div>
            )}
          </div>

          <div className="space-y-1">
            <h3 className="font-bold text-lg tracking-tight text-foreground">
              {user?.user_metadata?.full_name || user?.email?.split("@")[0] || "کاربر عزیز"}
            </h3>
            <div className={cn(
              "inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium transition-colors",
              isVip 
                ? "bg-yellow-500/10 text-yellow-600 border border-yellow-500/20" 
                : "bg-muted text-muted-foreground"
            )}>
              {isVip ? (
                <>
                  <Crown className="w-3 h-3" />
                  <span>{user.user_metadata.vip_days} روز باقی‌مانده</span>
                </>
              ) : (
                <span>کاربر عادی</span>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Navigation Menu */}
      <nav className="flex flex-col gap-2 rounded-3xl bg-card border border-border/50 shadow-sm p-4">
        <div className="space-y-1">
          {menuItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "group flex items-center gap-3 rounded-2xl px-4 py-3 text-sm font-medium transition-all duration-300 relative overflow-hidden",
                isActive(item.href)
                  ? "text-primary bg-primary/10"
                  : "text-muted-foreground hover:bg-accent hover:text-foreground",
                item.variant === "vip" && !isActive(item.href) && "text-amber-600 hover:bg-amber-50 hover:text-amber-700 dark:text-amber-500 dark:hover:bg-amber-950/30"
              )}
            >
              <item.icon className={cn(
                "h-5 w-5 transition-transform duration-300 group-hover:scale-110",
                isActive(item.href) ? "text-primary" : "text-muted-foreground/70",
                item.variant === "vip" && "text-amber-500"
              )} />
              <span className="relative z-10">{item.title}</span>
              {isActive(item.href) && (
                <div className="absolute left-0 top-1/2 -translate-y-1/2 w-1 h-8 bg-primary rounded-r-full" />
              )}
            </Link>
          ))}
        </div>

        <div className="h-px bg-border/50 mx-4 my-2" />

        {/* My Lists Section */}
        <Collapsible open={isListsOpen} onOpenChange={setIsListsOpen} className="space-y-1">
          <CollapsibleTrigger asChild>
            <button className="flex w-full items-center justify-between rounded-2xl px-4 py-3 text-sm font-medium text-muted-foreground hover:bg-accent hover:text-foreground transition-all duration-200 group">
              <div className="flex items-center gap-3">
                <Heart className="h-5 w-5 transition-transform duration-300 group-hover:scale-110 text-muted-foreground/70 group-hover:text-red-500" />
                <span>لیست‌های من</span>
              </div>
              <ChevronDown className={cn("h-4 w-4 transition-transform duration-300", isListsOpen && "rotate-180")} />
            </button>
          </CollapsibleTrigger>
          <CollapsibleContent className="space-y-1 px-4 pb-2 animate-in slide-in-from-top-2 fade-in duration-300">
            <div className="flex flex-col gap-1 border-r-2 border-border/40 pr-3 mr-2.5 pt-1">
              <Link
                href="/dashboard/anime-list"
                className={cn(
                  "flex items-center justify-between rounded-xl px-3 py-2 text-sm transition-colors",
                  isActive("/dashboard/anime-list")
                    ? "text-primary bg-primary/5 font-medium"
                    : "text-muted-foreground hover:text-foreground hover:bg-accent/50"
                )}
              >
                <span>انیمه‌های من</span>
                <span className="text-[10px] bg-muted/80 px-1.5 py-0.5 rounded-md min-w-[24px] text-center">234</span>
              </Link>
              <Link
                href="/dashboard/lists/movies"
                className={cn(
                  "flex items-center justify-between rounded-xl px-3 py-2 text-sm transition-colors",
                  isActive("/dashboard/lists/movies")
                    ? "text-primary bg-primary/5 font-medium"
                    : "text-muted-foreground hover:text-foreground hover:bg-accent/50"
                )}
              >
                <span>فیلم‌های من</span>
                <span className="text-[10px] bg-muted/80 px-1.5 py-0.5 rounded-md min-w-[24px] text-center">845</span>
              </Link>
            </div>
          </CollapsibleContent>
        </Collapsible>

        <div className="h-px bg-border/50 mx-4 my-2" />

        <div className="space-y-1">
          {bottomItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "group flex items-center gap-3 rounded-2xl px-4 py-3 text-sm font-medium transition-all duration-300 relative overflow-hidden",
                isActive(item.href)
                  ? "text-primary bg-primary/10"
                  : "text-muted-foreground hover:bg-accent hover:text-foreground"
              )}
            >
              <item.icon className={cn(
                "h-5 w-5 transition-transform duration-300 group-hover:scale-110",
                isActive(item.href) ? "text-primary" : "text-muted-foreground/70"
              )} />
              <span>{item.title}</span>
            </Link>
          ))}

          <form action="/auth/sign-out" method="post">
            <button
              className="flex w-full items-center gap-3 rounded-2xl px-4 py-3 text-sm font-medium text-muted-foreground transition-all duration-200 hover:bg-destructive/10 hover:text-destructive group"
              type="submit"
            >
              <LogOut className="h-5 w-5 transition-transform duration-300 group-hover:translate-x-1" />
              <span>خروج از حساب</span>
            </button>
          </form>
        </div>
      </nav>
    </aside>
  );
}
