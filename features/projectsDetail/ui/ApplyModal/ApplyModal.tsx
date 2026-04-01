"use client";

import { useState, useEffect, useRef } from "react";
import { AlertModal } from "@/shared/ui/AlertModal/AlertModal";
import { Button, TextArea } from "@/shared/ui";
import { POSITION_LABELS } from "@/features/projectsDetail/model/projects.constants";
import type { PositionType } from "@/features/projectsDetail/types/projectsDetail";

const POSITION_ENTRIES = Object.entries(POSITION_LABELS) as [
  PositionType,
  string,
][];

interface ApplyModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function ApplyModal({ open, onOpenChange }: ApplyModalProps) {
  const [position, setPosition] = useState<PositionType | null>(null);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [message, setMessage] = useState("");
  const containerRef = useRef<HTMLDivElement>(null);

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

  const handleSubmit = () => {
    // TODO: 지원하기 API 연동
    handleClose();
  };

  return (
    <AlertModal open={open} onOpenChange={onOpenChange}>
      <AlertModal.Content className="gap-8">
        <AlertModal.Header>
          <AlertModal.Close onClick={handleClose} />
          <AlertModal.Title>프로젝트 참여 신청하기</AlertModal.Title>
          <AlertModal.Description>
            작성하신 내용은 주최자에게 전달됩니다.
          </AlertModal.Description>
        </AlertModal.Header>

        <div className="flex flex-col gap-4">
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
            wrapperClassName="w-full h-36"
          />
        </div>

        <AlertModal.Footer className="flex-col sm:flex-row">
          <Button
            variant="default"
            size="lg"
            className="w-full"
            onClick={handleClose}
          >
            취소
          </Button>
          <AlertModal.Action asChild>
            <Button
              size="lg"
              className="w-full"
              variant="primary"
              onClick={handleSubmit}
            >
              지원하기
            </Button>
          </AlertModal.Action>
        </AlertModal.Footer>
      </AlertModal.Content>
    </AlertModal>
  );
}
