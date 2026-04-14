"use client";

import { useState } from "react";
import { GradientButton } from "@/shared/ui";
import {
  ChallengeCardProps,
  MyParticipationStatus,
} from "@/features/challenges/model";
import { useRouter } from "next/navigation";
import ChallengeApplicationModal from "./ChallengeApplicationModal";

interface MyChallengeCardButtonProps {
  id: ChallengeCardProps["id"];
  status: ChallengeCardProps["status"];
  participationStatus: MyParticipationStatus;
  isHost: ChallengeCardProps["isHost"];
}

const btnClass = "w-full md:px-6 md:py-3 md:text-base md:rounded-[12px]";

export default function MyChallengeCardButton({
  id,
  status,
  participationStatus,
  isHost,
}: MyChallengeCardButtonProps) {
  const router = useRouter();
  const [applicationModalOpen, setApplicationModalOpen] = useState(false);

  // 1. 종료
  if (status === "COMPLETED" || status === "RECRUITMENT_CLOSED") {
    return (
      <GradientButton size="sm" disabled className={btnClass}>
        종료된 챌린지
      </GradientButton>
    );
  }

  // 2. PENDING 탭
  if (participationStatus === "PENDING") {
    return (
      <GradientButton size="sm" disabled className={btnClass}>
        신청 완료
      </GradientButton>
    );
  }

  // 3. HOST
  if (isHost) {
    if (status === "IN_PROGRESS") {
      return (
        <GradientButton
          size="sm"
          className={btnClass}
          onClick={(e) => {
            e.stopPropagation();
            router.push(`/challenges/${id}/verifications`);
          }}
        >
          챌린지 인증 관리
        </GradientButton>
      );
    }
    return (
      <>
        <GradientButton
          size="sm"
          className={btnClass}
          onClick={(e) => {
            e.stopPropagation();
            setApplicationModalOpen(true);
          }}
        >
          참여자 목록 관리
        </GradientButton>

        <ChallengeApplicationModal
          challengeId={id}
          open={applicationModalOpen}
          onOpenChange={setApplicationModalOpen}
        />
      </>
    );
  }

  // 4. MEMBER - 진행중
  if (status === "IN_PROGRESS") {
    return (
      <GradientButton
        size="sm"
        className={btnClass}
        onClick={(e) => {
          e.stopPropagation();
          router.push(`/challenges/${id}/verify`);
        }}
      >
        인증하기
      </GradientButton>
    );
  }

  // 5. MEMBER - 모집중
  return (
    <GradientButton size="sm" disabled className={btnClass}>
      신청 완료
    </GradientButton>
  );
}
