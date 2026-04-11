"use client";

import {
  ChallengeDetailHeader,
  ChallengeDetailLeftPanel,
  ChallengeDetailRightPanel,
  ChallengeDetailFooter,
} from "@/features/challenges/detail/ui/ChallengeDetailCard";
import { useChallengesDetail } from "@/features/challenges/detail/hooks/useChallengesDetail";
import ChallengeDetailCardSkeleton from "@/widgets/challengesDetail/ui/ChallengeDetailCardSkeleton";
import BackButton from "@/widgets/projectsDetail/ui/BackButton";
import DeleteChallengeButton from "@/widgets/challengesDetail/ui/DeleteChallengeButton";
import { notFound } from "next/navigation";

interface ChallengeDetailCardProps {
  challengeId: number;
}

export default function ChallengeDetailCard({
  challengeId,
}: ChallengeDetailCardProps) {
  const { data: challenge, isError } = useChallengesDetail(challengeId);

  if (isError) notFound();
  if (!challenge) return <ChallengeDetailCardSkeleton />;

  return (
    <>
      <div className="mt-6 mb-5 flex items-center justify-between gap-3 lg:mt-12 lg:mb-10">
        <BackButton />
        {challenge.isHost && (
          <DeleteChallengeButton challengeId={challengeId} />
        )}
      </div>
      <div className="w-full rounded-[20px] border border-gray-700 bg-gray-800 px-4 pt-8 pb-6 md:px-8 md:pt-12 md:pb-8 lg:px-10 lg:pt-15 lg:pb-10">
        <ChallengeDetailHeader challenge={challenge} />
        <div className="flex flex-col gap-6 lg:flex-row lg:gap-10">
          <div className="flex-1">
            <ChallengeDetailLeftPanel challenge={challenge} />
          </div>
          <div className="flex-1">
            <ChallengeDetailRightPanel challenge={challenge} />
          </div>
        </div>
        <ChallengeDetailFooter challenge={challenge} />
      </div>
    </>
  );
}
