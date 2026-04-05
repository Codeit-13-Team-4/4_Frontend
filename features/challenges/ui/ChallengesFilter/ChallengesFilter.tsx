"use client";

import { useState } from "react";
import {
  ChallengesFilterButton,
  ChallengesFilterModal,
} from "@/features/challenges/ui";
import { useSearchParams } from "next/navigation";

const FILTER_STATUS_LABEL: Record<string, string> = {
  RECRUITING: "모집중",
  RECRUITMENT_CLOSED: "모집 완료",
};

const FILTER_PARTICIPATION_LABELS: Record<string, string> = {
  INSTANT: "즉시 참여",
  APPROVAL: "승인제",
};

export function ChallengesFilter() {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const params = useSearchParams();
  const status = params.get("status");
  const participationType = params.get("participationType");

  const filterLabel = {
    status: status ? FILTER_STATUS_LABEL[status] : "모집 상태",
    participationType: participationType
      ? FILTER_PARTICIPATION_LABELS[participationType]
      : "참여 목적",
  };

  const handleOpen = () => setIsOpen(true);

  const handleClose = () => setIsOpen(false);

  return (
    <>
      <div className="mb-6 flex items-center justify-between text-[14px] md:mb-0">
        <div className="flex gap-3">
          {Object.values(filterLabel).map((item) => {
            return (
              <ChallengesFilterButton
                label={item}
                onClick={handleOpen}
                key={item}
              />
            );
          })}
        </div>
      </div>
      <ChallengesFilterModal isOpen={isOpen} onClose={handleClose} />
    </>
  );
}
