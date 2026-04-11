import { Badge } from "@/shared/ui";
import { Lightning, Lock } from "@/shared/icons";
import type { ParticipationType } from "@/features/challenges/model";

const badgeInfo = {
  INSTANT: { label: "즉시 참여 가능", icon: Lightning, variant: "auto" },
  APPROVAL: { label: "승인 후 참여 가능", icon: Lock, variant: "approve" },
} as const;

export function ChallengesJoinTypeBadge({ type }: { type: ParticipationType }) {
  const { label, icon: Icon, variant } = badgeInfo[type];

  return (
    <Badge variant={variant} className="flex gap-1">
      <Icon width={24} height={24} />
      <span>{label}</span>
    </Badge>
  );
}
