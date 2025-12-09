import { Button } from "@/components/ui/button";
import { SearchIcon } from "lucide-react";
import Link from "next/link";

const Search = () => {
  return <Button variant="outline" size="icon" asChild>
    <Link href="/search">
      <SearchIcon />
    </Link>
  </Button>;
};

export default Search;
