"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import type { ProjectDetail } from "@/features/projects/model";
import {
  PROJECT_ACTION_BUTTON_CONFIG,
  getProjectActionButtonKey,
} from "@/features/projects/detail/model/projectActionButton.constants";
import { useToggleProjectLike } from "@/features/projects/hooks/useToggleProjectLike";
import { useLoginGuard } from "@/shared/hooks/useLoginGuard";
import { Button, LikeButton } from "@/shared/ui";
import { ApplyModal } from "@/features/projects/detail/ui/ApplyModal/ApplyModal";

interface ProjectDetailActionButtonsProps {
  project: ProjectDetail;
}

export default function ProjectDetailActionButtons({
  project,
}: ProjectDetailActionButtonsProps) {
  const [applyOpen, setApplyOpen] = useState(false);
  const router = useRouter();
  const withLoginGuard = useLoginGuard();
  const { mutate: toggleLike } = useToggleProjectLike(project.id);

  const buttonKey = getProjectActionButtonKey(project);
  const { label, disabled, variant } = PROJECT_ACTION_BUTTON_CONFIG[buttonKey];

  function handleLike() {
    withLoginGuard(
      () => toggleLike(project.liked),
      "좋아요 기능은 로그인 후 이용할 수 있습니다.",
    );
  }

  function handleAction() {
    if (buttonKey === "isHost") {
      router.push(`/projects/${project.id}/edit`);
      return;
    }
    withLoginGuard(
      () => setApplyOpen(true),
      "지원하기 기능은 로그인 후 이용할 수 있습니다.",
    );
  }

  return (
    <>
      <div className="mt-2 flex items-center gap-3">
        <LikeButton liked={project.liked} onToggle={handleLike} />
        <Button
          variant={variant}
          disabled={disabled}
          className="flex-1"
          onClick={handleAction}
        >
          {label}
        </Button>
      </div>

      <ApplyModal
        open={applyOpen}
        onOpenChange={setApplyOpen}
        projectId={String(project.id)}
      />
    </>
  );
}
