"use client";

import { useEffect } from "react";
import { useInView } from "react-intersection-observer";
import { MyRoleType } from "@/features/mypage/model/mypage.types";
import { useGetMyChallenges } from "@/features/mypage/hooks/useGetMyChallenges";
import MyChallengeCard from "./MyChallengeCard";
import MyChallengeCardSkeleton from "./MyChallengeCardSkeleton";
import MyChallengeEmpty from "./MyChallengeEmpty";
import { Spinner } from "@/shared/ui";

interface MyChallengeListProps {
  role: MyRoleType;
  status: string;
}

export default function MyChallengeList({
  role,
  status,
}: MyChallengeListProps) {
  const { data, fetchNextPage, hasNextPage, isFetchingNextPage, isLoading } =
    useGetMyChallenges(role, status);

  const { ref, inView } = useInView();

  useEffect(() => {
    if (inView && hasNextPage && !isFetchingNextPage) {
      fetchNextPage();
    }
  }, [inView, hasNextPage, isFetchingNextPage, fetchNextPage]);

  const challenges = data?.pages.flatMap((page) => page.data) ?? [];

  if (isLoading) {
    return (
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
        {Array.from({ length: 6 }).map((_, i) => (
          <MyChallengeCardSkeleton key={i} />
        ))}
      </div>
    );
  }

  if (challenges.length === 0) {
    return <MyChallengeEmpty />;
  }

  return (
    <div>
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
        {challenges.map((challenge) => (
          <MyChallengeCard key={challenge.id} data={challenge} />
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
