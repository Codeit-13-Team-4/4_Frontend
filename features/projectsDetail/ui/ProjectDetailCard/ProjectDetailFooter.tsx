"use client";

import { useState } from "react";
import type { ProjectDetail } from "@/features/projectsDetail/types/projectsDetail";
import { GradientButton, Button } from "@/shared/ui";
import { useUserData } from "@/features/auth/hooks/queries/useUserData";
import { useOpenAlertModal } from "@/shared/store/AlertModal";
import { EditProjectModal } from "@/features/projectsDetail/ui/EditProjectModal/EditProjectModal";
import { ApplyModal } from "@/features/projectsDetail/ui/ApplyModal/ApplyModal";
import Image from "next/image";
import { useRouter } from "next/navigation";

interface ProjectDetailFooterProps {
  project: ProjectDetail;
}

export default function ProjectDetailFooter({
  project,
}: ProjectDetailFooterProps) {
  const { data: userData } = useUserData();
  const isHost = userData?.id === project.host.id;
  const [editOpen, setEditOpen] = useState(false);
  const [applyOpen, setApplyOpen] = useState(false);
  const openAlertModal = useOpenAlertModal();
  const router = useRouter();

  const handleApplyClick = () => {
    if (!userData) {
      openAlertModal({
        title: "로그인이 필요합니다",
        description: "지원하기 기능은 로그인 후 이용할 수 있습니다.",
        positive: {
          text: "로그인하기",
          button: { type: "default", variant: "primary" },
        },
        negative: { text: "취소" },
        onPositive: () => router.push("/login"),
      });
      return;
    }
    setApplyOpen(true);
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
        <span>{project.viewCount}</span>
      </div>
      {isHost ? (
        <>
          <Button
            variant="primary"
            size="lg"
            className="h-13 w-full lg:h-15 lg:max-w-80"
            onClick={() => setEditOpen(true)}
          >
            수정하기
          </Button>
          <EditProjectModal
            project={project}
            open={editOpen}
            onOpenChange={setEditOpen}
          />
        </>
      ) : (
        <>
          <GradientButton
            size="lg"
            className="h-13 w-full lg:h-15 lg:max-w-80"
            onClick={handleApplyClick}
          >
            지원하기
          </GradientButton>
          <ApplyModal
            open={applyOpen}
            onOpenChange={setApplyOpen}
            projectId={String(project.id)}
          />
        </>
      )}
    </div>
  );
}
