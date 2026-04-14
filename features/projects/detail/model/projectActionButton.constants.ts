import type { ProjectDetail } from "@/features/projects/model";

export type ProjectActionButtonKey =
  | "isHost"
  | "isMember"
  | "pending"
  | "rejected"
  | "closed"
  | "apply";

export const PROJECT_ACTION_BUTTON_CONFIG: Record<
  ProjectActionButtonKey,
  { label: string; disabled: boolean; variant: "primary" | "disabled" | "dark" }
> = {
  isHost: { label: "수정하기", disabled: false, variant: "primary" },
  isMember: { label: "참여 중", disabled: true, variant: "disabled" },
  pending: { label: "승인 대기 중", disabled: true, variant: "disabled" },
  rejected: { label: "거절됨", disabled: true, variant: "disabled" },
  closed: { label: "모집 마감", disabled: true, variant: "disabled" },
  apply: { label: "지원하기", disabled: false, variant: "primary" },
};

export function getProjectActionButtonKey(
  project: ProjectDetail,
): ProjectActionButtonKey {
  if (project.isHost) return "isHost";
  if (project.isMember) return "isMember";
  if (project.hasApplication && project.applicationStatus)
    return project.applicationStatus as "pending" | "rejected";
  if (project.status !== "recruiting") return "closed";
  return "apply";
}
