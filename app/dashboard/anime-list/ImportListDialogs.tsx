"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { bulkUpdateWatchlistFromAniList, bulkUpdateWatchlistFromMal } from "./actions";

export function ImportListDialogs() {
  const [anilistOpen, setAnilistOpen] = useState(false);
  const [malOpen, setMalOpen] = useState(false);
  const [anilistUsername, setAnilistUsername] = useState("");
  const [malUsername, setMalUsername] = useState("");
  const [anilistLoading, setAnilistLoading] = useState(false);
  const [malLoading, setMalLoading] = useState(false);

  const handleAniListSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!anilistUsername.trim()) return;

    setAnilistLoading(true);
    try {
      const result = await bulkUpdateWatchlistFromAniList(anilistUsername.trim());
      if (!result.success && "error" in result) {
        console.error("AniList import failed:", result.error);
      }
      setAnilistOpen(false);
      setAnilistUsername("");
    } catch (error) {
      console.error("Error importing AniList:", error);
    } finally {
      setAnilistLoading(false);
    }
  };

  const handleMalSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!malUsername.trim()) return;

    setMalLoading(true);
    try {
      const result = await bulkUpdateWatchlistFromMal(malUsername.trim());
      if (!result.success && "error" in result) {
        console.error("MAL import failed:", result.error);
      }
      setMalOpen(false);
      setMalUsername("");
    } catch (error) {
      console.error("Error importing MAL:", error);
    } finally {
      setMalLoading(false);
    }
  };

  return (
    <div className="flex gap-2">
      {/* AniList Dialog */}
      <Dialog open={anilistOpen} onOpenChange={setAnilistOpen}>
        <DialogTrigger asChild>
          <Button variant="outline">وارد کردن از AniList</Button>
        </DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>وارد کردن لیست از AniList</DialogTitle>
            <DialogDescription>
              نام کاربری AniList خود را وارد کنید تا لیست انیمه‌های شما وارد شود.
            </DialogDescription>
          </DialogHeader>
          <form onSubmit={handleAniListSubmit}>
            <div className="space-y-4 py-4">
              <div className="space-y-2">
                <Label htmlFor="anilist-username">نام کاربری AniList</Label>
                <Input
                  id="anilist-username"
                  placeholder="نام کاربری خود را وارد کنید"
                  value={anilistUsername}
                  onChange={(e) => setAnilistUsername(e.target.value)}
                  disabled={anilistLoading}
                  dir="ltr"
                />
              </div>
            </div>
            <DialogFooter>
              <Button
                type="button"
                variant="outline"
                onClick={() => setAnilistOpen(false)}
                disabled={anilistLoading}
              >
                انصراف
              </Button>
              <Button type="submit" disabled={anilistLoading || !anilistUsername.trim()}>
                {anilistLoading ? "در حال بارگذاری..." : "وارد کردن"}
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>

      {/* MAL Dialog */}
      <Dialog open={malOpen} onOpenChange={setMalOpen}>
        <DialogTrigger asChild>
          <Button variant="outline">وارد کردن از MyAnimeList</Button>
        </DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>وارد کردن لیست از MyAnimeList</DialogTitle>
            <DialogDescription>
              نام کاربری MyAnimeList خود را وارد کنید تا لیست انیمه‌های شما وارد شود.
            </DialogDescription>
          </DialogHeader>
          <form onSubmit={handleMalSubmit}>
            <div className="space-y-4 py-4">
              <div className="space-y-2">
                <Label htmlFor="mal-username">نام کاربری MyAnimeList</Label>
                <Input
                  id="mal-username"
                  placeholder="نام کاربری خود را وارد کنید"
                  value={malUsername}
                  onChange={(e) => setMalUsername(e.target.value)}
                  disabled={malLoading}
                  dir="ltr"
                />
              </div>
            </div>
            <DialogFooter>
              <Button
                type="button"
                variant="outline"
                onClick={() => setMalOpen(false)}
                disabled={malLoading}
              >
                انصراف
              </Button>
              <Button type="submit" disabled={malLoading || !malUsername.trim()}>
                {malLoading ? "در حال بارگذاری..." : "وارد کردن"}
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
}

