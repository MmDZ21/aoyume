"use client";

import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { WatchlistEntry } from "./AnimeListClient";
import { updateWatchlistEntry } from "@/app/dashboard/anime-list/actions";

interface EditEntryDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  entry: WatchlistEntry;
  onUpdate: (entry: WatchlistEntry) => void;
}

const statuses = [
  { id: 1, label: "برای تماشا" },
  { id: 2, label: "در حال تماشا" },
  { id: 3, label: "تکمیل شده" },
  { id: 4, label: "رها شده" },
  { id: 5, label: "متوقف شده" },
];

export function EditEntryDialog({
  open,
  onOpenChange,
  entry,
  onUpdate,
}: EditEntryDialogProps) {
  const [status, setStatus] = useState(entry.status_id?.toString() || "1");
  const [score, setScore] = useState(entry.score?.toString() || "0");
  const [episodes, setEpisodes] = useState(entry.watched_episodes?.toString() || "0");
  const [notes, setNotes] = useState(entry.notes || "");
  const [loading, setLoading] = useState(false);

  // Reset form when entry changes or dialog opens
  useEffect(() => {
    if (open) {
      setStatus(entry.status_id?.toString() || "1");
      setScore(entry.score?.toString() || "0");
      setEpisodes(entry.watched_episodes?.toString() || "0");
      setNotes(entry.notes || "");
    }
  }, [open, entry]);

  const handleSave = async () => {
    if (!entry.anime_id) {
      console.error("No anime ID found for entry");
      return;
    }

    setLoading(true);
    const statusId = parseInt(status);
    const scoreVal = parseFloat(score);
    const episodesVal = parseInt(episodes);

    const result = await updateWatchlistEntry(
      entry.anime_id,
      statusId,
      scoreVal,
      episodesVal,
      notes
    );

    setLoading(false);

    if (result.success) {
      onUpdate({
        ...entry,
        status_id: statusId,
        score: scoreVal,
        watched_episodes: episodesVal,
        notes: notes,
        last_updated: new Date().toISOString(), // Optimistic update of timestamp
      });
      onOpenChange(false);
    } else {
      console.error("Failed to update entry:", result.error);
      // Ideally show a toast notification here
    }
  };

  const maxEpisodes = entry.anime?.episodes_en || entry.anime?.episodes_fa;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>ویرایش جزئیات</DialogTitle>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label>وضعیت</Label>
              <Select value={status} onValueChange={setStatus}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {statuses.map((s) => (
                    <SelectItem key={s.id} value={s.id.toString()}>
                      {s.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label>امتیاز (0-10)</Label>
              <Input
                type="number"
                min="0"
                max="10"
                step="0.5"
                value={score}
                onChange={(e) => setScore(e.target.value)}
                dir="ltr"
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label>تعداد قسمت‌های تماشا شده</Label>
            <div className="flex items-center gap-2">
              <Input
                type="number"
                min="0"
                value={episodes}
                onChange={(e) => setEpisodes(e.target.value)}
                dir="ltr"
              />
              {maxEpisodes && (
                <span className="text-sm text-muted-foreground whitespace-nowrap">
                  از {maxEpisodes}
                </span>
              )}
            </div>
          </div>

          <div className="space-y-2">
            <Label>یادداشت‌ها</Label>
            <Textarea
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              placeholder="یادداشت شخصی..."
              className="resize-none"
            />
          </div>
        </div>
        <DialogFooter>
          <Button variant="outline" onClick={() => onOpenChange(false)} disabled={loading}>
            انصراف
          </Button>
          <Button onClick={handleSave} disabled={loading}>
            {loading ? "در حال ذخیره..." : "ذخیره"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

