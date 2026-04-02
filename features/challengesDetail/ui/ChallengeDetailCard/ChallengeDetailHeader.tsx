"use client";

import Image from "next/image";
import { Badge, LikeButton } from "@/shared/ui";
import type { ChallengesDetail } from "@/features/challengesDetail/types/challengesDetail";
import { useToggleChallengeLike } from "@/features/challengesDetail/hooks/useToggleChallengeLike";
import { useUserData } from "@/features/auth/hooks/queries/useUserData";
import { useOpenAlertModal } from "@/shared/store/AlertModal";
import { useRouter } from "next/navigation";
import {
  CHALLENGE_STATUS_LABEL,
  JOIN_TYPE_LABEL,
} from "@/features/challengesDetail/model/challenges.constants";

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

  const statusInfo = CHALLENGE_STATUS_LABEL[challenge.status];
  const joinInfo = JOIN_TYPE_LABEL[challenge.joinType];

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
    toggleLike(challenge.isLiked);
  };

  return (
    <div className="mb-5 flex flex-col gap-4">
      <div className="flex flex-col-reverse items-start gap-5 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex flex-wrap items-center gap-2">
          <Badge variant={statusInfo.variant}>{statusInfo.label}</Badge>
          <Badge variant={joinInfo.variant}>
            <Image
              src={joinInfo.icon}
              alt={joinInfo.label}
              width={24}
              height={24}
            />
            {joinInfo.label}
          </Badge>
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
