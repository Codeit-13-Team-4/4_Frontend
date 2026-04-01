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
import { PositionType } from "@/features/projects/model";
import { ProjectPositionDropdown } from "@/features/projects/ui";
import { CompleteAnimation } from "@/shared/ui/CompleteAnimation/CompleteAnimation";

type ProjectPositionModalProps = {
  isOpen: boolean;
  onClose: () => void;
  setIsOpen?: React.Dispatch<React.SetStateAction<boolean>>;
};
export function ProjectApplyModal({
  isOpen,
  onClose,
  setIsOpen,
}: ProjectPositionModalProps) {
  const [textValue, setTextValue] = useState<string>("");
  const [position, setPosition] = useState<PositionType | undefined>(undefined);
  const [alertOpen, setAlertOpen] = useState(false);
  const [confirmAlertOpen, setConfirmAlertOpen] = useState(false);

  const router = useRouter();

  const handleSubmit = () => {
    setPosition(undefined);
    setTextValue("");
    onClose();
    setAlertOpen(true);
  };

  const handleCancelClick = (e: React.MouseEvent<HTMLButtonElement>) => {
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
            <Modal.Title>프로젝트 참여 신청하기</Modal.Title>
          </Modal.Header>
          <Modal.Description className="mb-6 text-center text-[18px]">
            작성하신 내용은 주최자에게 전달됩니다.
          </Modal.Description>
          <Modal.Body>
            <ProjectPositionDropdown
              position={position}
              setPosition={setPosition}
            />
            <TextArea
              maxLength={500}
              value={textValue}
              onChange={(e) => setTextValue(e.target.value)}
              wrapperClassName="w-full bg-gray-800 border border-gray-700 mb-14"
              className="placeholder:text-gray-50"
              placeholder="프로젝트에 참여하고 싶은 이유와 본인의 강점을 적어주세요."
            />
          </Modal.Body>
          <Modal.Footer>
            <Button
              variant="default"
              className="flex-1 text-[20px]"
              size="lg"
              onClick={(e) => handleCancelClick(e)}
            >
              취소
            </Button>

            <Button
              variant="primary"
              className="flex-1 text-[20px]"
              size="lg"
              onClick={handleSubmit}
              disabled={!position || !textValue.trim()}
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
            <AlertModal.Title>프로젝트 참여 신청을 완료했어요</AlertModal.Title>
            <AlertModal.Description>
              주최자가 승인하면 알림으로 알려드릴게요.
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
                  setPosition(undefined);
                  setTextValue("");
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
                setIsOpen?.(true);
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
