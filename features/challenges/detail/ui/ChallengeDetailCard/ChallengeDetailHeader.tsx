"use client";

import {
  buildCurrentPath,
  buildLoginPath,
} from "@/features/auth/lib/authRedirect";
import { LikeButton } from "@/shared/ui";
import type { ChallengesDetail } from "@/features/challenges/detail/model/challengesDetail";
import { useToggleChallengeLike } from "@/features/challenges/detail/hooks/useToggleChallengeLike";
import { useUserData } from "@/features/auth/hooks/queries/useUserData";
import { useOpenAlertModal } from "@/shared/store/AlertModal";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import {
  ChallengesJoinTypeBadge,
  ChallengesStatusBadge,
} from "@/features/challenges/ui";

interface ChallengeDetailHeaderProps {
  challenge: ChallengesDetail;
}

export default function ChallengeDetailHeader({
  challenge,
}: ChallengeDetailHeaderProps) {
  const { mutate: toggleLike } = useToggleChallengeLike(challenge.id);
  const { data: userData } = useUserData();
  const openAlertModal = useOpenAlertModal();
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const loginPath = buildLoginPath(buildCurrentPath(pathname, searchParams));

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
        onPositive: () => router.push(loginPath),
      });
      return;
    }
    toggleLike(challenge.isLiked);
  };

  return (
    <div className="mb-5 flex flex-col gap-4">
      <div className="flex flex-col-reverse items-start gap-5 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex flex-wrap items-center gap-2">
          <ChallengesStatusBadge status={challenge.status} />
          <ChallengesJoinTypeBadge type={challenge.joinType} />
        </div>
        <LikeButton
          className="ml-auto"
          liked={challenge.isLiked}
          onToggle={handleLikeToggle}
        />
      </div>
      <h1 className="text-2xl font-semibold text-gray-50 lg:text-3xl">
        {challenge.title}
      </h1>
    </div>
  );
}
