import { Badge } from "@/shared/ui";
import type { ChallengesStatusType } from "@/features/challenges/model";

const STATUS_LABEL: Record<
  ChallengesStatusType,
  { label: string; variant: "recruit" | "closed" }
> = {
  RECRUITING: { label: "모집중", variant: "recruit" },
  RECRUITMENT_CLOSED: { label: "모집완료", variant: "closed" },
  IN_PROGRESS: { label: "모집완료", variant: "closed" },
  COMPLETED: { label: "모집완료", variant: "closed" },
};

export function ChallengesStatusBadge({
  status,
}: {
  status: ChallengesStatusType;
}) {
  const { label, variant } = STATUS_LABEL[status];
  return <Badge variant={variant}>{label}</Badge>;
}
