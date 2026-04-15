import { Button, Modal } from "@/shared/ui";
import { useState } from "react";

type VerificationsRejectModalProps = {
  isOpen: boolean;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
  setRejectReason: React.Dispatch<React.SetStateAction<string>>;
  onSubmit: () => void;
  rejectReason: string;
};

export function VerificationsRejectModal({
  isOpen,
  setIsOpen,
  setRejectReason,
  onSubmit,
  rejectReason,
}: VerificationsRejectModalProps) {
  const [errorMessage, setErrorMessage] = useState<string>("");
  const handleSubmit = () => {
    if (!rejectReason.trim()) {
      return setErrorMessage("거절 사유를 입력해주세요.");
    }
    onSubmit();
    setIsOpen(false);
  };
  return (
    <Modal open={isOpen} onOpenChange={setIsOpen}>
      <Modal.Content>
        <Modal.Header className="text-center">
          <Modal.CloseIcon />
          <Modal.Title>거절 사유</Modal.Title>
        </Modal.Header>

        <Modal.Body className="flex flex-col gap-4">
          <textarea
            onChange={(e) => setRejectReason(e.target.value)}
            placeholder="거절 사유를 적어주세요."
            className="min-h-36 w-full resize-none rounded-xl border border-gray-700 px-4 py-3 text-sm text-white outline-none placeholder:text-gray-500"
          />
          {errorMessage && <span className="text-error">{errorMessage}</span>}
        </Modal.Body>

        <Modal.Footer>
          <Modal.Close asChild>
            <Button className="flex-1" onClick={() => setIsOpen(false)}>
              취소
            </Button>
          </Modal.Close>
          <Button className="flex-1" variant="primary" onClick={handleSubmit}>
            제출하기
          </Button>
        </Modal.Footer>
      </Modal.Content>
    </Modal>
  );
}
