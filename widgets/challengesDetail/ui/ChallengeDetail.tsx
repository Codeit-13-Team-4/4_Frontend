"use client";

import { useChallengesDetail } from "@/features/challenges/detail/hooks/useChallengesDetail";
import ChallengeDetailHeader from "@/features/challenges/detail/ui/ChallengeDetailHeader";
import ChallengeDetailInfoPanel from "@/features/challenges/detail/ui/ChallengeDetailInfoPanel";
import ChallengeDetailContent from "@/features/challenges/detail/ui/ChallengeDetailContent";
import ChallengeDetailHostActions from "@/features/challenges/detail/ui/ChallengeDetailHostActions";
import { MemberPanel } from "@/features/challenges/detail/ui/MemberPanel";
import CommentSection from "./CommentSection";
import MemberSection from "./MemberSection";
import ChallengeDetailTabs from "./ChallengeDetailTabs";
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

      {/* lg 사이즈 InfoPanel + MemberPanel */}
      <div className="my-5 lg:col-start-2 lg:row-span-4 lg:row-start-1 lg:my-0 lg:flex lg:flex-col lg:gap-6">
        <ChallengeDetailInfoPanel challenge={challengeData} />
        <MemberPanel
          challengeId={challengeId}
          isHost={challengeData.isHost}
          className="hidden rounded-[20px] border border-gray-700 bg-gray-800 px-5 py-6 lg:block"
        />
      </div>

      <ChallengeDetailTabs />

      <div>
        <Separator className="mt-5 mb-4 bg-gray-700 md:mt-0 md:mb-4" />
        {challengeData.isHost && (
          <ChallengeDetailHostActions challengeId={challengeId} />
        )}
      </div>

      <div id="detail-section">
        <ChallengeDetailContent description={challengeData.description} />
      </div>

      {/* md 이하에서만 표시 */}
      <div className="lg:hidden">
        <MemberSection
          challengeId={challengeId}
          isHost={challengeData.isHost}
        />
      </div>

      <div id="comment-section" className="lg:col-start-1">
        <CommentSection challengeId={challengeId} />
      </div>
    </div>
  );
}
