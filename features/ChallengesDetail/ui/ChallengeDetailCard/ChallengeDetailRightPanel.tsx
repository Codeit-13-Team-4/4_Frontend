import type { ChallengesDetail } from "@/features/challengesDetail/types/challengesDetail";
import { formatDate } from "@/shared/utils";
import { Progress } from "@/shared/ui";
import Image from "next/image";
import { VERIFICATION_FREQUENCY_LABEL } from "@/features/challengesDetail/model/challenges.constants";

interface ChallengeDetailRightPanelProps {
  challenge: ChallengesDetail;
}

export default function ChallengeDetailRightPanel({
  challenge,
}: ChallengeDetailRightPanelProps) {
  const recruitDeadline = formatDate(new Date(challenge.recruitDeadline));
  const startDate = formatDate(new Date(challenge.startDate));
  const endDate = formatDate(new Date(challenge.endDate));

  return (
    <div className="flex flex-col gap-5">
      <div className="flex items-center gap-3">
        <div className="flex shrink-0 items-center gap-1.5 text-sm text-gray-500 lg:text-lg">
          <Image
            src="/icons/common/clock.svg"
            alt="모집 마감"
            width={18}
            height={18}
          />
          <span>모집 마감</span>
        </div>
        <span className="text-sm text-gray-400 lg:text-lg">
          {recruitDeadline}
          {challenge.daysLeft >= 0 && (
            <span className="text-mint-500 border-mint-500 ml-2 rounded-full border bg-gray-900 px-2 py-1 text-xs">
              D-{challenge.daysLeft === 0 ? "day" : challenge.daysLeft}
            </span>
          )}
        </span>
      </div>

      <div className="flex items-center gap-3">
        <div className="flex shrink-0 items-center gap-1.5 text-sm text-gray-500 lg:text-lg">
          <Image
            src="/icons/common/calendar.svg"
            alt="진행 기간"
            width={18}
            height={18}
          />
          <span>진행 기간</span>
        </div>
        <span className="text-sm text-gray-400 lg:text-lg">
          {startDate} ~ {endDate}
        </span>
      </div>

      <div className="flex items-center gap-3">
        <div className="flex shrink-0 items-center gap-1.5 text-sm text-gray-500 lg:text-lg">
          <Image
            src="/icons/common/fire.svg"
            alt="인증 주기"
            width={18}
            height={18}
          />
          <span>인증 주기</span>
        </div>
        <span className="text-sm text-gray-400 lg:text-lg">
          {VERIFICATION_FREQUENCY_LABEL[challenge.verificationFrequency]}
        </span>
      </div>

      <div className="flex flex-col gap-2">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-1.5 text-sm text-gray-500 lg:text-lg">
            <Image
              src="/icons/common/people.svg"
              alt="참여인원"
              width={18}
              height={18}
            />
            <span>참여인원</span>
          </div>
          <span className="text-sm text-gray-400 lg:text-lg">
            {challenge.participantCount} / {challenge.maxParticipants}
          </span>
        </div>
        <Progress
          value={challenge.participantCount}
          max={challenge.maxParticipants}
        />
      </div>
    </div>
  );
}
