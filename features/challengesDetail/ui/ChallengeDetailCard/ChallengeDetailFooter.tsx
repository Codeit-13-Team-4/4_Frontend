"use client";

import { useState } from "react";
import Image from "next/image";
import {
  buildCurrentPath,
  buildLoginPath,
} from "@/features/auth/lib/authRedirect";
import { GradientButton, Button } from "@/shared/ui";
import { useUserData } from "@/features/auth/hooks/queries/useUserData";
import { useOpenAlertModal } from "@/shared/store/AlertModal";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import type { ChallengesDetail } from "@/features/challengesDetail/types/challengesDetail";
import { EditChallengeModal } from "@/features/challengesDetail/ui/EditChallengeModal/EditChallengeModal";
import { ApplyChallengeModal } from "@/features/challengesDetail/ui/ApplyChallengeModal/ApplyChallengeModal";

interface ChallengeDetailFooterProps {
  challenge: ChallengesDetail;
}

export default function ChallengeDetailFooter({
  challenge,
}: ChallengeDetailFooterProps) {
  const [editOpen, setEditOpen] = useState(false);
  const [applyOpen, setApplyOpen] = useState(false);
  const { data: userData } = useUserData();
  const openAlertModal = useOpenAlertModal();
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const loginPath = buildLoginPath(buildCurrentPath(pathname, searchParams));

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
        onPositive: () => router.push(loginPath),
      });
      return;
    }
    setApplyOpen(true);
  };

  return (
    <>
      <div className="flex flex-col gap-4 pt-6 lg:flex-row lg:items-center lg:justify-between">
        <div className="flex items-center gap-1.5 text-lg text-gray-500">
          <Image
            src="/icons/common/eyes.svg"
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
            onClick={() => setEditOpen(true)}
          >
            수정하기
          </Button>
        ) : (
          <GradientButton
            variant="default"
            size="lg"
            className="h-13 w-full lg:h-15 lg:max-w-80"
            onClick={handleJoinClick}
            disabled={
              !challenge.isJoinable ||
              challenge.myParticipationStatus === "PENDING" ||
              challenge.myParticipationStatus === "JOINED"
            }
          >
            {challenge.myParticipationStatus === "PENDING"
              ? "승인 대기중"
              : challenge.myParticipationStatus === "JOINED"
                ? "참여중"
                : "참여하기"}
          </GradientButton>
        )}
      </div>

      <EditChallengeModal
        key={editOpen ? challenge.updatedAt : "closed"}
        challenge={challenge}
        open={editOpen}
        onOpenChange={setEditOpen}
      />
      <ApplyChallengeModal
        challengeId={challenge.id}
        open={applyOpen}
        onOpenChange={setApplyOpen}
      />
    </>
  );
}
