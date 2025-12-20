"use server";

import { getAnimeComments, getCommentReplies } from "@/lib/data";
import { createClient } from "@/utils/supabase/server";
import { revalidatePath } from "next/cache";

export async function fetchMoreComments(animeId: number, page: number) {
  return await getAnimeComments(animeId, page);
}

export async function fetchReplies(commentId: string) {
  return await getCommentReplies(commentId);
}

export async function submitComment({
  animeId,
  content,
  isSpoiler,
  parentId,
}: {
  animeId: number;
  content: string;
  isSpoiler: boolean;
  parentId?: string | null;
}) {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    throw new Error("Unauthorized");
  }

  const { error } = await supabase.from("comments").insert({
    content,
    anime_id: animeId,
    user_id: user.id,
    is_spoil: isSpoiler,
    parent_id: parentId || null,
  });

  if (error) {
    console.error("Error submitting comment:", error);
    throw new Error("Failed to submit comment");
  }

  revalidatePath(`/anime/${animeId}`);
}
