"use client";
import { Button } from "@/shared/ui";
import { createSideProject } from "../../api/createProject";
import Link from "next/link";

export function ProjectCreateButton() {
  // const handleClick = async () => {
  //   await createSideProject();
  // };

  return (
    <Link href="/projects/create">
      <Button variant="primary" className="p-3">
        + 프로젝트 개설
      </Button>
    </Link>
  );
}
