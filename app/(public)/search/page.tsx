import { createClient } from "@/utils/supabase/server";
import { SearchInput } from "@/components/search/SearchInput";
import MediaCard, { MediaItem } from "@/components/carousel/MediaCard";
import { mapSearchSummaryToMediaItem } from "@/lib/mappers";
import { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { Pagination } from "@/components/ui/pagination-control";

export const metadata: Metadata = {
  title: "جستجو | AoYume",
  description: "جستجوی انیمه های مورد علاقه شما در AoYume",
};

interface SearchPageProps {
  searchParams: Promise<{ q?: string; page?: string }>;
}

export default async function SearchPage({ searchParams }: SearchPageProps) {
  const { q, page } = await searchParams;
  const query = q || "";
  const currentPage = Number(page) || 1;
  const itemsPerPage = 30;
  
  const supabase = await createClient();
  let results: MediaItem[] = [];
  let totalCount = 0;

  if (query.trim().length > 0) {
    const offset = (currentPage - 1) * itemsPerPage;
    const { data, error } = await supabase.rpc("search_animes_summary", {
      q: query,
      qlimit: itemsPerPage,
      qoffset: offset,
    });

    if (data && !error) {
      results = data.map(mapSearchSummaryToMediaItem);
      // NOTE: search_animes_summary does not return total count currently. 
      // Pagination for search results will be limited to "Next" button logic if total count is unknown, 
      // or we can just assume more pages if we got full page of results.
      // For now, we will assume if we got itemsPerPage items, there might be more.
      // Ideally, the RPC should return total count.
      // Simple heuristic: if results.length === itemsPerPage, show next page.
    }
  }

  // Heuristic for totalPages since RPC doesn't return count
  // If we have full page of results, assume at least one more page.
  // This is imperfect but works for simple "Next" button flow.
  // To support full numbered pagination, the RPC needs to be updated to return count.
  const hasMore = results.length === itemsPerPage;
  // We can pretend totalPages is current + 1 if hasMore, to enable next button.
  // Or current if not hasMore.
  const totalPages = hasMore ? currentPage + 1 : currentPage;


  return (
    <div className="container mx-auto px-4 py-8 min-h-screen">
      <div className="flex flex-col items-center justify-center space-y-2 mb-12">
        <h1 className="text-4xl font-extrabold tracking-tight lg:text-5xl text-primary">AoYume</h1>
        <p className="text-muted-foreground text-lg">دنیای انیمه در دستان شما</p>
      </div>
      
      <SearchInput />

      <div className="flex justify-center mb-12">
        <Link 
          href="/browse" 
          className="text-sm text-muted-foreground hover:text-primary transition-colors flex items-center gap-1"
        >
          <span>جستجوی پیشرفته</span>
          <ArrowLeft className="w-4 h-4" />
        </Link>
      </div>

      {query && (
        <div className="mb-6 text-muted-foreground text-center">
            نتایج جستجو برای: <span className="text-foreground font-bold">"{query}"</span>
        </div>
      )}

      {results.length > 0 ? (
        <>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4 md:gap-6">
            {results.map((item) => (
              <MediaCard key={item.id} item={item} />
            ))}
          </div>
          
          <Pagination currentPage={currentPage} totalPages={totalPages} isUnknownTotal={true} />
        </>
      ) : (
        query && (
          <div className="text-center py-12 text-muted-foreground">
            موردی یافت نشد.
          </div>
        )
      )}
      
      {!query && (
        <div className="text-center py-12 text-muted-foreground">
            نام انیمه مورد نظر را وارد کنید...
        </div>
      )}
    </div>
  );
}
