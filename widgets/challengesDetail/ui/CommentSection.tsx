"use client";

import { useChallengesDetailComments } from "@/features/challenges/detail/hooks/useChallengesDetailComments";
import CommentInput from "@/features/challenges/detail/ui/Comment/CommentInput";
import CommentItemSkeleton from "@/features/challenges/detail/ui/Comment/CommentItemSkeleton";
import CommentList from "@/features/challenges/detail/ui/Comment/CommentList";

export default function CommentSection({
  challengeId,
}: {
  challengeId: number;
}) {
  const {
    data: commentData,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
  } = useChallengesDetailComments(challengeId);
  const total = commentData?.pages[0]?.total ?? 0;

  return (
    <section className="mt-8 lg:mt-12">
      <h2 className="mb-4 text-lg font-semibold text-gray-50 lg:mb-6 lg:text-xl">
        댓글 <span className="text-mint-700">{total}</span>
      </h2>
      <CommentInput challengeId={challengeId} />
      {commentData ? (
        <CommentList
          data={commentData}
          challengeId={challengeId}
          fetchNextPage={fetchNextPage}
          hasNextPage={hasNextPage}
          isFetchingNextPage={isFetchingNextPage}
        />
      ) : (
        <div className="mt-8 flex flex-col divide-y divide-gray-700">
          {Array.from({ length: 5 }).map((_, i) => (
            <CommentItemSkeleton key={i} />
          ))}
        </div>
      )}
    </section>
  );
}
