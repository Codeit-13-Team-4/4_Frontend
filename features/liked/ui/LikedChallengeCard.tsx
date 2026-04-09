"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { useUserData } from "@/features/auth/hooks/queries/useUserData";
import {
  ChallengeCardProps,
  CHALLENGES_STATUS,
  VERIFICATION_FREQUENCY_LABEL,
} from "@/features/challenges/model";
import { challengeKeys } from "@/features/challenges/model/challenges.queryKey";
import { ChallengesBadge } from "@/features/challenges/ui";
import { toggleChallengeLike } from "@/features/challengesDetail/api/toggleChallengeLike";
import { likedChallengeKeys } from "@/features/liked/model";
import { CommentIcon, Eyeopen } from "@/shared/icons";
import { useOpenAlertModal } from "@/shared/store/AlertModal";
import { DeadlineBadge, LikeButton, Progress, StatusBadge } from "@/shared/ui";

export function LikedChallengeCard({ data }: { data: ChallengeCardProps }) {
  const {
    id,
    title,
    status,
    participationType,
    tags,
    verificationFrequency,
    recruitDeadline,
    participantCount,
    maxParticipants,
    viewCount,
    commentCount,
    isLiked,
  } = data;

  const router = useRouter();
  const queryClient = useQueryClient();
  const openAlertModal = useOpenAlertModal();
  const { data: userData } = useUserData();
  const { mutate: toggleLike, isPending } = useMutation({
    mutationFn: (currentLiked: boolean) =>
      toggleChallengeLike(id, currentLiked),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: likedChallengeKeys.lists() });
      queryClient.invalidateQueries({ queryKey: challengeKeys.detail(id) });
      queryClient.invalidateQueries({ queryKey: challengeKeys.lists() });
    },
  });

  const handleLikeToggle = () => {
    if (!userData) {
      openAlertModal({
        title: "로그인이 필요합니다",
        description: "좋아요 기능은 로그인 후 이용할 수 있습니다.",
        positive: {
          text: "로그인하기",
          button: { type: "default", variant: "primary" },
        },
        negative: { text: "취소" },
        onPositive: () => router.push("/login"),
      });
      return;
    }

    toggleLike(isLiked);
  };

  const handleCardClick = () => {
    router.push(`/challenges/${id}`);
  };

  const badgeStatus =
    CHALLENGES_STATUS[status].value === "recruiting"
      ? "recruiting"
      : "recruitment_closed";

  return (
    <article
      onClick={handleCardClick}
      className="flex h-90.5 w-full cursor-pointer flex-col rounded-[20px] border-2 border-gray-700 bg-gray-800 px-4 pt-6 pb-5"
    >
      <header className="mb-7 flex items-center justify-between">
        <div className="flex gap-2">
          <StatusBadge status={badgeStatus} />
          <ChallengesBadge type={participationType} />
        </div>
        <div
          onClick={(event) => {
            event.stopPropagation();
          }}
        >
          <LikeButton
            liked={isLiked}
            onToggle={handleLikeToggle}
            disabled={isPending}
          />
        </div>
      </header>
      <div className="mb-7 flex flex-col">
        <section className="flex flex-col">
          <div className="mb-2 flex items-center justify-between gap-1">
            <h4 className="line-clamp-1 text-[20px] text-gray-50 lg:line-clamp-2">
              {title}
            </h4>
          </div>
          <ul className="line-clamp-1 flex gap-3 text-gray-400">
            {tags.map((item) => (
              <li key={item}>#{item}</li>
            ))}
          </ul>
        </section>
      </div>
      <section className="mb-5 flex gap-2">
        <span className="text-gray-400">인증 주기</span>
        <span>{VERIFICATION_FREQUENCY_LABEL[verificationFrequency]}</span>
      </section>
      <section className="flex items-center gap-2">
        <span className="text-gray-400">참여인원</span>
        <Progress
          value={participantCount}
          max={maxParticipants}
          className="flex-1"
        />
        <p className="text-sm text-gray-400">
          <span className="text-mint-500">{participantCount}</span> /
          <span>{maxParticipants}</span>
        </p>
      </section>
      <footer className="mt-auto flex justify-between">
        <div className="flex gap-6">
          <div className="flex items-center gap-1.25">
            <Eyeopen width={24} height={24} className="text-gray-400" />
            <span className="text-[14px] text-gray-400">{viewCount}</span>
          </div>
          <div className="flex items-center gap-1.25">
            <CommentIcon width={24} height={24} className="text-gray-400" />
            <span className="text-[14px] text-gray-400">{commentCount}</span>
          </div>
        </div>

        <DeadlineBadge
          endDate={recruitDeadline}
          className="self-start text-nowrap"
        />
      </footer>
    </article>
  );
}
