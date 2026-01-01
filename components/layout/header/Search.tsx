import { Button } from "@/components/ui/button";
import { SearchIcon } from "lucide-react";
import Link from "next/link";

const Search = () => {
  return (
    <Button
      variant="outline"
      size="icon"
      asChild
      className="relative overflow-hidden border-primary/20 bg-background/50 hover:bg-primary/10 hover:text-primary hover:border-primary/50 transition-all duration-300 group"
    >
      <Link href="/search">
        <div className="absolute inset-0 bg-primary/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
        <SearchIcon className="h-[1.2rem] w-[1.2rem] transition-transform duration-300 group-hover:scale-110" />
      </Link>
    </Button>
  );
};

export default Search;
