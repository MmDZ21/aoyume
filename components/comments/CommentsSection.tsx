import { getAnimeComments } from "@/lib/data";
import { CommentsList } from "./CommentsList";

interface CommentsSectionProps {
  animeId: number;
}

export const CommentsSection = async ({ animeId }: CommentsSectionProps) => {
  const { comments, count, totalCount } = await getAnimeComments(animeId);

  return (
    <div className="mx-auto max-w-6xl space-y-10 px-4 py-2">
      <div className="space-y-6">
        <CommentsList 
          initialComments={comments} 
          animeId={animeId} 
          totalCount={totalCount}
          topLevelCount={count}
        />
      </div>
    </div>
  );
};
