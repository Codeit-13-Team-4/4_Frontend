import { Badge } from "@/shared/ui";
import { ChallengeCardProps } from "@/features/challenges/model";

interface MyChallengeStatusBadgeProps {
  status: ChallengeCardProps["status"];
}

const badgeClass = "px-3 py-2.5 text-sm";

export default function MyChallengeStatusBadge({
  status,
}: MyChallengeStatusBadgeProps) {
  if (status === "COMPLETED") {
    return (
      <Badge variant="closed" className={badgeClass}>
        종료
      </Badge>
    );
  }

  if (status === "RECRUITMENT_CLOSED") {
    return (
      <Badge variant="closed" className={badgeClass}>
        모집 종료
      </Badge>
    );
  }

  if (status === "IN_PROGRESS") {
    return (
      <Badge
        variant="recruit"
        className={`${badgeClass} bg-blue-900 text-blue-500`}
      >
        진행중
      </Badge>
    );
  }

  return (
    <Badge variant="recruit" className={badgeClass}>
      모집중
    </Badge>
  );
}
