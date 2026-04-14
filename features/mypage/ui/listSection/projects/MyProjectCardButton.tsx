"use client";

import { useState } from "react";
import { GradientButton } from "@/shared/ui";
import { ProjectCardProps } from "@/features/projects/model";
import ProjectApplicationModal from "./ProjectApplicationModal";

interface MyProjectCardButtonProps {
  projectId: number;
  status: ProjectCardProps["status"];
  applicationStatus: ProjectCardProps["applicationStatus"];
  isHost: ProjectCardProps["isHost"];
}

const btnClass = "w-full md:px-6 md:py-3 md:text-base md:rounded-[12px]";

export default function MyProjectCardButton({
  projectId,
  status,
  applicationStatus,
  isHost,
}: MyProjectCardButtonProps) {
  const [applicationModalOpen, setApplicationModalOpen] = useState(false);

  // 1. 모집 마감
  if (status === "recruitment_closed") {
    return (
      <GradientButton size="sm" disabled className={btnClass}>
        모집 마감
      </GradientButton>
    );
  }

  // 2. 거절 사유 보기
  if (applicationStatus === "rejected") {
    return (
      <GradientButton size="sm" disabled className={btnClass}>
        거절 사유 보기
      </GradientButton>
    );
  }

  // 3. 승인 대기 / 승인 완료 → 지원 완료
  if (applicationStatus === "pending" || applicationStatus === "approved") {
    return (
      <GradientButton size="sm" disabled className={btnClass}>
        지원 완료
      </GradientButton>
    );
  }

  // 4. HOST → 지원자 목록 관리
  if (isHost) {
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
          지원자 목록 관리
        </GradientButton>
        <ProjectApplicationModal
          projectId={projectId}
          open={applicationModalOpen}
          onOpenChange={setApplicationModalOpen}
        />
      </>
    );
  }

  // fallback
  return (
    <GradientButton size="sm" disabled className={btnClass}>
      지원 완료
    </GradientButton>
  );
}
