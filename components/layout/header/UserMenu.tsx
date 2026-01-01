"use client";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@/components/ui/hover-card";
import { Separator } from "@/components/ui/separator";
import { createClient } from "@/utils/supabase/client";
import {
  Crown,
  LayoutDashboard,
  List,
  LogOut,
  Settings,
  Shield,
  User,
  UserCircle,
} from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";

interface UserMenuProps {
  user: any;
  name?: string;
  avatar?: string;
  role?: string;
}

export function UserMenu({ user, name, avatar, role }: UserMenuProps) {
  const router = useRouter();
  const supabase = createClient();

  const handleSignOut = async () => {
    await supabase.auth.signOut();
    router.refresh();
  };

  const isAdmin = role === "admin" || role === "moderator";
  const isVip = user?.user_metadata?.vip_days > 0;

  return (
    <HoverCard openDelay={0} closeDelay={200}>
      <HoverCardTrigger asChild>
        <Avatar className="h-9 w-9 cursor-pointer border transition-opacity hover:opacity-80">
          <AvatarImage
            src={avatar || user.user_metadata?.avatar_url}
            alt={name || user.email}
          />
          <AvatarFallback>
            <UserCircle className="h-6 w-6" />
          </AvatarFallback>
        </Avatar>
      </HoverCardTrigger>
      <HoverCardContent className="w-64 p-2" align="end">
        <div className="flex flex-col gap-1">
          {/* User Info Header */}
          <div className="flex items-center gap-3 px-2 py-2">
            <Avatar className="h-10 w-10 border">
              <AvatarImage
                src={avatar || user.user_metadata?.avatar_url}
                alt={name || user.email}
              />
              <AvatarFallback>
                <UserCircle className="h-6 w-6" />
              </AvatarFallback>
            </Avatar>
            <div className="flex flex-col overflow-hidden">
              <div className="flex items-center gap-2">
                <span className="truncate text-sm font-medium">
                  {name || "کاربر مهمان"}
                </span>
                {isVip && (
                  <span className="flex items-center rounded-full bg-yellow-500/10 px-1.5 py-0.5 text-[10px] text-yellow-600 dark:text-yellow-500">
                    <Crown className="mr-1 h-3 w-3" />
                    VIP
                  </span>
                )}
              </div>
              <span className="truncate text-xs text-muted-foreground">
                {user.email}
              </span>
            </div>
          </div>

          <Separator className="my-1" />

          {/* Main Actions */}
          <Button
            variant="ghost"
            className="h-9 w-full justify-start gap-2 px-2 font-normal"
            asChild
          >
            <Link href="/dashboard">
              <LayoutDashboard className="h-4 w-4" />
              <span>داشبورد</span>
            </Link>
          </Button>

          <Button
            variant="ghost"
            className="h-9 w-full justify-start gap-2 px-2 font-normal"
            asChild
          >
            <Link href="/dashboard/anime-list">
              <List className="h-4 w-4" />
              <span>لیست من</span>
            </Link>
          </Button>

          <Button
            variant="ghost"
            className="h-9 w-full justify-start gap-2 px-2 font-normal"
            asChild
          >
            <Link href="/dashboard/settings">
              <Settings className="h-4 w-4" />
              <span>تنظیمات</span>
            </Link>
          </Button>

          {/* Admin Section */}
          {isAdmin && (
            <>
              <Separator className="my-1" />
              <Button
                variant="ghost"
                className="h-9 w-full justify-start gap-2 px-2 font-normal text-amber-600 hover:text-amber-700 hover:bg-amber-100 dark:text-amber-500 dark:hover:bg-amber-900/20"
                asChild
              >
                <Link href="/dashboard/comments">
                  <Shield className="h-4 w-4" />
                  <span>مدیریت نظرات</span>
                </Link>
              </Button>
            </>
          )}

          <Separator className="my-1" />

          {/* Logout */}
          <Button
            variant="ghost"
            className="h-9 w-full justify-start gap-2 px-2 font-normal text-destructive hover:bg-destructive/10 hover:text-destructive"
            onClick={handleSignOut}
          >
            <LogOut className="h-4 w-4" />
            <span>خروج</span>
          </Button>
        </div>
      </HoverCardContent>
    </HoverCard>
  );
}
