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
      <div className="flex gap-4 h-full flex-1 flex-col rounded-xl border border-primary/10 dark:border-white/10 bg-primary/10 dark:bg-white/5 p-6 backdrop-blur-sm transition-all hover:dark:border-white/20 hover:dark:bg-white/10 hover:border-primary/20 hover:bg-primary/20">
        <div className="flex flex-1 flex-col items-center justify-center gap-2">
          {currentRating ? (
            <div className="flex items-baseline gap-1">
              <span className="text-3xl font-bold text-yellow-500">{currentRating}</span>
              <span className="text-sm text-muted-foreground">/10</span>
            </div>
          ) : (
            <span className="text-base text-muted-foreground">امتیازی ثبت نشده</span>
          )}
          <span className="text-xs font-medium text-muted-foreground">امتیاز من</span>
        </div>
        <DialogTrigger asChild>
          <Button variant="outline" className="w-full">
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

