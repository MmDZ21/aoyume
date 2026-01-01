import { createClient } from "@/utils/supabase/server";
import { redirect } from "next/navigation";
import { UnverifiedCommentsList } from "@/components/dashboard/UnverifiedCommentsList";
import { MessageSquareMore } from "lucide-react";
import { getRoleFromSession } from "@/lib/utils";

export default async function CommentsPage(props: {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) {
  const searchParams = await props.searchParams;
  const page = Number(searchParams.page) || 1;
  const limit = 10;
  const from = (page - 1) * limit;
  const to = from + limit - 1;

  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    redirect("/sign-in");
  }

  const {
    data: { session },
  } = await supabase.auth.getSession();

  // Check role
  const role = getRoleFromSession(session);
  console.log("Comments Page - User Role:", role);
  if (!["admin", "moderator"].includes(role)) {
    redirect("/dashboard");
  }

  // Fetch unverified comments
  const { data: comments, error, count } = await supabase
    .from("comments")
    .select(
      `
      id,
      content,
      created_at,
      user_id,
      anime_id,
      verified,
      profiles (name, avatar),
      animes (title_en_normalized, dic_title)
    `,
      { count: "exact" }
    )
    .eq("verified", false)
    .order("created_at", { ascending: false })
    .range(from, to);

  if (error) {
    console.error("Error fetching comments:", error);
    return <div>خطا در دریافت نظرات</div>;
  }

  const totalPages = count ? Math.ceil(count / limit) : 1;

  // Transform data to match component interface
  const formattedComments = (comments || []).map((c) => ({
    ...c,
    animes: c.animes
      ? {
          title_english: null,
          title_en_normalized: c.animes.title_en_normalized,
          dic_title: c.animes.dic_title,
        }
      : null, // Adjust based on actual query result structure if needed
  }));

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-3 border-b pb-4">
        <div className="rounded-lg bg-chart-5/10 p-2 text-chart-5">
          <MessageSquareMore className="h-6 w-6" />
        </div>
        <div>
          <h1 className="text-2xl font-bold">نظرات در انتظار تأیید</h1>
          <p className="text-muted-foreground text-sm">
            مدیریت و بررسی نظرات ارسال شده کاربران
          </p>
        </div>
      </div>

      <UnverifiedCommentsList
        key={page}
        initialComments={formattedComments}
        currentPage={page}
        totalPages={totalPages}
      />
    </div>
  );
}

