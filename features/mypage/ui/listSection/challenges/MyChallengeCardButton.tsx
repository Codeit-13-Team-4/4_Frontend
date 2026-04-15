"use client";

import { useState } from "react";
import { Button, GradientButton } from "@/shared/ui";
import {
  ChallengeCardProps,
  ChallengeApplication,
  MyParticipationStatus,
} from "@/features/challenges/model";
import { useRouter } from "next/navigation";
import ChallengeApplicationModal from "./ChallengeApplicationModal";
import ChallengeRejectionReasonModal from "./ChallengeRejectionReasonModal";

interface MyChallengeCardButtonProps {
  id: ChallengeCardProps["id"];
  status: ChallengeCardProps["status"];
  participationStatus: MyParticipationStatus;
  isHost: ChallengeCardProps["isHost"];
  application?: ChallengeApplication;
}

const btnClass = "w-full md:px-6 md:py-3 md:text-base md:rounded-[12px]";

export default function MyChallengeCardButton({
  id,
  status,
  participationStatus,
  isHost,
  application,
}: MyChallengeCardButtonProps) {
  const router = useRouter();
  const [applicationModalOpen, setApplicationModalOpen] = useState(false);
  const [rejectionReasonModalOpen, setRejectionReasonModalOpen] =
    useState(false);

  // 1. 종료
  if (status === "COMPLETED") {
    return (
      <GradientButton size="sm" disabled className={btnClass}>
        종료된 챌린지
      </GradientButton>
    );
  }

  // 2. 거절됨
  if (participationStatus === "REJECTED") {
    return (
      <>
        <Button
          variant="default"
          className={btnClass}
          onClick={(e) => {
            e.stopPropagation();
            setRejectionReasonModalOpen(true);
          }}
        >
          거절 사유 보기
        </Button>
        <ChallengeRejectionReasonModal
          application={application!}
          open={rejectionReasonModalOpen}
          onOpenChange={setRejectionReasonModalOpen}
        />
      </>
    );
  }

  // 3. PENDING
  if (participationStatus === "PENDING") {
    return (
      <GradientButton size="sm" disabled className={btnClass}>
        신청 완료
      </GradientButton>
    );
  }

  // 4. JOINED (승인됨) - 진행중이 아닌 경우
  if (participationStatus === "JOINED" && status !== "IN_PROGRESS") {
    return (
      <GradientButton size="sm" disabled className={btnClass}>
        참여 확정
      </GradientButton>
    );
  }

  // 5. HOST
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
