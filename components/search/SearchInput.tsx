"use client";

import { Input } from "@/components/ui/input";
import { SearchIcon } from "lucide-react";
import { useRouter, useSearchParams } from "next/navigation";
import { useTransition, useEffect, useState } from "react";

export function SearchInput() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const initialQuery = searchParams.get("q") || "";
  const [query, setQuery] = useState(initialQuery);
  const [debouncedQuery, setDebouncedQuery] = useState(query);
  const [isPending, startTransition] = useTransition();

  // Debounce logic
  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedQuery(query);
    }, 500);

    return () => {
      clearTimeout(timer);
    };
  }, [query]);

  // Sync with URL changes from outside (e.g. back button)
  useEffect(() => {
    if (searchParams.get("q") !== query && searchParams.get("q") !== null) {
       setQuery(searchParams.get("q") || "");
    }
  }, [searchParams]);

  // Update URL when debounced query changes
  useEffect(() => {
    if (debouncedQuery === searchParams.get("q")) return;
    if (debouncedQuery === "" && !searchParams.has("q")) return;

    startTransition(() => {
      const params = new URLSearchParams(searchParams);
      if (debouncedQuery) {
        params.set("q", debouncedQuery);
      } else {
        params.delete("q");
      }
      params.delete("page"); // Reset pagination on new search
      router.push(`/search?${params.toString()}`);
    });
  }, [debouncedQuery, router, searchParams]);

  return (
    <div className="relative w-full max-w-xl mx-auto mb-4">
      <div className="relative">
        <SearchIcon className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground h-5 w-5 z-10" />
        <Input
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="جستجو در انیمه ها..."
          className="pr-10 h-12 text-lg rounded-xl bg-card border-input focus-visible:ring-primary/50 transition-all shadow-sm"
        />
        {isPending && (
            <div className="absolute left-3 top-1/2 -translate-y-1/2">
                <div className="h-4 w-4 animate-spin rounded-full border-2 border-primary border-t-transparent" />
            </div>
        )}
      </div>
    </div>
  );
}
