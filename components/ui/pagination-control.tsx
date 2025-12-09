"use client";

import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useRouter, useSearchParams } from "next/navigation";
import { useTransition } from "react";

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  isUnknownTotal?: boolean;
}

export function Pagination({ currentPage, totalPages, isUnknownTotal = false }: PaginationProps) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [isPending, startTransition] = useTransition();

  const createPageURL = (pageNumber: number | string) => {
    const params = new URLSearchParams(searchParams);
    params.set("page", pageNumber.toString());
    return `?${params.toString()}`;
  };

  const handlePageChange = (page: number) => {
    startTransition(() => {
        router.push(createPageURL(page));
    });
  };

  if (totalPages <= 1 && currentPage === 1) return null;

  return (
    <div className="flex items-center justify-center gap-2 mt-8">
      <Button
        variant="outline"
        size="icon"
        disabled={currentPage <= 1 || isPending}
        onClick={() => handlePageChange(currentPage - 1)}
      >
        <ChevronRight className="h-4 w-4" />
      </Button>

      <div className="flex items-center gap-2">
        <span className="text-sm font-medium">
            صفحه {currentPage} {isUnknownTotal ? "" : `از ${totalPages}`}
        </span>
      </div>

      <Button
        variant="outline"
        size="icon"
        disabled={currentPage >= totalPages || isPending}
        onClick={() => handlePageChange(currentPage + 1)}
      >
        <ChevronLeft className="h-4 w-4" />
      </Button>
    </div>
  );
}

