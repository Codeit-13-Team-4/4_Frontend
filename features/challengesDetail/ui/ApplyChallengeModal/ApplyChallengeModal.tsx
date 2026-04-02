"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Modal, Button, TextArea } from "@/shared/ui";
import { useOpenAlertModal } from "@/shared/store/AlertModal";
import { applyChallenge } from "@/features/challengesDetail/api/applyChallenge";
import { useUserData } from "@/features/auth/hooks/queries/useUserData";
import { toast } from "@/shared/utils";

interface ApplyChallengeModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  challengeId: number;
}

export function ApplyChallengeModal({
  open,
  onOpenChange,
  challengeId,
}: ApplyChallengeModalProps) {
  const [motivation, setMotivation] = useState("");
  const router = useRouter();
  const openAlertModal = useOpenAlertModal();
  const { data: userData } = useUserData();

  const handleClose = () => {
    setMotivation("");
    onOpenChange(false);
  };

  const handleSubmit = async () => {
    try {
      await applyChallenge({
        challengeId,
        name: userData?.nickname ?? "",
        motivation,
      });
      setMotivation("");
      onOpenChange(false);
      openAlertModal({
        title: "챌린지 참여 신청을 완료했어요",
        description: "주최자가 승인하면 알림으로 알려드릴게요.",
        showCompleteAnimation: true,
        positive: {
          text: "지원 내역 확인",
          button: { type: "default", variant: "primary" },
        },
        negative: { text: "계속 둘러보기" },
        onPositive: () => router.push("/mypage"),
      });
    } catch (error) {
      onOpenChange(false);
      setMotivation("");
      const err = error as { status?: number; message?: string };
      if (err.status === 409) {
        toast(err.message!, { variant: "error" });
      }
    }
  };

  return (
    <Modal open={open} onOpenChange={onOpenChange}>
      <Modal.Content className="gap-0 p-10">
        <Modal.Header className="mb-2 text-center">
          <Modal.CloseIcon />
          <Modal.Title>챌린지 참여 신청하기</Modal.Title>
        </Modal.Header>
        <Modal.Description className="mb-6 text-center text-[18px]">
          작성하신 내용은 주최자에게 전달됩니다.
        </Modal.Description>
        <Modal.Body>
          <TextArea
            value={motivation}
            onChange={(e) => setMotivation(e.target.value)}
            placeholder="챌린지에 참여하고 싶은 이유와 본인의 강점을 적어주세요."
            maxLength={500}
            wrapperClassName="w-full bg-gray-800 border border-gray-700 mb-14"
            className="placeholder:text-gray-50"
          />
        </Modal.Body>
        <Modal.Footer>
          <Button
            variant="default"
            className="flex-1 text-[20px]"
            size="lg"
            onClick={handleClose}
          >
            취소
          </Button>
          <Button
            variant="primary"
            className="flex-1 text-[20px]"
            size="lg"
            onClick={handleSubmit}
            disabled={!motivation.trim()}
          >
            신청하기
          </Button>
        </Modal.Footer>
      </Modal.Content>
    </Modal>
  );
}
