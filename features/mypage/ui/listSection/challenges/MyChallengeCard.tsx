import {
  ChallengeCardProps,
  VERIFICATION_FREQUENCY_LABEL,
} from "@/features/challenges/model";
import { MyRoleType } from "@/features/mypage/model/mypage.types";
import { useRouter } from "next/navigation";
import { Crown } from "@/shared/icons";
import MyStatusBadge from "../MyStatusBadge";
import { DeadlineBadge, LikeButton, Progress } from "@/shared/ui";
import MyChallengeCardButton from "./MyChallengeCardButton";
import { useToggleMyChallengeLike } from "@/features/mypage/hooks/useToggleMyChallengeLike";

interface MyChallengeCardProps {
  data: ChallengeCardProps;
  role: MyRoleType;
}

export default function MyChallengeCard({ data, role }: MyChallengeCardProps) {
  const router = useRouter();
  const { mutate: toggleLike } = useToggleMyChallengeLike(data.id);

  const handleCardClick = () => router.push(`/challenges/${data.id}`);

  const isStarted =
    data.status === "IN_PROGRESS" || data.status === "COMPLETED";

  return (
    <article
      onClick={handleCardClick}
      className="flex w-full cursor-pointer flex-col rounded-[20px] border border-gray-700 bg-gray-800 px-5 pt-6 pb-5"
    >
      {/* 상태배지, 찜하기 */}
      <header className="mb-4 flex items-center justify-between">
        <MyStatusBadge
          status={data.status}
          participationStatus={data.myParticipationStatus}
        />
        <div
          className="flex items-center gap-2"
          onClick={(e) => e.stopPropagation()}
        >
          {role === "HOST" ? (
            <Crown />
          ) : (
            <LikeButton
              onToggle={() => toggleLike(data.isLiked)}
              liked={data.isLiked}
            />
          )}
        </div>
      </header>

      {/* 제목 */}
      <h4 className="mb-4 line-clamp-1 text-lg font-semibold text-gray-50">
        {data.title}
      </h4>

      {/* 정보 */}
      <div className="mb-4 flex flex-col gap-2 text-sm">
        {!isStarted && (
          <div className="flex items-center gap-2">
            <span className="shrink-0 text-gray-400">모집 마감일</span>
            <span className="text-gray-200">{data.recruitDeadline}</span>
            <DeadlineBadge
              endDate={data.recruitDeadline}
              className="px-2 py-1"
            />
          </div>
        )}
        <div className="flex items-center gap-2">
          <span className="shrink-0 text-gray-400">진행 기간</span>
          <span className="text-gray-200">
            {data.startDate} ~ {data.endDate}
          </span>
        </div>
        <div className="flex items-center gap-2">
          <span className="shrink-0 text-gray-400">인증 주기</span>
          <span className="text-gray-200">
            {VERIFICATION_FREQUENCY_LABEL[data.verificationFrequency]}
          </span>
        </div>
        <div className="flex items-center gap-2">
          <span className="shrink-0 text-gray-400">참여 인원</span>
          <span className="text-gray-200">
            {`${data.participantCount}/${data.maxParticipants}`}
          </span>
        </div>
        {isStarted && (
          <div className="flex items-center gap-2">
            <span className="shrink-0 text-gray-400">달성률</span>
            <Progress value={data.progressRate} max={100} className="flex-1" />
            <span className="text-gray-400">{data.progressRate}%</span>
          </div>
        )}
      </div>

      {/* 버튼 */}
      <footer className="mt-auto pt-4">
        <MyChallengeCardButton
          id={data.id}
          status={data.status}
          participationStatus={data.myParticipationStatus}
          role={role}
        />
      </footer>
    </article>
  );
}
