"use client";

import { useEffect } from "react";
import { useInView } from "react-intersection-observer";
import { useGetMyComments } from "@/features/mypage/hooks/useGetMyComments";
import MyCommentItem from "./MyCommentItem";
import MyCommentSkeleton from "./MyCommentSkeleton";
import MyCommentEmpty from "./MyCommentEmpty";
import { Spinner } from "@/shared/ui";

export default function MyCommentList() {
  const { data, fetchNextPage, hasNextPage, isFetchingNextPage, isLoading } =
    useGetMyComments();

  const { ref, inView } = useInView();

  useEffect(() => {
    if (inView && hasNextPage && !isFetchingNextPage) {
      fetchNextPage();
    }
  }, [inView, hasNextPage, isFetchingNextPage, fetchNextPage]);

  const comments = data?.pages.flatMap((page) => page.data) ?? [];

  if (isLoading) {
    return (
      <div className="flex flex-col">
        {Array.from({ length: 5 }).map((_, i) => (
          <MyCommentSkeleton key={i} />
        ))}
      </div>
    );
  }

  if (comments.length === 0) {
    return <MyCommentEmpty />;
  }

  return (
    <div>
      <div className="flex flex-col">
        {comments.map((comment, index) => (
          <MyCommentItem key={index} comment={comment} />
        ))}
      </div>

      <div ref={ref} className="py-4">
        {isFetchingNextPage && (
          <div className="flex justify-center">
            <Spinner size="md" className="text-mint-500" />
          </div>
        )}
      </div>
    </div>
  );
}
