"use client";

import { useState } from "react";
import { ProjectFilterButton } from "./ProjectFilterButton";
import { ProjectFilterModal } from "./ProjectFilterModal";
import { useSearchParams } from "next/navigation";
import {
  POSITION_LABELS,
  PROJECT_TYPE_LABEL,
  STATUS_LABEL,
} from "@/features/projects/model";

export function ProjectFilter() {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const params = useSearchParams();
  const status = params.get("status");

  const projectType = params.getAll("projectType");
  const position = params.getAll("positions");

  const formatFilterLabel = (
    value: string[],
    labelMap: Record<string, string>,
    defaultValue: string,
  ) => {
    if (!value || value.length === 0) return defaultValue;
    if (value.length === 1) return labelMap[value[0]];
    return `${labelMap[value[0]]} 외 ${value.length - 1}`;
  };

  const filterLabel = {
    status: formatFilterLabel(
      status ? [status] : [],
      STATUS_LABEL,
      "모집 상태",
    ),
    projectType: formatFilterLabel(
      projectType,
      PROJECT_TYPE_LABEL,
      "참여 목적",
    ),
    position: formatFilterLabel(position, POSITION_LABELS, "포지션"),
  };

  const handleOpen = () => setIsOpen(true);

  const handleClose = () => setIsOpen(false);

  return (
    <>
      <div className="mb-6 flex items-center justify-between text-[14px] md:mb-0">
        <div className="flex gap-3">
          {Object.values(filterLabel).map((item) => (
            <ProjectFilterButton label={item} onClick={handleOpen} key={item} />
          ))}
        </div>
      </div>
      <ProjectFilterModal isOpen={isOpen} onClose={handleClose} />
    </>
  );
}
