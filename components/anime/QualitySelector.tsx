"use client";

import * as React from "react";
import { cn } from "@/lib/utils";

interface QualitySelectorProps {
  qualities: string[];
  selected: string;
  onChange: (quality: string) => void;
  className?: string;
}

export function QualitySelector({
  qualities,
  selected,
  onChange,
  className,
}: QualitySelectorProps) {
  return (
    <div className={cn("flex justify-start gap-4", className)}>
      {qualities.map((q) => (
        <button
          key={q}
          onClick={() => onChange(q)}
          className={cn(
            "rounded-xl px-6 py-2.5 text-sm font-medium transition-colors",
            selected === q
              ? "border border-blue-500/30 bg-blue-600/20 text-blue-400 hover:bg-blue-600/30"
              : "bg-[#1e293b] text-slate-300 hover:bg-[#334155]"
          )}
        >
          کیفیت {q}
        </button>
      ))}
    </div>
  );
}

