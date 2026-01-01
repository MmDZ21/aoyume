import { Construction } from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";

interface ComingSoonProps {
  title?: string;
  description?: string;
}

export function ComingSoon({
  title = "به زودی",
  description = "این بخش در حال توسعه است و به زودی در دسترس خواهد بود.",
}: ComingSoonProps) {
  return (
    <div className="flex h-[50vh] w-full flex-col items-center justify-center gap-6 rounded-3xl border border-dashed p-8 text-center animate-in fade-in zoom-in duration-500">
      <div className="flex h-20 w-20 items-center justify-center rounded-full bg-primary/10 text-primary">
        <Construction className="h-10 w-10 animate-pulse" />
      </div>
      <div className="space-y-2">
        <h2 className="text-2xl font-bold tracking-tight">{title}</h2>
        <p className="text-muted-foreground max-w-sm">{description}</p>
      </div>
      <Button asChild variant="outline">
        <Link href="/dashboard">بازگشت به داشبورد</Link>
      </Button>
    </div>
  );
}

