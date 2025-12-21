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

interface RatingBoxProps {
  currentRating?: number | null;
  onRatingChange?: (rating: number) => void;
}

export function RatingBox({ currentRating, onRatingChange }: RatingBoxProps) {
  const [rating, setRating] = useState<string>(
    currentRating?.toString() || ""
  );
  const [open, setOpen] = useState(false);

  const handleSave = () => {
    if (rating && onRatingChange) {
      onRatingChange(parseInt(rating));
    }
    setOpen(false);
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <div className="flex gap-4 h-full min-h-[150px] w-full sm:flex-1 flex-col rounded-xl border border-primary/20 dark:border-primary/30 bg-primary/10 dark:bg-primary/10 p-6 backdrop-blur-sm transition-all hover:dark:border-primary/40 hover:dark:bg-primary/15 hover:border-primary/30 hover:bg-primary/15">
        <div className="flex flex-1 flex-col items-center justify-center gap-2 min-h-[60px]">
          {currentRating ? (
            <div className="flex items-baseline gap-1">
              <span className="text-3xl font-bold text-chart-5">{currentRating}</span>
              <span className="text-sm text-muted-foreground">/10</span>
            </div>
          ) : (
            <span className="text-base text-muted-foreground">امتیازی ثبت نشده</span>
          )}
          <span className="text-xs font-medium text-muted-foreground">امتیاز من</span>
        </div>
        <DialogTrigger asChild>
          <Button variant="outline" className="w-full bg-secondary text-secondary-foreground hover:bg-secondary/80 dark:bg-secondary/80 dark:text-secondary-foreground hover:dark:bg-secondary/60">
            تغییر
          </Button>
        </DialogTrigger>
      </div>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>تغییر امتیاز</DialogTitle>
          <DialogDescription>
            امتیاز خود را از 1 تا 10 انتخاب کنید
          </DialogDescription>
        </DialogHeader>
        <div className="py-4">
          <Select value={rating} onValueChange={setRating}>
            <SelectTrigger className="w-full">
              <SelectValue placeholder="امتیاز را انتخاب کنید" />
            </SelectTrigger>
            <SelectContent>
              {Array.from({ length: 10 }, (_, i) => i + 1).map((num) => (
                <SelectItem key={num} value={num.toString()}>
                  {num}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        <DialogFooter>
          <Button variant="outline" onClick={() => setOpen(false)}>
            انصراف
          </Button>
          <Button onClick={handleSave} disabled={!rating}>
            ذخیره
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

