"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  Star,
  FileText,
  BookOpen,
  UserCog,
  MessageSquare,
  Heart,
  Bell,
  LogOut,
  ChevronDown,
  User,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import { useState } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Separator } from "@/components/ui/separator";

interface SidebarProps {
  user: any; // Type should be more specific ideally
}

export function Sidebar({ user }: SidebarProps) {
  const pathname = usePathname();
  const [isListsOpen, setIsListsOpen] = useState(false);

  const menuItems = [
    {
      title: "داشبورد",
      href: "/dashboard",
      icon: LayoutDashboard,
    },
    {
      title: "اشتراک ویژه",
      href: "/dashboard/subscription",
      icon: Star,
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

  return (
    <aside className="w-full md:w-64 shrink-0 space-y-6">
      {/* User Profile Card */}
      <div className="flex flex-col items-center gap-4 text-center pt-4">
        <Avatar className="h-24 w-24 border-4 border-background shadow-lg">
          <AvatarImage src={user?.user_metadata?.avatar_url} />
          <AvatarFallback className="bg-primary/10">
            <User className="h-12 w-12 text-primary" />
          </AvatarFallback>
        </Avatar>
        <div className="space-y-2">
          <h3 className="font-bold text-lg tracking-tight">
            {user?.user_metadata?.full_name || user?.email?.split("@")[0] || "کاربر"}
          </h3>
          <div className="inline-flex items-center rounded-full bg-yellow-500/10 px-3 py-1 text-xs font-medium text-yellow-500 ring-1 ring-inset ring-yellow-500/20">
            {user?.user_metadata?.vip_days 
              ? `${user.user_metadata.vip_days} روز اشتراک VIP` 
              : "کاربر عادی"}
          </div>
        </div>
      </div>

      {/* Navigation Menu */}
      <div className="flex flex-col gap-1 px-3">
        {menuItems.map((item) => (
          <Link
            key={item.href}
            href={item.href}
            className={cn(
              "flex items-center gap-3 rounded-xl px-4 py-3 text-sm font-medium transition-all duration-200",
              pathname === item.href 
                ? "bg-primary text-primary-foreground shadow-md shadow-primary/20" 
                : "text-muted-foreground hover:bg-accent hover:text-accent-foreground"
            )}
          >
            <item.icon className="h-5 w-5" />
            <span>{item.title}</span>
          </Link>
        ))}

        {/* My Lists Collapsible */}
        <Collapsible open={isListsOpen} onOpenChange={setIsListsOpen} className="space-y-1">
          <CollapsibleTrigger asChild>
            <button
              className={cn(
                "flex w-full items-center justify-between rounded-xl px-4 py-3 text-sm font-medium transition-all duration-200 text-muted-foreground hover:bg-accent hover:text-accent-foreground",
                isListsOpen && "bg-accent/50 text-accent-foreground"
              )}
            >
              <div className="flex items-center gap-3">
                <Heart className="h-5 w-5" />
                <span>لیست های من</span>
              </div>
              <ChevronDown
                className={cn(
                  "h-4 w-4 transition-transform duration-200",
                  isListsOpen && "rotate-180"
                )}
              />
            </button>
          </CollapsibleTrigger>
          <CollapsibleContent className="space-y-1 pr-4">
            <div className="border-r-2 border-border/50 pr-4 space-y-1 my-1">
              <Link
                href="/dashboard/anime-list"
                className="flex items-center justify-between rounded-lg px-4 py-2 text-sm text-muted-foreground transition-colors hover:text-primary"
              >
                <span>انیمه های من</span>
                <span className="text-xs bg-muted px-2 py-0.5 rounded-md">
                  234
                </span>
              </Link>
              <Link
                href="/dashboard/lists/movies"
                className="flex items-center justify-between rounded-lg px-4 py-2 text-sm text-muted-foreground transition-colors hover:text-primary"
              >
                <span>فیلم های من</span>
                <span className="text-xs bg-muted px-2 py-0.5 rounded-md">
                  845
                </span>
              </Link>
            </div>
          </CollapsibleContent>
        </Collapsible>

        <div className="my-2 h-px bg-border/50" />

        {bottomItems.map((item) => (
          <Link
            key={item.href}
            href={item.href}
            className={cn(
              "flex items-center gap-3 rounded-xl px-4 py-3 text-sm font-medium transition-all duration-200",
              pathname === item.href 
                ? "bg-primary text-primary-foreground shadow-md shadow-primary/20" 
                : "text-muted-foreground hover:bg-accent hover:text-accent-foreground"
            )}
          >
            <item.icon className="h-5 w-5" />
            <span>{item.title}</span>
          </Link>
        ))}

        <form action="/auth/sign-out" method="post">
           <button
            className="flex w-full items-center gap-3 rounded-xl px-4 py-3 text-sm font-medium text-muted-foreground transition-all duration-200 hover:bg-destructive/10 hover:text-destructive"
            type="submit"
          >
            <LogOut className="h-5 w-5" />
            <span>خروج</span>
          </button>
        </form>
      </div>
    </aside>
  );
}

