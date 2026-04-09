import { Badge } from "@/shared/ui";
import { MyParticipationStatus } from "@/features/challenges/model";
import { ChallengeCardProps } from "@/features/challenges/model";
import { MyRoleType } from "@/features/mypage/model/mypage.types";

interface MyChallengeStatusBadgeProps {
  role: MyRoleType;
  status: ChallengeCardProps["status"];
  participationStatus: MyParticipationStatus;
}

const badgeClass = "px-3 py-2.5 text-sm";

export default function MyChallengeStatusBadge({
  role,
  status,
  participationStatus,
}: MyChallengeStatusBadgeProps) {
  if (role === "PENDING") {
    if (participationStatus === "REJECTED") {
      return (
        <Badge variant="rejected" className={badgeClass}>
          거절됨
        </Badge>
      );
    }
    return (
      <Badge
        variant="approve"
        className={`${badgeClass} bg-amber-subtle text-amber-strong border-none`}
      >
        승인 대기중
      </Badge>
    );
  }

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
