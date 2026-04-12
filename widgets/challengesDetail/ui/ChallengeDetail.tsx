"use client";

import { useChallengesDetail } from "@/features/challenges/detail/hooks/useChallengesDetail";
import ChallengeDetailHeader from "@/features/challenges/detail/ui/ChallengeDetailHeader";
import ChallengeDetailInfoPanel from "@/features/challenges/detail/ui/ChallengeDetailInfoPanel";
import ChallengeDetailContent from "@/features/challenges/detail/ui/ChallengeDetailContent";
import ChallengeDetailHostActions from "@/features/challenges/detail/ui/ChallengeDetailHostActions";
import CommentSection from "./CommentSection";
import { Separator } from "@/shared/ui";

export default function ChallengeDetail({
  challengeId,
}: {
  challengeId: number;
}) {
  const { data: challengeData } = useChallengesDetail(challengeId);

  return (
    <div className="grid grid-cols-1 lg:grid-cols-[1fr_360px] lg:gap-x-10 lg:gap-y-5">
      <ChallengeDetailHeader challenge={challengeData} />

      <div className="my-5 lg:col-start-2 lg:row-span-3 lg:row-start-1 lg:my-0">
        <ChallengeDetailInfoPanel challenge={challengeData} />
      </div>

      <Separator className="mt-5 mb-4 bg-gray-700 md:mt-0 md:mb-6 lg:mb-0" />

      {challengeData.isHost && (
        <ChallengeDetailHostActions challengeId={challengeId} />
      )}

      <ChallengeDetailContent description={challengeData.description} />

      <div className="lg:col-start-1">
        <CommentSection challengeId={challengeId} />
      </div>
    </div>
  );
}
