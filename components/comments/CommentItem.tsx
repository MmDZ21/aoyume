"use client";

import {
  ThumbsUp,
  ThumbsDown,
  Reply,
  AlertTriangle,
  User,
  Eye,
  MessageCircle,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import Image from "next/image";
import { useState } from "react";
import { CommentWithReplies } from "@/types/comment";
import { fetchReplies } from "@/app/actions/comment-actions";

interface CommentItemProps {
  comment: CommentWithReplies;
  isReply?: boolean;
  onReply?: (comment: CommentWithReplies) => void;
  replyingToUser?: string | null;
}

export const CommentItem = ({ comment, isReply = false, onReply, replyingToUser }: CommentItemProps) => {
  const {
    id,
    name,
    avatar,
    created_at,
    content,
    is_spoil,
    verified,
    replies_count,
  } = comment;

  const [isSpoilerVisible, setIsSpoilerVisible] = useState(false);
  const [replies, setReplies] = useState<CommentWithReplies[]>(
    comment.replies || []
  );
  const [isLoadingReplies, setIsLoadingReplies] = useState(false);
  const [showReplies, setShowReplies] = useState(false);

  const formattedDate = created_at
    ? new Date(created_at).toLocaleDateString("fa-IR", {
        year: "numeric",
        month: "long",
        day: "numeric",
      })
    : "";

  const handleLoadReplies = async () => {
    if (replies.length > 0) {
      setShowReplies(!showReplies);
      return;
    }

    if (!id) return;

    setIsLoadingReplies(true);
    try {
      const fetchedReplies = await fetchReplies(id);
      if (fetchedReplies) {
        setReplies(fetchedReplies);
        setShowReplies(true);
      }
    } catch (error) {
      console.error("Failed to load replies", error);
    } finally {
      setIsLoadingReplies(false);
    }
  };

  return (
    <div className="space-y-4">
      <div
        className={cn(
          "group animate-in fade-in slide-in-from-bottom-2 flex gap-3 duration-500 md:gap-4",
          isReply && "pr-4 md:pr-12"
        )}
      >
        {/* Avatar */}
        <div className="relative shrink-0">
          {isReply && (
            <div className="border-border/50 absolute top-0 -right-8 -z-10 hidden h-full w-8 rounded-br-3xl border-r-2 border-b-2 md:block" />
          )}
          <div
            className={cn(
              "border-border relative overflow-hidden rounded-full border shadow-sm transition-transform duration-300 group-hover:scale-105",
              isReply ? "h-8 w-8 md:h-10 md:w-10" : "h-10 w-10 md:h-12 md:w-12"
            )}
          >
            {avatar ? (
              <Image src={avatar} alt={name || "User"} fill className="object-cover" />
            ) : (
              <div className="bg-secondary/50 text-muted-foreground flex h-full w-full items-center justify-center">
                <User className={cn("h-1/2 w-1/2")} />
              </div>
            )}
          </div>
        </div>

        {/* Comment Content */}
        <div className="min-w-0 flex-1">
          <div
            className={cn(
              "relative rounded-2xl p-4 transition-all duration-300 hover:shadow-md md:p-5",
              isReply
                ? "bg-primary/10 dark:bg-primary/10"
                : "bg-primary/5 dark:bg-primary/5"
            )}
          >
            {/* Header */}
            <div className="mb-3 flex flex-wrap items-center justify-between gap-2">
              <div className="flex flex-wrap items-center gap-2 md:gap-3">
                <h4
                  className={cn(
                    "text-foreground text-sm font-bold md:text-base",
                    verified && "text-primary"
                  )}
                >
                  {name || "کاربر مهمان"}
                </h4>

                {verified && (
                  <span className="bg-primary text-primary-foreground ring-primary/20 rounded-2xl px-2 py-0.5 text-[10px] font-medium whitespace-nowrap ring-1">
                    مدیریت
                  </span>
                )}
                <span className="text-muted-foreground hidden text-xs sm:inline">
                  •
                </span>
                <span className="text-muted-foreground text-[10px] whitespace-nowrap md:text-xs">
                  {formattedDate}
                </span>
                {replyingToUser && (
                  <span className="text-foreground text-xs bg-chart-5/20 rounded-2xl px-2 py-0.5 text-[10px] font-medium whitespace-nowrap ring-1 ring-chart-5/20">
                    در پاسخ به <span className="font-bold">{replyingToUser}</span>
                  </span>
                )}
              </div>
            </div>

            {/* Body */}
            <div className="relative space-y-2">
              {is_spoil && (
                <div className="inline-flex items-center rounded-md bg-destructive/10 px-2 py-1 text-[10px] font-medium text-destructive md:text-xs">
                  حاوی اسپویل
                </div>
              )}

              <div className="relative">
                <p
                  className={cn(
                    "text-foreground text-justify text-sm leading-8 transition-all duration-300 md:text-base md:leading-8",
                    is_spoil && !isSpoilerVisible && "blur-md select-none"
                  )}
                >
                  {content}
                </p>

                {is_spoil && !isSpoilerVisible && (
                  <div className="absolute inset-0 z-10 flex items-center justify-center">
                    <Button
                      variant="secondary"
                      size="sm"
                      className="bg-background/80 hover:bg-background h-8 gap-2 text-xs shadow-sm backdrop-blur-sm"
                      onClick={() => setIsSpoilerVisible(true)}
                    >
                      <Eye className="h-3 w-3 md:h-4 md:w-4" />
                      <span>نمایش محتوا</span>
                    </Button>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Actions */}
          <div className="mt-2 flex flex-wrap items-center justify-end gap-1 px-2">
            {/* Likes/Dislikes placeholders since not in DB yet */}
            <Button
              variant="ghost"
              size="sm"
              className="text-muted-foreground h-7 gap-1.5 rounded-full px-2 hover:bg-chart-4/10 hover:text-chart-4 md:h-8"
            >
              <span className="text-xs font-medium">0</span>
              <ThumbsUp className="h-3 w-3 md:h-3.5 md:w-3.5" />
            </Button>
            <Button
              variant="ghost"
              size="sm"
              className="text-muted-foreground h-7 gap-1.5 rounded-full px-2 hover:bg-destructive/10 hover:text-destructive md:h-8"
            >
              <span className="text-xs font-medium">0</span>
              <ThumbsDown className="h-3 w-3 md:h-3.5 md:w-3.5" />
            </Button>

            <div className="bg-border/50 mx-1 h-3 w-px md:h-4" />

            <Button
              variant="ghost"
              size="sm"
              onClick={() => onReply && onReply(comment)}
              className="text-muted-foreground h-7 gap-1.5 rounded-full px-2 hover:bg-primary/10 hover:text-primary md:h-8"
            >
              <span className="text-xs">پاسخ</span>
              <Reply className="h-3 w-3 md:h-3.5 md:w-3.5" />
            </Button>

            {/* View Replies Button */}
            {(replies_count || 0) > 0 && (
              <Button
                variant="ghost"
                size="sm"
                onClick={handleLoadReplies}
                className="text-muted-foreground h-7 gap-1.5 rounded-full px-2 hover:bg-primary/10 hover:text-primary md:h-8"
                disabled={isLoadingReplies}
              >
                {isLoadingReplies ? (
                  <span className="text-xs">در حال بارگذاری...</span>
                ) : (
                  <>
                    <span className="text-xs">{showReplies ? "پنهان کردن پاسخ‌ها" : `مشاهده ${replies_count} پاسخ`}</span>
                    <MessageCircle className="h-3 w-3 md:h-3.5 md:w-3.5" />
                  </>
                )}
              </Button>
            )}

            <Button
              variant="ghost"
              size="icon"
              className="text-muted-foreground h-7 w-7 rounded-full hover:text-destructive md:h-8 md:w-8"
            >
              <AlertTriangle className="h-3 w-3 md:h-3.5 md:w-3.5" />
            </Button>
          </div>
        </div>
      </div>

      {/* Replies */}
      {showReplies && replies.length > 0 && (
        <div className="relative space-y-4 border-none pr-2 md:pr-0">
          {replies.map((reply) => (
            <CommentItem 
              key={reply.id} 
              comment={reply} 
              isReply 
              onReply={onReply}
              replyingToUser={name} 
            />
          ))}
        </div>
      )}
    </div>
  );
};
