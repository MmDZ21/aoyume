"use client";

import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { PlayCircle, Clock, CheckCircle2, PauseCircle, XCircle, LayoutGrid } from "lucide-react";

interface AnimeListHeaderProps {
  selectedStatus: number | "all";
  onSelectStatus: (status: number | "all") => void;
  counts: Record<string, number>;
}

const statuses = [
  { id: "all", label: "همه", icon: LayoutGrid },
  { id: 2, label: "در حال تماشا", icon: PlayCircle }, // Watching
  { id: 1, label: "برای تماشا", icon: Clock }, // Plan to Watch
  { id: 3, label: "تکمیل شده", icon: CheckCircle2 }, // Completed
  { id: 5, label: "متوقف شده", icon: PauseCircle }, // On Hold
  { id: 4, label: "رها شده", icon: XCircle }, // Dropped
];

export function AnimeListHeader({
  selectedStatus,
  onSelectStatus,
  counts,
}: AnimeListHeaderProps) {
  return (
    <div className="flex flex-col gap-1 bg-card/30 p-2 rounded-2xl border border-border/40">
      {statuses.map((status) => {
        const Icon = status.icon;
        const isSelected = selectedStatus === status.id;
        
        return (
          <Button
            key={status.id}
            variant="ghost"
            className={cn(
              "justify-between font-normal h-10 rounded-xl transition-all duration-200",
              isSelected 
                ? "bg-primary/10 text-primary hover:bg-primary/15 hover:text-primary font-medium" 
                : "text-muted-foreground hover:bg-accent/50 hover:text-foreground"
            )}
            onClick={() => onSelectStatus(status.id as number | "all")}
          >
            <div className="flex items-center gap-2.5">
              <Icon className={cn("w-4 h-4", isSelected ? "text-primary" : "text-muted-foreground")} />
              <span>{status.label}</span>
            </div>
            {counts[status.id] > 0 && (
              <span className={cn(
                "text-[10px] px-2 py-0.5 rounded-full min-w-[20px] text-center",
                isSelected 
                  ? "bg-primary/20 text-primary" 
                  : "bg-muted text-muted-foreground"
              )}>
                {counts[status.id]}
              </span>
            )}
          </Button>
        );
      })}
    </div>
  );
}
