"use client";
import {
  AlertModal,
  Button,
  GradientButton,
  Modal,
  TextArea,
} from "@/shared/ui";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { CompleteAnimation } from "@/shared/ui/CompleteAnimation/CompleteAnimation";
import { toast } from "@/shared/utils";
import { applicationsChallenges } from "../../api/applicationsChallenges";
import { ParticipationType } from "@/features/challenges/model";

type ProjectPositionModalProps = {
  isOpen: boolean;
  onClose: () => void;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
  challengeId: number;
  alertOpen: boolean;
  setAlertOpen: React.Dispatch<React.SetStateAction<boolean>>;
  confirmAlertOpen: boolean;
  setConfirmAlertOpen: React.Dispatch<React.SetStateAction<boolean>>;
  name: string;
  participationType: ParticipationType;
};

export function ChallengesApplyModal({
  isOpen,
  onClose,
  setIsOpen,
  challengeId,
  alertOpen,
  setAlertOpen,
  confirmAlertOpen,
  setConfirmAlertOpen,
  participationType,
  name,
}: ProjectPositionModalProps) {
  const [textValue, setTextValue] = useState<string>("");
  const isAuto = participationType === "INSTANT";
  const router = useRouter();

  const handleReset = () => {
    setTextValue("");
  };

  const handleSubmit = async () => {
    if (!challengeId) return;

    try {
      await applicationsChallenges({
        challengeId,
        name,
        motivation: textValue,
      });

      handleReset();
      setAlertOpen(true);
      onClose();
    } catch (error) {
      onClose();
      handleReset();
      const err = error as { status?: number; message?: string };
      if (err.status === 409) {
        toast(err.message!, { variant: "error" });
      }
    }
  };

  const handleCancelClick = () => {
    onClose();
    setConfirmAlertOpen(true);
  };

  return (
    <>
      <Modal open={isOpen} onOpenChange={onClose}>
        <Modal.Overlay />
        <Modal.Content className="z-50 gap-0 p-10">
          <Modal.Header className="mb-2 text-center">
            <Modal.CloseIcon />
            <Modal.Title>챌린지 참여 신청하기</Modal.Title>
          </Modal.Header>
          <Modal.Description className="mb-6 text-center text-[18px]">
            주최자에게 전달할 신청 사유를 적어주세요.
          </Modal.Description>
          <Modal.Body>
            <TextArea
              maxLength={200}
              value={textValue}
              onChange={(e) => setTextValue(e.target.value)}
              wrapperClassName="w-full bg-gray-800 border border-gray-700 mb-14"
              className="placeholder:text-gray-50"
              placeholder="함께 성장하고 싶은 마음을 담아 자유롭게 적어주세요."
            />
          </Modal.Body>
          <Modal.Footer>
            <Button
              variant="default"
              className="flex-1 text-[20px]"
              size="lg"
              onClick={handleCancelClick}
            >
              취소
            </Button>

            <Button
              variant="primary"
              className="flex-1 text-[20px]"
              size="lg"
              onClick={handleSubmit}
              disabled={!textValue.trim()}
            >
              지원하기
            </Button>
          </Modal.Footer>
        </Modal.Content>
      </Modal>

      <AlertModal open={alertOpen} onOpenChange={setAlertOpen}>
        <AlertModal.Content>
          <div className="mt-2 flex items-center justify-center">
            <CompleteAnimation />
          </div>

          <AlertModal.Header>
            <AlertModal.Title>
              {isAuto
                ? "챌린지 참여가 완료되었어요!🎉"
                : "챌린지 참여 신청을 완료했어요"}
            </AlertModal.Title>
            <AlertModal.Description>
              {isAuto
                ? "지금 바로 첫 인증을 시작해보세요."
                : "주최자가 승인하면 알림으로 알려드릴게요."}
            </AlertModal.Description>
          </AlertModal.Header>
          <AlertModal.Footer>
            <AlertModal.Cancel asChild>
              <GradientButton
                variant="dark"
                className="w-full"
                onClick={(e) => e.stopPropagation()}
              >
                계속 둘러보기
              </GradientButton>
            </AlertModal.Cancel>
            <AlertModal.Action
              className="w-full"
              onClick={(e) => {
                e.stopPropagation();
                router.push("/mypage");
              }}
            >
              지원 내역 확인
            </AlertModal.Action>
          </AlertModal.Footer>
        </AlertModal.Content>
      </AlertModal>

      <AlertModal open={confirmAlertOpen} onOpenChange={setConfirmAlertOpen}>
        <AlertModal.Content>
          <AlertModal.Header>
            <AlertModal.Title>작성을 중단하시겠어요?</AlertModal.Title>
            <AlertModal.Description>
              지금 나가면 작성 중인 지원 내용이 저장되지 않고 사라져요.
            </AlertModal.Description>
          </AlertModal.Header>
          <AlertModal.Footer>
            <AlertModal.Cancel asChild>
              <Button
                className="h-full w-full"
                onClick={(e) => {
                  e.stopPropagation();
                  handleReset();
                  setConfirmAlertOpen(false);
                }}
              >
                나가기
              </Button>
            </AlertModal.Cancel>
            <AlertModal.Action
              className="w-full"
              onClick={(e) => {
                e.stopPropagation();
                setConfirmAlertOpen(false);
                setIsOpen(true);
              }}
            >
              이어서 작성하기
            </AlertModal.Action>
          </AlertModal.Footer>
        </AlertModal.Content>
      </AlertModal>
    </>
  );
}
