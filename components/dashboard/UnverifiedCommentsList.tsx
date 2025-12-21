"use client";

import { useState } from "react";
import { formatDistanceToNow } from "date-fns";
import { Check, Trash2, ExternalLink } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { verifyComment, deleteComment } from "@/app/actions/admin-comment-actions";
import { toast } from "sonner";
import Link from "next/link";
import { Pagination } from "@/components/ui/pagination-control";
import { slugify } from "@/lib/utils";

interface Comment {
  id: string;
  content: string;
  created_at: string;
  user_id: string;
  anime_id: number;
  verified: boolean;
  profiles: {
    name: string;
    avatar: string;
  } | null;
  animes: {
    title_en_normalized: string | null;
    title_english: string | null;
    dic_title: string | null;
  } | null;
}

interface UnverifiedCommentsListProps {
  initialComments: Comment[];
  currentPage: number;
  totalPages: number;
}

export function UnverifiedCommentsList({
  initialComments,
  currentPage,
  totalPages,
}: UnverifiedCommentsListProps) {
  const [comments, setComments] = useState<Comment[]>(initialComments);

  const handleVerify = async (id: string) => {
    try {
      await verifyComment(id);
      setComments((prev) => prev.filter((c) => c.id !== id));
      toast.success("نظر تأیید شد", {
        description: "نظر با موفقیت تأیید شد و در سایت نمایش داده می‌شود.",
      });
    } catch (error) {
      toast.error("خطا", {
        description: "مشکلی در تأیید نظر پیش آمد.",
      });
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm("آیا از حذف این نظر اطمینان دارید؟")) return;
    try {
      await deleteComment(id);
      setComments((prev) => prev.filter((c) => c.id !== id));
      toast.success("نظر حذف شد", {
        description: "نظر با موفقیت حذف گردید.",
      });
    } catch (error) {
      toast.error("خطا", {
        description: "مشکلی در حذف نظر پیش آمد.",
      });
    }
  };

  if (comments.length === 0) {
    return (
      <div className="flex min-h-[200px] flex-col items-center justify-center rounded-lg border border-dashed p-8 text-center animate-in fade-in-50">
        <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-muted">
          <Check className="h-6 w-6 text-muted-foreground" />
        </div>
        <h3 className="mt-4 text-lg font-semibold">همه نظرات بررسی شده‌اند</h3>
        <p className="mb-4 mt-2 text-sm text-muted-foreground">
          هیچ نظر تأیید نشده‌ای در حال حاضر وجود ندارد.
        </p>
      </div>
    );
  }

  return (
    <div className="grid gap-4">
      {comments.map((comment) => (
        <Card key={comment.id} className="overflow-hidden transition-all hover:shadow-md">
          <CardHeader className="flex flex-row items-start gap-4 space-y-0 p-4 bg-muted/30">
            <Avatar className="h-10 w-10 border border-background">
              <AvatarImage src={comment.profiles?.avatar} />
              <AvatarFallback suppressHydrationWarning>{comment.profiles?.name?.[0] || "?"}</AvatarFallback>
            </Avatar>
            <div className="flex-1 space-y-1">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                    <span className="font-semibold text-sm">{comment.profiles?.name || "کاربر ناشناس"}</span>
                    <span className="text-xs text-muted-foreground" suppressHydrationWarning>
                      • {formatDistanceToNow(new Date(comment.created_at), { addSuffix: true })}
                    </span>
                </div>
                {comment.animes && (
                     <Link href={`/anime/${comment.anime_id}/${slugify(comment.animes.dic_title || comment.animes.title_english || '')}`} className="text-xs text-primary hover:underline flex items-center gap-1" target="_blank">
                        {comment.animes.dic_title || comment.animes.title_english || `Anime #${comment.anime_id}`}
                        <ExternalLink className="h-3 w-3" />
                     </Link>
                )}
              </div>
            </div>
          </CardHeader>
          <CardContent className="p-4 pt-2">
            <p className="text-sm leading-relaxed whitespace-pre-wrap mb-4 bg-muted/20 p-3 rounded-md border border-border/50">
              {comment.content}
            </p>
            <div className="flex justify-end gap-2">
              <Button
                variant="destructive"
                size="sm"
                onClick={() => handleDelete(comment.id)}
                className="h-8 text-xs gap-1"
              >
                <Trash2 className="h-3.5 w-3.5" />
                حذف
              </Button>
              <Button
                variant="default"
                size="sm"
                onClick={() => handleVerify(comment.id)}
                className="h-8 text-xs gap-1 bg-chart-4 hover:bg-chart-4/90"
              >
                <Check className="h-3.5 w-3.5" />
                تأیید
              </Button>
            </div>
          </CardContent>
        </Card>
      ))}
      <Pagination currentPage={currentPage} totalPages={totalPages} />
    </div>
  );
}

