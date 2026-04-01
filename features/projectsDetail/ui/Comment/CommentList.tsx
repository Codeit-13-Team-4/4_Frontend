"use client";

import { useEffect } from "react";
import { useInView } from "react-intersection-observer";
import type { InfiniteData } from "@tanstack/react-query";
import type { CommentsResponse } from "@/features/projectsDetail/types/comment";
import CommentItem from "@/features/projectsDetail/ui/Comment/CommentItem";
import CommentEmpty from "@/features/projectsDetail/ui/Comment/CommentEmpty";
import { Spinner } from "@/shared/ui";

interface CommentListProps {
  data: InfiniteData<CommentsResponse>;
  projectId: number;
  fetchNextPage: () => void;
  hasNextPage: boolean;
  isFetchingNextPage: boolean;
}

export default function CommentList({
  data,
  projectId,
  fetchNextPage,
  hasNextPage,
  isFetchingNextPage,
}: CommentListProps) {
  const { ref, inView } = useInView({ threshold: 0.1 });

  useEffect(() => {
    if (inView && hasNextPage && !isFetchingNextPage) {
      fetchNextPage();
    }
  }, [inView, hasNextPage, isFetchingNextPage, fetchNextPage]);

  const comments = data.pages.flatMap((page) => page.data);

  if (comments.length === 0) {
    return <CommentEmpty />;
  }

  return (
    <>
      <div className="mt-8 flex flex-col divide-y divide-gray-700">
        {comments.map((comment) => (
          <CommentItem
            key={comment.id}
            comment={comment}
            projectId={projectId}
          />
        ))}
      </div>
      <div ref={ref} />
      {isFetchingNextPage && (
        <div className="flex justify-center py-4">
          <Spinner />
        </div>
      )}
    </>
  );
}
