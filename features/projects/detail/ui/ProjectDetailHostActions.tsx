"use client";

import { useRouter } from "next/navigation";
import { useDeleteProjectsDetail } from "@/features/projects/detail/hooks/useDeleteProjectsDetail";
import { useOpenAlertModal } from "@/shared/store/AlertModal";

interface ProjectDetailHostActionsProps {
  projectId: number;
}

export default function ProjectDetailHostActions({
  projectId,
}: ProjectDetailHostActionsProps) {
  const router = useRouter();
  const openAlertModal = useOpenAlertModal();
  const { mutate: deleteProject } = useDeleteProjectsDetail(projectId);

  function handleDeleteClick() {
    openAlertModal({
      title: "프로젝트를 삭제하시겠습니까?",
      description: "삭제된 프로젝트는 복구할 수 없습니다.",
      positive: {
        text: "삭제하기",
        button: { type: "default", variant: "destructive" },
      },
      negative: { text: "취소" },
      onPositive: () =>
        deleteProject(undefined, {
          onSuccess: () => router.push("/projects"),
        }),
    });
  }

  return (
    <div className="my-4 flex justify-end gap-4 text-sm font-medium text-gray-400">
      <button
        className="cursor-pointer transition-colors hover:text-gray-200"
        onClick={() => router.push(`/projects/${projectId}/edit`)}
      >
        수정
      </button>
      <button
        className="hover:text-error cursor-pointer transition-colors"
        onClick={handleDeleteClick}
      >
        삭제
      </button>
    </div>
  );
}
