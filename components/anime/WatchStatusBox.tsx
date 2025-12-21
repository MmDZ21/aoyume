"use client";

import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../ui/dialog";
import { Button } from "../ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";

interface WatchStatusBoxProps {
  currentStatus?: string | null;
  onStatusChange?: (status: string) => void;
}

const watchStatusLabels: Record<string, string> = {
  watched: "تماشا کردم",
  watching: "درحال تماشا",
  dropped: "رها کردم",
  "plan-to-watch": "بعدا می‌بینم",
};

export function WatchStatusBox({
  currentStatus,
  onStatusChange,
}: WatchStatusBoxProps) {
  const [status, setStatus] = useState<string>(currentStatus || "");
  const [open, setOpen] = useState(false);

  const handleSave = () => {
    if (status && onStatusChange) {
      onStatusChange(status);
    }
    setOpen(false);
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <div className="border-primary/20 dark:border-primary/30 bg-primary/10 dark:bg-primary/10 hover:dark:border-primary/40 hover:dark:bg-primary/15 hover:border-primary/30 hover:bg-primary/15 flex h-full min-h-[150px] w-full sm:flex-1 flex-col gap-4 rounded-xl border p-6 backdrop-blur-sm transition-all">
        <div className="flex flex-1 flex-col items-center justify-center gap-2 min-h-[60px]">
          {currentStatus ? (
            <span className="text-chart-5 text-base font-semibold">
              {watchStatusLabels[currentStatus] || currentStatus}
            </span>
          ) : (
            <span className="text-muted-foreground text-base">
              وضعیتی ثبت نشده
            </span>
          )}
          <span className="text-muted-foreground text-xs font-medium">
            وضعیت
          </span>
        </div>
        <DialogTrigger asChild>
          <Button
            variant="outline"
            className="bg-secondary text-secondary-foreground hover:bg-secondary/80 dark:bg-secondary/80 dark:text-secondary-foreground hover:dark:bg-secondary/60 w-full"
          >
            تغییر
          </Button>
        </DialogTrigger>
      </div>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>تغییر وضعیت تماشا</DialogTitle>
          <DialogDescription>وضعیت تماشای خود را انتخاب کنید</DialogDescription>
        </DialogHeader>
        <div className="py-4">
          <Select value={status} onValueChange={setStatus}>
            <SelectTrigger className="w-full">
              <SelectValue placeholder="وضعیت را انتخاب کنید" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="watched">تماشا کردم</SelectItem>
              <SelectItem value="watching">درحال تماشا</SelectItem>
              <SelectItem value="dropped">رها کردم</SelectItem>
              <SelectItem value="plan-to-watch">بعدا می‌بینم</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <DialogFooter>
          <Button variant="outline" onClick={() => setOpen(false)}>
            انصراف
          </Button>
          <Button onClick={handleSave} disabled={!status}>
            ذخیره
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
