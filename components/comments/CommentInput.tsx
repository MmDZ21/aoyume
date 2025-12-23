"use client";

import { Send, User, MessageSquare, Reply, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { cn } from "@/lib/utils";
import { useState, useTransition } from "react";
import { submitComment } from "@/app/actions/comment-actions";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

interface CommentInputProps {
  animeId?: number;
  replyingTo?: {
    id: string;
    author: string;
    content: string;
  } | null;
  onCancelReply?: () => void;
  onSuccess?: () => void;
}

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

export const CommentInput = ({
  animeId,
  replyingTo,
  onCancelReply,
  onSuccess,
}: CommentInputProps) => {
  const [content, setContent] = useState("");
  const [isSpoiler, setIsSpoiler] = useState(false);
  const [isPending, startTransition] = useTransition();
  const router = useRouter();

  const handleSubmit = () => {
    if (!content.trim()) return;
    if (!animeId) return;

    startTransition(async () => {
      try {
        await submitComment({
          animeId,
          content,
          isSpoiler,
          parentId: replyingTo?.id,
        });

        toast("دیدگاه ثبت شد", {
          description: "دیدگاه شما با موفقیت ثبت شد و پس از تایید نمایش داده می‌شود.",
        });

        setContent("");
        setIsSpoiler(false);
        if (onCancelReply) onCancelReply();
        if (onSuccess) onSuccess();
        
      } catch (error) {
        toast.error("خطا", {
          description: "ثبت دیدگاه با مشکل مواجه شد. لطفا دوباره تلاش کنید.",
        });
      }
    });
  };

  return (
    <div className="flex gap-3 md:gap-4">
      {/* Avatar - Hidden on mobile */}
      <div className="hidden shrink-0 md:block">
        <div className="border-border/50 bg-background text-muted-foreground flex h-12 w-12 items-center justify-center rounded-full border shadow-sm">
          <User className="h-5 w-5" />
        </div>
      </div>

      <div className={cn(
        "bg-primary/10 dark:bg-primary/10 flex-1 overflow-hidden rounded-2xl p-4 transition-all md:p-6",
        replyingTo && "ring-2 ring-primary/20"
      )}>
        <div className="space-y-3 md:space-y-4">
          {replyingTo && (
            <div className="flex items-center justify-between rounded-lg bg-background/50 p-2 text-sm text-muted-foreground">
              <div className="flex items-center gap-2">
                <Reply className="h-4 w-4" />
                <span>پاسخ به: <span className="font-bold text-foreground">{replyingTo.author}</span></span>
              </div>
              <Button
                variant="ghost"
                size="sm"
                className="h-6 w-6 p-0 hover:bg-destructive/10 hover:text-destructive"
                onClick={onCancelReply}
              >
                <X className="h-4 w-4" />
              </Button>
            </div>
          )}

          <div className="relative">
            <textarea
              value={content}
              onChange={(e) => setContent(e.target.value)}
              className="bg-background ring-input placeholder:text-muted-foreground focus:ring-primary/50 min-h-[100px] w-full resize-y rounded-2xl border-none p-3 text-sm shadow-sm ring-1 outline-hidden transition-all focus:ring-2 md:min-h-[120px] md:p-4"
              placeholder={replyingTo ? "پاسخ خود را بنویسید..." : "دیدگاه خود را بنویسید..."}
              disabled={isPending}
            />
            <div className="absolute right-3 bottom-3">
              <MessageSquare className="text-muted-foreground/40 h-4 w-4" />
            </div>
          </div>

          <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
            <div className="bg-background ring-input flex items-center justify-between gap-3 rounded-xl px-3 py-2 shadow-sm ring-1 md:rounded-2xl md:px-4">
              <SimpleLabel
                htmlFor="spoiler-mode"
                className="text-muted-foreground text-xs"
              >
                حاوی اسپویل
              </SimpleLabel>
              <Switch
                dir="ltr"
                id="spoiler-mode"
                checked={isSpoiler}
                onCheckedChange={setIsSpoiler}
                className="data-[state=checked]:bg-destructive scale-90 md:scale-100"
                disabled={isPending}
              />
            </div>

            <Button 
              className="w-full gap-2 rounded-xl sm:w-auto"
              onClick={handleSubmit}
              disabled={isPending || !content.trim()}
            >
              <span>{isPending ? "در حال ارسال..." : "ارسال دیدگاه"}</span>
              <Send className="h-4 w-4 rotate-180" />
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};
