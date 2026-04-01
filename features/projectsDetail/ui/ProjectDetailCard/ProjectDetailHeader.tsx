"use client";

import { DeadlineBadge, LikeButton, StatusBadge } from "@/shared/ui";
import type { ProjectDetail } from "@/features/projectsDetail/types/projectsDetail";
import { useToggleProjectLike } from "@/features/projectsDetail/hooks/useToggleProjectLike";
import { ProjectBadge } from "@/features/projectsDetail/ui/ProjectDetailCard";
import { useUserData } from "@/features/auth/hooks/queries/useUserData";
import { useOpenAlertModal } from "@/shared/store/AlertModal";
import { useRouter } from "next/navigation";

interface ProjectDetailHeaderProps {
  project: ProjectDetail;
}

export default function ProjectDetailHeader({
  project,
}: ProjectDetailHeaderProps) {
  const { mutate: toggleLike } = useToggleProjectLike(project.id);
  const { data: userData } = useUserData();
  const openAlertModal = useOpenAlertModal();
  const router = useRouter();

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
    toggleLike(project.liked);
  };

  return (
    <div className="mb-5 flex flex-col gap-4">
      <div className="flex flex-col-reverse items-start gap-5 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex flex-wrap items-center gap-2">
          <StatusBadge status={project.status} />
          <ProjectBadge type={project.projectType} />
          <DeadlineBadge endDate={project.recruitEndDate} />
        </div>
        <LikeButton
          className="ml-auto"
          liked={project.liked}
          onToggle={handleLikeToggle}
        />
      </div>
      <h1 className="text-2xl font-semibold text-gray-50 lg:text-3xl">
        {project.title}
      </h1>
    </div>
  );
}
