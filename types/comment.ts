import { Database } from "./database.types";

export type CommentRow = Database["public"]["Tables"]["comments"]["Row"];

export type CommentWithReplies = CommentRow & {
  // Flattened profile fields
  name: string | null;
  avatar: string | null;
  
  // Computed
  replies_count?: number;
  replies?: CommentWithReplies[];
};
