"use client";

import { CommentWithReplies } from "@/types/comment";
import { CommentItem } from "./CommentItem";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { fetchMoreComments } from "@/app/actions/comment-actions";
import { Loader2 } from "lucide-react";
import { CommentInput } from "./CommentInput";

interface CommentsListProps {
  initialComments: CommentWithReplies[];
  animeId: number;
  totalCount: number;
  topLevelCount: number;
}

export const CommentsList = ({
  initialComments,
  animeId,
  totalCount,
  topLevelCount,
}: CommentsListProps) => {
  const [comments, setComments] = useState<CommentWithReplies[]>(initialComments);
  const [page, setPage] = useState(2);
  const [isLoading, setIsLoading] = useState(false);
  const [hasMore, setHasMore] = useState(initialComments.length < topLevelCount);
  const [replyingTo, setReplyingTo] = useState<{ id: string; author: string; content: string } | null>(null);

  const handleLoadMore = async () => {
    setIsLoading(true);
    try {
      const { comments: newComments } = await fetchMoreComments(animeId, page);
      if (newComments.length === 0) {
        setHasMore(false);
      } else {
        setComments((prev) => [...prev, ...newComments]);
        setPage((prev) => prev + 1);
        if (comments.length + newComments.length >= topLevelCount) {
          setHasMore(false);
        }
      }
    } catch (error) {
      console.error("Failed to load more comments", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleReply = (comment: CommentWithReplies) => {
    setReplyingTo({
      id: comment.id,
      author: comment.name || "کاربر مهمان",
      content: comment.content,
    });
    // Scroll to input
    const inputElement = document.getElementById("comment-input-section");
    inputElement?.scrollIntoView({ behavior: "smooth", block: "center" });
  };

  return (
    <div className="space-y-6">
      {/* Input Section */}
      <div id="comment-input-section" className="animate-in fade-in slide-in-from-top-5 duration-700">
        <CommentInput 
          animeId={animeId} 
          replyingTo={replyingTo}
          onCancelReply={() => setReplyingTo(null)}
          onSuccess={() => setReplyingTo(null)}
        />
      </div>

      <div className="space-y-6">
        <div className="flex items-center gap-2 pb-2">
          <h3 className="text-foreground text-lg font-bold">نظرات کاربران</h3>
          <span className="bg-secondary text-muted-foreground rounded-full px-2 py-0.5 text-xs font-medium">
            {totalCount}
          </span>
        </div>

        <div className="space-y-6">
          {comments.map((comment, index) => (
            <div
              key={comment.id}
              className="animate-in fade-in slide-in-from-bottom-4"
              style={{ animationDelay: `${index * 50}ms` }}
            >
              <CommentItem comment={comment} onReply={handleReply} />
            </div>
          ))}
        </div>

        {hasMore && (
          <div className="flex justify-center pt-4">
            <Button
              variant="outline"
              onClick={handleLoadMore}
              disabled={isLoading}
              className="w-full md:w-auto"
            >
              {isLoading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  در حال بارگذاری...
                </>
              ) : (
                "نمایش نظرات بیشتر"
              )}
            </Button>
          </div>
        )}
      </div>
    </div>
  );
};

