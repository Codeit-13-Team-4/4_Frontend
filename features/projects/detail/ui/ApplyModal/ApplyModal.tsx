"use client";

import { useState, useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import { Modal } from "@/shared/ui/Modal/Modal";
import { Button, TextArea } from "@/shared/ui";
import { POSITION_LABELS, PositionType } from "@/features/projects/model";
import { applicationsProject } from "@/features/projects/detail/api/applicationsProject";
import { toast } from "@/shared/utils";
import { useOpenAlertModal } from "@/shared/store/AlertModal";

const POSITION_ENTRIES = Object.entries(POSITION_LABELS) as [
  PositionType,
  string,
][];

interface ApplyModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  projectId: string;
}

export function ApplyModal({ open, onOpenChange, projectId }: ApplyModalProps) {
  const [position, setPosition] = useState<PositionType | null>(null);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [message, setMessage] = useState("");
  const containerRef = useRef<HTMLDivElement>(null);
  const router = useRouter();
  const openAlertModal = useOpenAlertModal();

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (
        containerRef.current &&
        !containerRef.current.contains(e.target as Node)
      ) {
        setDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleClose = () => {
    setPosition(null);
    setMessage("");
    onOpenChange(false);
  };

  const handleSubmit = async () => {
    if (!projectId || !position) return;

    try {
      await applicationsProject({ projectId, position, motivation: message });
      setPosition(null);
      setMessage("");
      onOpenChange(false);
      openAlertModal({
        title: "프로젝트 참여 신청을 완료했어요",
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
      setPosition(null);
      setMessage("");
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
          <Modal.Title>프로젝트 참여 신청하기</Modal.Title>
        </Modal.Header>
        <Modal.Description className="mb-6 text-center text-[18px]">
          작성하신 내용은 주최자에게 전달됩니다.
        </Modal.Description>
        <Modal.Body>
          <div ref={containerRef} className="relative">
            <button
              type="button"
              onClick={() => setDropdownOpen((prev) => !prev)}
              className="border-border-default flex h-12 w-full cursor-pointer items-center justify-between rounded-lg border bg-gray-900 px-3 transition-colors"
            >
              <span
                className={
                  position
                    ? "text-base text-gray-50"
                    : "text-base text-gray-400"
                }
              >
                {position ? POSITION_LABELS[position] : "희망 포지션"}
              </span>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="text-gray-400 transition-transform duration-200"
                style={{
                  transform: dropdownOpen ? "rotate(180deg)" : "rotate(0deg)",
                }}
              >
                <path d="m6 9 6 6 6-6" />
              </svg>
            </button>

            {dropdownOpen && (
              <ul className="absolute top-full left-0 z-10 mt-1 max-h-48 w-full overflow-y-auto rounded-xl border border-gray-700 bg-gray-900 p-1 shadow-lg">
                {POSITION_ENTRIES.map(([key, label]) => (
                  <li key={key}>
                    <button
                      type="button"
                      onMouseDown={(e) => e.preventDefault()}
                      onClick={() => {
                        setPosition(key);
                        setDropdownOpen(false);
                      }}
                      className={`w-full rounded-lg bg-gray-900 px-3 py-2.5 text-center text-base hover:bg-gray-700 ${
                        position === key ? "text-mint-500" : "text-gray-50"
                      }`}
                    >
                      {label}
                    </button>
                  </li>
                ))}
              </ul>
            )}
          </div>

          <TextArea
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            placeholder="프로젝트에 참여하고 싶은 이유와 본인의 강점을 적어주세요."
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
            disabled={!position || !message.trim()}
          >
            지원하기
          </Button>
        </Modal.Footer>
      </Modal.Content>
    </Modal>
  );
}
