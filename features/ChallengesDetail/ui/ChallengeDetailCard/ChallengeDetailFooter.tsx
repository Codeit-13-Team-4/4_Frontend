"use client";

import Image from "next/image";
import { GradientButton, Button } from "@/shared/ui";
import { useUserData } from "@/features/auth/hooks/queries/useUserData";
import { useOpenAlertModal } from "@/shared/store/AlertModal";
import { useRouter } from "next/navigation";
import type { ChallengesDetail } from "@/features/challengesDetail/types/challengesDetail";

interface ChallengeDetailFooterProps {
  challenge: ChallengesDetail;
}

export default function ChallengeDetailFooter({
  challenge,
}: ChallengeDetailFooterProps) {
  const { data: userData } = useUserData();
  const openAlertModal = useOpenAlertModal();
  const router = useRouter();

  const handleJoinClick = () => {
    if (!userData) {
      openAlertModal({
        title: "로그인이 필요합니다",
        description: "참여하기 기능은 로그인 후 이용할 수 있습니다.",
        positive: {
          text: "로그인하기",
          button: { type: "default", variant: "primary" },
        },
        negative: { text: "취소" },
        onPositive: () => router.push("/login"),
      });
      return;
    }
  };

  return (
    <div className="flex flex-col gap-4 pt-6 lg:flex-row lg:items-center lg:justify-between">
      <div className="flex items-center gap-1.5 text-lg text-gray-500">
        <Image
          src="/projectDetail/eyes.svg"
          alt="조회수"
          width={22}
          height={16}
        />
        <span>{challenge.viewCount}</span>
      </div>
      {challenge.isHost ? (
        <Button
          variant="primary"
          size="lg"
          className="h-13 w-full lg:h-15 lg:max-w-80"
        >
          수정하기
        </Button>
      ) : (
        <GradientButton
          variant="default"
          size="lg"
          className="h-13 w-full lg:h-15 lg:max-w-80"
          onClick={handleJoinClick}
          disabled={!challenge.isJoinable}
        >
          {challenge.myParticipationStatus === "PENDING"
            ? "승인 대기중"
            : challenge.myParticipationStatus === "JOINED"
              ? "참여중"
              : "참여하기"}
        </GradientButton>
      )}
    </div>
  );
}
