import { ComponentProps } from "react";
import { Badge } from "../Badge/Badge";

type BadgeVariant = ComponentProps<typeof Badge>["variant"];

interface BadgeStatus {
  label: string;
  type: BadgeVariant;
}

const BADGE_STATUS = {
  recruiting: { label: "모집중", type: "recruit" },
  recruitment_closed: { label: "모집완료", type: "closed" },
  in_progress: { label: "진행중", type: "default" },
  completed: { label: "완료", type: "default" },
} satisfies Record<string, BadgeStatus>;

type StatusKey = keyof typeof BADGE_STATUS;

export function StatusBadge({ status }: { status: StatusKey }) {
  const badge = BADGE_STATUS[status];

  return <Badge variant={badge.type}>{badge.label}</Badge>;
}
