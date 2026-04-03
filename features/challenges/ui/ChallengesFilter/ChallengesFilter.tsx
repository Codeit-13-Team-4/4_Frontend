"use client";

import { useState } from "react";
import {
  ChallengesFilterButton,
  ChallengesFilterModal,
} from "@/features/challenges/ui";

const filterMenu = ["모집 상태", "모집 방식"];

export function ChallengesFilter() {
  const [isOpen, setIsOpen] = useState<boolean>(false);

  const handleOpen = () => setIsOpen(true);

  const handleClose = () => setIsOpen(false);

  return (
    <>
      <div className="mb-6 flex items-center justify-between text-[14px] md:mb-0">
        <div className="flex gap-3">
          {filterMenu.map((item) => {
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
