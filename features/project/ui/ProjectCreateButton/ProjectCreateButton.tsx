"use client";
import { Button } from "@/shared/ui";
import { createSideProject } from "../../api/createSideProject";

export function ProjectCreateButton() {
  const handleClick = async () => {
    await createSideProject();
  };

  return (
    <Button variant="primary" className="p-3" onClick={handleClick}>
      + 프로젝트 개설
    </Button>
  );
}
