"use client";

import { useRouter } from "next/navigation";
import { useDeleteChallengesDetail } from "@/features/challenges/detail/hooks/useDeleteChallengesDetail";
import { useOpenAlertModal } from "@/shared/store/AlertModal";

interface ChallengeDetailHostActionsProps {
  challengeId: number;
}

export default function ChallengeDetailHostActions({
  challengeId,
}: ChallengeDetailHostActionsProps) {
  const router = useRouter();
  const openAlertModal = useOpenAlertModal();
  const { mutate: deleteChallenge } = useDeleteChallengesDetail(challengeId);

  function handleDeleteClick() {
    openAlertModal({
      title: "챌린지를 삭제하시겠습니까?",
      description: "삭제된 챌린지는 복구할 수 없습니다.",
      positive: {
        text: "삭제하기",
        button: { type: "default", variant: "destructive" },
      },
      negative: { text: "취소" },
      onPositive: () =>
        deleteChallenge(undefined, {
          onSuccess: () => router.push("/challenges"),
        }),
    });
  }

  return (
    <div className="mb-4 flex justify-end gap-4 text-sm font-medium text-gray-400">
      <button
        className="cursor-pointer transition-colors hover:text-gray-200"
        onClick={() => router.push(`/challenges/${challengeId}/edit`)}
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
