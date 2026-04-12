"use client";

import type { ChallengesDetail } from "@/features/challenges/detail/model/challengesDetail";
import { CalendarIcon, Clock, Fire, People } from "@/shared/icons";
import { DeadlineBadge, Progress } from "@/shared/ui";
import { VERIFICATION_FREQUENCY_LABEL } from "@/features/challenges/detail/model/challenges.constants";
import ChallengeDetailActionButtons from "@/features/challenges/detail/ui/ChallengeDetailActionButtons";

interface ChallengeDetailInfoPanelProps {
  challenge: ChallengesDetail;
}

export default function ChallengeDetailInfoPanel({
  challenge,
}: ChallengeDetailInfoPanelProps) {
  return (
    <div className="flex flex-col gap-4 rounded-[20px] border border-gray-700 bg-gray-800 px-5 pt-10 pb-5">
      <div className="flex flex-col gap-1 font-medium lg:flex-row lg:items-center lg:gap-3">
        <div className="flex items-center gap-2 text-gray-600">
          <Clock width={18} height={18} />
          <span>모집 마감</span>
        </div>
        <span className="flex items-center gap-2 text-gray-400">
          {challenge.recruitDeadline}
          <DeadlineBadge endDate={challenge.endDate} className="text-xs" />
        </span>
      </div>

      <div className="flex flex-col gap-1 font-medium lg:flex-row lg:items-center lg:gap-3">
        <div className="flex items-center gap-2 text-gray-600">
          <CalendarIcon width={18} height={18} />
          <span>진행 기간</span>
        </div>
        <span className="flex items-center gap-2 text-gray-400">
          {challenge.startDate} ~ {challenge.endDate}
        </span>
      </div>

      <div className="flex flex-col gap-1 font-medium lg:flex-row lg:items-center lg:gap-3">
        <div className="flex items-center gap-2 text-gray-600">
          <Fire width={18} height={18} />
          <span>인증 주기</span>
        </div>
        <span className="flex items-center gap-2 font-semibold text-gray-400">
          {VERIFICATION_FREQUENCY_LABEL[challenge.verificationFrequency]}
        </span>
      </div>

      <div className="flex flex-col gap-2 font-medium">
        <div className="flex items-center gap-2 text-gray-600">
          <People width={18} height={18} />
          <span>참여 인원</span>
        </div>
        <div className="flex items-center gap-2">
          <Progress
            value={challenge.participantCount}
            max={challenge.maxParticipants}
            className="flex-1"
          />
          <span className="text-sm text-nowrap text-gray-300">
            <span className="text-mint-500">{challenge.participantCount}</span>
            {" / "}
            {challenge.maxParticipants}
          </span>
        </div>
      </div>

      <ChallengeDetailActionButtons challenge={challenge} />
    </div>
  );
}
