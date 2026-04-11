"use client";

import { useEffect } from "react";
import { useInView } from "react-intersection-observer";
import type { InfiniteData } from "@tanstack/react-query";
import { Spinner } from "@/shared/ui";
import { CommentsResponse } from "@/features/challenges/detail/model/comment";
import CommentEmpty from "./CommentEmpty";
import CommentItem from "./CommentItem";

interface CommentListProps {
  data: InfiniteData<CommentsResponse>;
  challengeId: number;
  fetchNextPage: () => void;
  hasNextPage: boolean;
  isFetchingNextPage: boolean;
}

export default function CommentList({
  data,
  challengeId,
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
            challengeId={challengeId}
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
