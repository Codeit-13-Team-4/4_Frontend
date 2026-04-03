import { Badge } from "@/shared/ui";
import { ParticipationType } from "../../model";

const badgeInfo = {
  INSTANT: {
    label: "즉시 참여 가능",
    icon: <ChallengesIcon fill="#38c4ff" />,
    variant: "auto",
  },
  APPROVAL: {
    label: "승인 후 참여 가능",
    icon: <ChallengesIcon fill="#fde68a" />,
    variant: "approve",
  },
} as const;

export function ChallengesBadge({ type }: { type: ParticipationType }) {
  const { label, icon, variant } = badgeInfo[type];

  return (
    <Badge variant={variant} className="flex gap-2">
      <span>{icon}</span>
      <span>{label}</span>
    </Badge>
  );
}

function ChallengesIcon({ fill }: { fill: string }) {
  return (
    <svg
      width="12"
      height="22"
      viewBox="0 0 12 22"
      fill={fill}
      xmlns="http://www.w3.org/2000/svg"
    >
      <path d="M5 14H0L7 0V8H12L5 22V14Z" />
    </svg>
  );
}
