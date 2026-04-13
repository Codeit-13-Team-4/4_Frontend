"use client";

import { useRouter } from "next/navigation";
import { useDeleteProjectsDetail } from "@/features/projects/detail/hooks/useDeleteProjectsDetail";
import { useOpenAlertModal } from "@/shared/store/AlertModal";
import { Button } from "@/shared/ui";
import { Trash } from "@/shared/icons";

interface DeleteProjectButtonProps {
  projectId: number;
}

export default function DeleteProjectButton({
  projectId,
}: DeleteProjectButtonProps) {
  const router = useRouter();
  const { mutate: deleteProject } = useDeleteProjectsDetail(projectId);
  const openAlertModal = useOpenAlertModal();

  const handleDelete = () => {
    openAlertModal({
      title: "프로젝트를 정말 삭제하시겠어요?",
      description:
        "삭제 시 프로젝트 정보와 참여 신청 내역이 모두 사라지며,\n다시 복구할 수 없습니다.",
      positive: {
        text: "삭제",
        button: { type: "default", variant: "destructive" },
      },
      negative: { text: "취소" },
      onPositive: () =>
        deleteProject(undefined, { onSuccess: () => router.back() }),
    });
  };

  return (
    <Button
      variant="destructive"
      onClick={handleDelete}
      size={"sm"}
      className="hover:bg-error/40 bg-error/20"
    >
      <Trash width={18} height={18} />
      삭제
    </Button>
  );
}
