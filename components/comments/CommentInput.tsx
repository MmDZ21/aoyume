import { Send, User, MessageSquare } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { cn } from "@/lib/utils";

// Minimal Label component
const SimpleLabel = ({
  children,
  htmlFor,
  className,
}: {
  children: React.ReactNode;
  htmlFor?: string;
  className?: string;
}) => (
  <label
    htmlFor={htmlFor}
    className={cn(
      "cursor-pointer text-sm leading-none font-medium select-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70",
      className
    )}
  >
    {children}
  </label>
);

export const CommentInput = () => {
  return (
    <div className="flex gap-3 md:gap-4">
      {/* Avatar - Hidden on mobile */}
      <div className="hidden shrink-0 md:block">
        <div className="border-border/50 bg-background text-muted-foreground flex h-12 w-12 items-center justify-center rounded-full border shadow-sm">
          <User className="h-5 w-5" />
        </div>
      </div>

      <div className="bg-primary/10 dark:bg-primary/10 flex-1 overflow-hidden rounded-2xl p-4 transition-all md:p-6">
        <div className="space-y-3 md:space-y-4">
          <div className="relative">
            <textarea
              className="bg-background ring-border/50 placeholder:text-muted-foreground/50 focus:ring-primary/50 min-h-[100px] w-full resize-y rounded-2xl border-none p-3 text-sm shadow-sm ring-1 outline-hidden transition-all focus:ring-2 md:min-h-[120px] md:p-4"
              placeholder="دیدگاه خود را بنویسید..."
            />
            <div className="absolute right-3 bottom-3">
              <MessageSquare className="text-muted-foreground/20 h-4 w-4" />
            </div>
          </div>

          <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
            <div className="bg-background ring-border/50 flex items-center justify-between gap-3 rounded-xl px-3 py-2 shadow-sm ring-1 md:rounded-2xl md:px-4">
              <SimpleLabel
                htmlFor="spoiler-mode"
                className="text-muted-foreground text-xs"
              >
                حاوی اسپویل
              </SimpleLabel>
              <Switch
                dir="ltr"
                id="spoiler-mode"
                className="data-[state=checked]:bg-rose-500 scale-90 md:scale-100"
              />
            </div>

            <Button className="w-full gap-2 rounded-xl sm:w-auto">
              <span>ارسال دیدگاه</span>
              <Send className="h-4 w-4 rotate-180" />
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};
