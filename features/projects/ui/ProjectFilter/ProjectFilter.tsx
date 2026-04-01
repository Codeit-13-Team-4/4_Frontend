"use client";

import { useState } from "react";
import { ProjectFilterButton } from "./ProjectFilterButton";
import { ProjectFilterModal } from "./ProjectFilterModal";

const filterMenu = ["모집 상태", "참여 목적", "모집 방식"];

export function ProjectFilter() {
  const [isOpen, setIsOpen] = useState<boolean>(false);

  const handleOpen = () => setIsOpen(true);

  const handleClose = () => setIsOpen(false);

  return (
    <>
      <div className="mb-6 flex items-center justify-between text-[14px] md:mb-0">
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
