"use client";

import Image from "next/image";
import { useInView } from "react-intersection-observer";
import { useGetChallengesList } from "../../hooks/useGetChallengesList";
import { ChallengesCard } from "./ChallengesCard/ChallengesCard";
import {
  ChallengeCardProps,
  ChallengesFilter,
} from "@/features/challenges/model";
import { ChallengesCardSkeleton } from "./ChallengesCard/ChallengesCardSkeleton";

export function ChallengesCardList({
  filters,
}: {
  filters?: ChallengesFilter;
}) {
  const { data, isLoading, isFetchingNextPage, fetchNextPage, hasNextPage } =
    useGetChallengesList(filters);

  const { ref } = useInView({
    threshold: 0.1,
    onChange: (inView) => {
      if (inView && hasNextPage && !isFetchingNextPage) {
        fetchNextPage();
      }
    },
  });
  const cardData: ChallengeCardProps[] =
    data?.pages.flatMap((page) => page.data) ?? [];

  if (isLoading) {
    return (
      <div className="flex flex-wrap justify-center gap-3 md:mt-6 md:justify-start">
        {Array.from({ length: 6 }).map((_, index) => (
          <ChallengesCardSkeleton key={index} />
        ))}
      </div>
    );
  }
  if (cardData?.length === 0)
    return (
      <div className="mt-21 flex flex-col items-center justify-center gap-6 text-gray-400">
        <Image
          src="/images/img_empty.png"
          alt="프로젝트 목록 없음"
          width={120}
          height={70}
        />
        검색 결과가 없습니다.
      </div>
    );

  return (
    <div className="flex flex-wrap justify-center gap-3 md:mt-6 md:justify-start">
      {cardData?.map((item) => {
        return <ChallengesCard data={item} key={item.id} />;
      })}

      {isFetchingNextPage &&
        Array.from({ length: 3 }).map((_, i) => (
          <ChallengesCardSkeleton key={i} />
        ))}
      <div className="h-2 w-full" ref={ref} />
    </div>
  );
}
