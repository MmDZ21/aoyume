"use client";

import React from "react";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { ChevronDown, ChevronUp } from "lucide-react";
import parse from "html-react-parser";

interface SynopsisProps {
  text: string;
  maxLength?: number;
}

export function Synopsis({ text, maxLength = 300 }: SynopsisProps) {
  const [isExpanded, setIsExpanded] = useState(false);

  if (!text) return null;

  const shouldTruncate = text.length > maxLength;
  const displayText = isExpanded ? text : text.slice(0, maxLength) + (shouldTruncate ? "..." : "");

  return (
    <div className="mt-4 border-t border-white/10 pt-6 text-right">
      <h3 className="mb-2 text-lg font-semibold">خلاصه انیمه :</h3>
      <div className="text-sm leading-relaxed md:text-sm">
        {parse(displayText)}
      </div>
      {shouldTruncate && (
        <Button
          variant="ghost"
          size="sm"
          onClick={() => setIsExpanded(!isExpanded)}
          className="mt-2"
        >
          {isExpanded ? (
            <>
              نمایش کمتر
              <ChevronUp className="mr-1 h-3 w-3" />
            </>
          ) : (
            <>
              نمایش بیشتر
              <ChevronDown className="mr-1 h-3 w-3" />
            </>
          )}
        </Button>
      )}
    </div>
  );
}

