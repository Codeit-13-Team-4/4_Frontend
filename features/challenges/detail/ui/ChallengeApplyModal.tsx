"use client";

import { useState } from "react";
import { toast } from "sonner";
import { useApplyChallenge } from "@/features/challenges/detail/hooks/useApplyChallenge";
import { useUserData } from "@/features/auth/hooks/queries/useUserData";
import { Modal, TextArea, Button } from "@/shared/ui";

interface ChallengeApplyModalProps {
  challengeId: number;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export default function ChallengeApplyModal({
  challengeId,
  open,
  onOpenChange,
}: ChallengeApplyModalProps) {
  const [motivation, setMotivation] = useState("");
  const { data: userData } = useUserData();
  const { mutate: applyChallenge, isPending } = useApplyChallenge(challengeId);

  function handleSubmit() {
    if (!userData) return;
    applyChallenge(
      { name: userData.nickname, motivation },
      {
        onSuccess: () => {
          toast.success("참여 신청이 완료되었습니다.");
          onOpenChange(false);
        },
      },
    );
  }

  return (
    <Modal
      open={open}
      onOpenChange={(isOpen) => {
        if (!isOpen) setMotivation("");
        onOpenChange(isOpen);
      }}
    >
      <Modal.Content>
        <div className="flex flex-col gap-6">
          <div className="flex flex-col items-center gap-2 text-center">
            <div className="flex w-full justify-end">
              <Modal.CloseIcon />
            </div>
            <Modal.Header>
              <Modal.Title>챌린지 참여 신청하기</Modal.Title>
              <Modal.Description>
                주최자에게 전달할 신청 사유를 적어주세요.
              </Modal.Description>
            </Modal.Header>
          </div>

          <TextArea
            placeholder="함께 성장하고 싶은 마음을 담아 자유롭게 적어주세요."
            maxLength={200}
            value={motivation}
            onChange={(e) => setMotivation(e.target.value)}
            wrapperClassName="w-full h-[160px]"
          />

          <Modal.Footer>
            <Modal.Close asChild>
              <Button className="flex-1" variant="default">
                취소
              </Button>
            </Modal.Close>
            <Button
              className="flex-1"
              variant="primary"
              disabled={isPending}
              onClick={handleSubmit}
            >
              신청하기
            </Button>
          </Modal.Footer>
        </div>
      </Modal.Content>
    </Modal>
  );
}
