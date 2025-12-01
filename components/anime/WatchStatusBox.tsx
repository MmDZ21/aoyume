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
      <div className="flex gap-4 h-full flex-1 flex-col rounded-xl border border-primary/10 dark:border-white/10 bg-primary/10 dark:bg-white/5 p-6 backdrop-blur-sm transition-all hover:dark:border-white/20 hover:dark:bg-white/10 hover:border-primary/20 hover:bg-primary/20">
        <div className="flex flex-1 flex-col items-center justify-center gap-2">
          {currentStatus ? (
            <span className="text-base font-semibold text-yellow-500">
              {watchStatusLabels[currentStatus] || currentStatus}
            </span>
          ) : (
            <span className="text-base text-muted-foreground">وضعیتی ثبت نشده</span>
          )}
          <span className="text-xs font-medium text-muted-foreground">وضعیت</span>
        </div>
        <DialogTrigger asChild>
          <Button variant="outline" className="w-full">
            تغییر
          </Button>
        </DialogTrigger>
      </div>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>تغییر وضعیت تماشا</DialogTitle>
          <DialogDescription>
            وضعیت تماشای خود را انتخاب کنید
          </DialogDescription>
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

