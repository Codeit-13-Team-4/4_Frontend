"use client";

import { useProjectsDetailComments } from "@/features/projects/detail/hooks/useProjectsDetailComments";
import {
  CommentInput,
  CommentList,
  CommentItemSkeleton,
} from "@/features/projects/detail/ui/Comment";

interface CommentSectionProps {
  projectId: number;
}

export default function CommentSection({ projectId }: CommentSectionProps) {
  const {
    data: commentData,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
  } = useProjectsDetailComments(projectId);
  const total = commentData?.pages[0]?.total ?? 0;

  return (
    <section className="mt-8 lg:mt-12">
      <h2 className="mb-4 text-lg font-semibold text-gray-50 lg:mb-6 lg:text-xl">
        댓글 <span className="text-mint-700">{total}</span>
      </h2>
      <CommentInput projectId={projectId} />
      {commentData ? (
        <CommentList
          data={commentData}
          projectId={projectId}
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
