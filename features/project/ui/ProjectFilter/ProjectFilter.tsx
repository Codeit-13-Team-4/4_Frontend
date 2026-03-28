"use client";

import { useState } from "react";
import { ProjectFilterButton } from "./ProjectFilterButton";
import { ProjectFilterModal } from "./ProjectFilterModal";

const filterMenu = ["모집 상태", "인원 수", "모집 방식"];

export function ProjectFilter() {
  const [isOpen, setIsOpen] = useState<boolean>(false);

  const handleOpen = () => setIsOpen(true);

  const handleClose = () => setIsOpen(false);

  return (
    <>
      <div className="mb-6 flex items-center justify-between">
        <div className="flex gap-3">
          {filterMenu.map((item) => (
            <ProjectFilterButton label={item} onClick={handleOpen} key={item} />
          ))}
        </div>
      </div>
      <ProjectFilterModal isOpen={isOpen} onClose={handleClose} />
    </>
  );
}
