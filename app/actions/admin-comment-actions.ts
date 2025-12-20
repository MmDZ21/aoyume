"use server";

import { createClient } from "@/utils/supabase/server";
import { revalidatePath } from "next/cache";
import { getRoleFromSession } from "@/lib/utils";

export async function verifyComment(commentId: string) {
  const supabase = await createClient();
  
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    throw new Error("Unauthorized");
  }

  const {
    data: { session },
  } = await supabase.auth.getSession();

  // Check role from JWT
  const role = getRoleFromSession(session);
  console.log("Verify Comment Action - User Role:", role);
  if (!["admin", "moderator"].includes(role)) {
    throw new Error("Forbidden: You do not have permission to verify comments.");
  }

  const { error } = await supabase
    .from("comments")
    .update({ verified: true })
    .eq("id", commentId);

  if (error) {
    console.error("Error verifying comment:", error);
    throw new Error("Failed to verify comment");
  }

  revalidatePath("/dashboard/comments");
  revalidatePath("/anime/[id]/[slug]", "page"); // Revalidate anime pages if possible, or just let cache expire
  return { success: true };
}

export async function deleteComment(commentId: string) {
  const supabase = await createClient();
  
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    throw new Error("Unauthorized");
  }

  const {
    data: { session },
  } = await supabase.auth.getSession();

  // Check role from JWT
  const role = getRoleFromSession(session);
  console.log("Delete Comment Action - User Role:", role);
  if (!["admin", "moderator"].includes(role)) {
    throw new Error("Forbidden: You do not have permission to delete comments.");
  }

  const { error } = await supabase
    .from("comments")
    .delete()
    .eq("id", commentId);

  if (error) {
    console.error("Error deleting comment:", error);
    throw new Error("Failed to delete comment");
  }

  revalidatePath("/dashboard/comments");
  return { success: true };
}

