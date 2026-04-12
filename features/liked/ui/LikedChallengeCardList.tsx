"use client";

import Image from "next/image";
import { useInView } from "react-intersection-observer";
import { ApiError } from "@/shared/lib/errors/ApiError";
import { ChallengesCardSkeleton } from "@/features/challenges/list/ui/ChallengesCardList/ChallengesCard/ChallengesCardSkeleton";
import { useGetLikedChallengeList } from "../hooks/useGetLikedChallengeList";
import type { LikedChallengeFilter } from "../model";
import { LikedChallengeCard } from "./LikedChallengeCard";

export function LikedChallengeCardList({
  filters,
}: {
  filters?: LikedChallengeFilter;
}) {
  const {
    data,
    error,
    isError,
    isLoading,
    isFetchingNextPage,
    fetchNextPage,
    hasNextPage,
  } = useGetLikedChallengeList(filters);

  const { ref } = useInView({
    threshold: 0.1,
    onChange: (inView) => {
      if (inView && hasNextPage && !isFetchingNextPage) {
        fetchNextPage();
      }
    },
  });

  const cardData = data?.pages.flatMap((page) => page.data) ?? [];

  if (isLoading) {
    return (
      <div className="flex flex-wrap justify-center gap-3 md:mt-6 md:justify-start">
        {Array.from({ length: 6 }).map((_, index) => (
          <ChallengesCardSkeleton key={index} />
        ))}
      </div>
    );
  }

  if (isError) {
    return (
      <div className="mt-21 flex flex-col items-center justify-center gap-3 text-gray-400">
        <p>
          {error instanceof ApiError && error.status === 401
            ? "로그인이 필요합니다."
            : "찜한 모임을 불러오지 못했습니다."}
        </p>
      </div>
    );
  }

  if (cardData.length === 0) {
    return (
      <div className="mt-21 flex flex-col items-center justify-center gap-6 text-gray-400">
        <Image
          src="/images/img_empty.png"
          alt="찜한 챌린지 없음"
          width={120}
          height={70}
        />
        찜한 챌린지가 없어요.
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 justify-center gap-3 px-4 md:mt-6 md:grid-cols-2 md:px-0 lg:grid-cols-3">
      {cardData.map((item) => (
        <LikedChallengeCard key={item.id} data={item} />
      ))}

      {isFetchingNextPage &&
        Array.from({ length: 3 }).map((_, index) => (
          <ChallengesCardSkeleton key={index} />
        ))}

      <div className="h-2 w-full" ref={ref} />
    </div>
  );
}
