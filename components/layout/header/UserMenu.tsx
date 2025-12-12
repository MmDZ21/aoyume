"use client";

import { Button } from "@/components/ui/button";
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@/components/ui/hover-card";
import { createClient } from "@/utils/supabase/client";
import { LogOut, User, UserCircle } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";

export function UserMenu({ user }: { user: any }) {
  const router = useRouter();
  const supabase = createClient();

  const handleSignOut = async () => {
    await supabase.auth.signOut();
    router.refresh();
  };

  return (
    <HoverCard openDelay={0} closeDelay={200}>
      <HoverCardTrigger asChild>
        <Button variant="outline">
          <UserCircle className="h-8 w-8" />
        </Button>
      </HoverCardTrigger>
      <HoverCardContent className="w-48 p-2" align="end">
        <div className="flex flex-col gap-1">
          <div className="px-2 py-1.5 text-sm font-medium text-muted-foreground truncate">
            {user.email}
          </div>
          <div className="h-px bg-border my-1" />
          <Button
            variant="ghost"
            className="justify-start gap-2 h-9 w-full"
            asChild
          >
            <Link href="/dashboard">
              <User className="h-4 w-4" />
              <span>پروفایل</span>
            </Link>
          </Button>
          <Button
            variant="ghost"
            className="justify-start gap-2 h-9 w-full text-destructive hover:text-destructive hover:bg-destructive/10"
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

