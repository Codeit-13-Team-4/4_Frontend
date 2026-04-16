"use client";

import { Modal } from "@/shared/ui/Modal/Modal";
import { Button } from "@/shared/ui";
import { ApplicationType } from "@/features/projects/model";

interface ProjectRejectionReasonModalProps {
  application: ApplicationType;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export default function ProjectRejectionReasonModal({
  application,
  open,
  onOpenChange,
}: ProjectRejectionReasonModalProps) {
  return (
    <Modal open={open} onOpenChange={onOpenChange}>
      <Modal.Content
        className="gap-0 p-10"
        onClick={(e) => e.stopPropagation()}
      >
        <Modal.Header className="mb-2 text-center">
          <Modal.CloseIcon />
          <Modal.Title className="text-center">거절 사유</Modal.Title>
        </Modal.Header>
        <Modal.Description className="mb-6 text-center">
          호스트가 전달한 거절 사유입니다
        </Modal.Description>

        <Modal.Body>
          <div className="rounded-lg border border-gray-700 bg-gray-900 px-4 py-3 text-sm whitespace-pre-wrap text-gray-200">
            {application.rejectionText}
          </div>
        </Modal.Body>

        <Modal.Footer className="mt-6">
          <Button
            variant="primary"
            className="flex-1"
            onClick={() => onOpenChange(false)}
          >
            확인
          </Button>
        </Modal.Footer>
      </Modal.Content>
    </Modal>
  );
}
