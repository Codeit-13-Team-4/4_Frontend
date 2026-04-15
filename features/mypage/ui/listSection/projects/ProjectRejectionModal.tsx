"use client";

import { useState, useRef, useEffect } from "react";
import { Modal } from "@/shared/ui/Modal/Modal";
import { Button, TextArea } from "@/shared/ui";
import { ChevronDownIcon } from "@/shared/icons";
import { PROJECT_REJECTION_MESSAGE } from "@/features/mypage/model/mypage.constants";
import { useRejectProjectApplication } from "@/features/mypage/hooks/useRejectProjectApplication";
import {
  ProjectApplication,
  ApplicationRejectionType,
} from "@/features/mypage/model/mypage.types";

interface ProjectRejectionModalProps {
  projectId: number;
  application: ProjectApplication;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export default function ProjectRejectionModal({
  projectId,
  application,
  open,
  onOpenChange,
}: ProjectRejectionModalProps) {
  const [selectedCategory, setSelectedCategory] =
    useState<ApplicationRejectionType | null>(null);
  const [rejectionText, setRejectionText] = useState("");
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  const { mutate: reject, isPending } = useRejectProjectApplication(projectId);

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

  const handleSelectCategory = (
    value: ApplicationRejectionType,
    label: string,
  ) => {
    setSelectedCategory(value);
    if (value !== "custom") {
      setRejectionText(label);
    } else {
      setRejectionText("");
    }
    setDropdownOpen(false);
  };

  const handleClose = () => {
    setSelectedCategory(null);
    setRejectionText("");
    onOpenChange(false);
  };

  const handleSubmit = () => {
    if (!selectedCategory || !rejectionText.trim()) return;

    reject(
      {
        applicationId: application.id,
        rejectionType: selectedCategory,
        rejectionText: rejectionText.trim(),
      },
      {
        onSuccess: () => {
          handleClose();
        },
      },
    );
  };

  const selectedLabel =
    PROJECT_REJECTION_MESSAGE.find((m) => m.value === selectedCategory)
      ?.label ?? null;

  return (
    <Modal open={open} onOpenChange={onOpenChange}>
      <Modal.Content className="gap-0 p-10">
        <Modal.Header className="mb-2 text-center">
          <Modal.CloseIcon />
          <Modal.Title className="text-center">거절 사유 작성</Modal.Title>
        </Modal.Header>
        <Modal.Description className="mb-6 text-center">
          지원자에게 전달될 거절 사유를 입력해주세요
        </Modal.Description>

        <Modal.Body>
          {/* 카테고리 셀렉터 */}
          <div ref={containerRef} className="relative">
            <button
              type="button"
              onClick={() => setDropdownOpen((prev) => !prev)}
              className="border-border-default flex h-12 w-full cursor-pointer items-center justify-between rounded-lg border bg-gray-900 px-3 transition-colors"
            >
              <span
                className={
                  selectedLabel
                    ? "text-base text-gray-50"
                    : "text-base text-gray-400"
                }
              >
                {selectedLabel ?? "거절 사유"}
              </span>
              <ChevronDownIcon
                width="16"
                height="16"
                className="text-gray-400 transition-transform duration-200"
                style={{
                  transform: dropdownOpen ? "rotate(180deg)" : "rotate(0deg)",
                }}
              />
            </button>

            {dropdownOpen && (
              <ul className="absolute top-full left-0 z-10 mt-1 w-full overflow-hidden rounded-xl border border-gray-700 bg-gray-900 p-1 shadow-lg">
                {PROJECT_REJECTION_MESSAGE.map((item) => (
                  <li key={item.value}>
                    <button
                      type="button"
                      onMouseDown={(e) => e.preventDefault()}
                      onClick={() =>
                        handleSelectCategory(
                          item.value as ApplicationRejectionType,
                          item.label,
                        )
                      }
                      className={`w-full rounded-lg px-3 py-2.5 text-center text-sm hover:bg-gray-700 ${
                        selectedCategory === item.value
                          ? "text-mint-500"
                          : "text-gray-50"
                      }`}
                    >
                      {item.label}
                    </button>
                  </li>
                ))}
              </ul>
            )}
          </div>

          {/* 거절 사유 textarea */}
          <TextArea
            value={rejectionText}
            onChange={(e) => setRejectionText(e.target.value)}
            placeholder="구체적인 사유를 입력하세요"
            maxLength={500}
            wrapperClassName="w-full bg-gray-800 border border-gray-700"
            className="placeholder:text-gray-400"
          />
        </Modal.Body>

        <Modal.Footer className="mt-6">
          <Button variant="default" className="flex-1" onClick={handleClose}>
            취소
          </Button>
          <Button
            variant="primary"
            className="flex-1"
            onClick={handleSubmit}
            disabled={!selectedCategory || !rejectionText.trim() || isPending}
          >
            거절하기
          </Button>
        </Modal.Footer>
      </Modal.Content>
    </Modal>
  );
}
