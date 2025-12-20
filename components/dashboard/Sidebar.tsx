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
  ShieldCheck,
} from "lucide-react";
import { cn, type UserRole } from "@/lib/utils";
import { useState, useEffect } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
// ...
interface SidebarProps {
  user: any;
  profile?: any;
  role: UserRole;
}

export function Sidebar({ user, profile, role }: SidebarProps) {
  const pathname = usePathname();
  const [isListsOpen, setIsListsOpen] = useState(true);

  // Determine Role (JWT-decoded on the server and passed down)
  console.log("Current User Role:", role);
  const canModerate = ["admin", "moderator"].includes(role);

  // Local state for avatar to support immediate updates
  const initialAvatar = profile?.avatar || user?.user_metadata?.avatar_url;
  const [avatarUrl, setAvatarUrl] = useState(initialAvatar);

  // Sync with props when they change (e.g. on navigation or refresh)
  useEffect(() => {
    const propAvatar = profile?.avatar || user?.user_metadata?.avatar_url;

    setAvatarUrl((currentUrl: any) => {
      if (!currentUrl) return propAvatar;
      if (!propAvatar) return null;

      // Extract base URLs (remove query params) to compare
      const currentBase = currentUrl.split("?")[0];
      const propBase = propAvatar.split("?")[0];

      // If the base URLs match, and the current URL has a query param (implying it's a cache-busted version we set locally),
      // we want to keep the current URL to prevent reverting to the cached version.
      if (currentBase === propBase && currentUrl.includes("?t=")) {
        return currentUrl;
      }

      // Otherwise (different URL, or no local cache bust), use the prop
      return propAvatar;
    });
  }, [profile, user]);

  // Listen for custom event to update avatar immediately
  useEffect(() => {
    const handleAvatarUpdate = (event: CustomEvent<{ url: string }>) => {
      if (event.detail?.url) {
        setAvatarUrl(event.detail.url);
      }
    };

    window.addEventListener(
      "avatar-updated",
      handleAvatarUpdate as EventListener
    );
    return () => {
      window.removeEventListener(
        "avatar-updated",
        handleAvatarUpdate as EventListener
      );
    };
  }, []);

  const menuItems = [
    {
      title: "داشبورد",
      href: "/dashboard",
      icon: LayoutDashboard,
    },
    ...(canModerate
      ? [
          {
            title: "بررسی نظرات",
            href: "/dashboard/comments",
            icon: ShieldCheck,
            variant: "admin",
          },
        ]
      : []),
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
    <aside className="flex h-fit w-full shrink-0 flex-col gap-6 md:top-24 md:w-72">
      {/* User Profile Card - Modern Glass Effect */}
      <div className="bg-card border-border/50 group relative overflow-hidden rounded-3xl border p-6 shadow-sm">
        <div className="from-primary/5 absolute inset-0 bg-linear-to-br via-transparent to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100" />

        <div className="relative z-10 flex flex-col items-center gap-4 text-center">
          <div className="relative">
            <div
              className={cn(
                "absolute -inset-1 rounded-full opacity-70 blur-md transition-all duration-500",
                isVip
                  ? "bg-linear-to-br from-yellow-400 to-amber-600"
                  : "from-primary/40 to-primary/10 bg-linear-to-br"
              )}
            />
            <Avatar className="border-background relative h-20 w-20 border-2">
              <AvatarImage src={avatarUrl} className="object-cover" />
              <AvatarFallback className="bg-muted text-muted-foreground">
                <User className="h-8 w-8" />
              </AvatarFallback>
            </Avatar>
            {isVip && (
              <div className="border-background absolute -top-1 -right-1 rounded-full border-2 bg-yellow-500 p-1 text-white shadow-lg">
                <Crown className="h-3 w-3 fill-current" />
              </div>
            )}
          </div>

          <div className="space-y-1">
            <h3 className="text-foreground text-lg font-bold tracking-tight">
              {profile?.name ||
                user?.user_metadata?.full_name ||
                user?.email?.split("@")[0] ||
                "کاربر عزیز"}
            </h3>
            <div
              className={cn(
                "inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-xs font-medium transition-colors",
                isVip
                  ? "border border-yellow-500/20 bg-yellow-500/10 text-yellow-600"
                  : "bg-muted text-muted-foreground"
              )}
            >
              {isVip ? (
                <>
                  <Crown className="h-3 w-3" />
                  <span>{user.user_metadata.vip_days} روز باقی‌مانده</span>
                </>
              ) : (
                <span>
                  {(() => {
                    switch (role) {
                      case "admin":
                        return "مدیر سایت";
                      case "moderator":
                        return "ناظم";
                      case "translator":
                        return "مترجم";
                      default:
                        return "کاربر عادی";
                    }
                  })()}
                </span>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Navigation Menu */}
      <nav className="bg-card border-border/50 flex flex-col gap-2 rounded-3xl border p-4 shadow-sm">
        <div className="space-y-1">
          {menuItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "group relative flex items-center gap-3 overflow-hidden rounded-2xl px-4 py-3 text-sm font-medium transition-all duration-300",
                isActive(item.href)
                  ? "text-primary bg-primary/10"
                  : "text-muted-foreground hover:bg-accent hover:text-foreground",
                item.variant === "vip" &&
                  !isActive(item.href) &&
                  "text-amber-600 hover:bg-amber-50 hover:text-amber-700 dark:text-amber-500 dark:hover:bg-amber-950/30",
                item.variant === "admin" &&
                  !isActive(item.href) &&
                  "text-blue-600 hover:bg-blue-50 hover:text-blue-700 dark:text-blue-500 dark:hover:bg-blue-950/30"
              )}
            >
              <item.icon
                className={cn(
                  "h-5 w-5 transition-transform duration-300 group-hover:scale-110",
                  isActive(item.href)
                    ? "text-primary"
                    : "text-muted-foreground/70",
                  item.variant === "vip" && "text-amber-500",
                  item.variant === "admin" && "text-blue-500"
                )}
              />
              <span className="relative z-10">{item.title}</span>
              {isActive(item.href) && (
                <div className="bg-primary absolute top-1/2 left-0 h-8 w-1 -translate-y-1/2 rounded-r-full" />
              )}
            </Link>
          ))}
        </div>

        <div className="bg-border/50 mx-4 my-2 h-px" />

        {/* My Lists Section */}
        <Collapsible
          open={isListsOpen}
          onOpenChange={setIsListsOpen}
          className="space-y-1"
        >
          <CollapsibleTrigger asChild>
            <button className="text-muted-foreground hover:bg-accent hover:text-foreground group flex w-full items-center justify-between rounded-2xl px-4 py-3 text-sm font-medium transition-all duration-200">
              <div className="flex items-center gap-3">
                <Heart className="text-muted-foreground/70 h-5 w-5 transition-transform duration-300 group-hover:scale-110 group-hover:text-red-500" />
                <span>لیست‌های من</span>
              </div>
              <ChevronDown
                className={cn(
                  "h-4 w-4 transition-transform duration-300",
                  isListsOpen && "rotate-180"
                )}
              />
            </button>
          </CollapsibleTrigger>
          <CollapsibleContent className="animate-in slide-in-from-top-2 fade-in space-y-1 px-4 pb-2 duration-300">
            <div className="border-border/40 mr-2.5 flex flex-col gap-1 border-r-2 pt-1 pr-3">
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
                <span className="bg-muted/80 min-w-[24px] rounded-md px-1.5 py-0.5 text-center text-[10px]">
                  234
                </span>
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
                <span className="bg-muted/80 min-w-[24px] rounded-md px-1.5 py-0.5 text-center text-[10px]">
                  845
                </span>
              </Link>
            </div>
          </CollapsibleContent>
        </Collapsible>

        <div className="bg-border/50 mx-4 my-2 h-px" />

        <div className="space-y-1">
          {bottomItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "group relative flex items-center gap-3 overflow-hidden rounded-2xl px-4 py-3 text-sm font-medium transition-all duration-300",
                isActive(item.href)
                  ? "text-primary bg-primary/10"
                  : "text-muted-foreground hover:bg-accent hover:text-foreground"
              )}
            >
              <item.icon
                className={cn(
                  "h-5 w-5 transition-transform duration-300 group-hover:scale-110",
                  isActive(item.href)
                    ? "text-primary"
                    : "text-muted-foreground/70"
                )}
              />
              <span>{item.title}</span>
            </Link>
          ))}

          <form action="/auth/sign-out" method="post">
            <button
              className="text-muted-foreground hover:bg-destructive/10 hover:text-destructive group flex w-full items-center gap-3 rounded-2xl px-4 py-3 text-sm font-medium transition-all duration-200"
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
