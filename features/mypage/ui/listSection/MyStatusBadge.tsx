import { Badge } from "@/shared/ui";
import { MyParticipationStatus } from "@/features/challenges/model";

interface MyStatusBadgeProps {
  status: string;
  participationStatus: MyParticipationStatus;
}

const badgeClass = "px-3 py-2.5 text-sm";

export default function MyStatusBadge({
  status,
  participationStatus,
}: MyStatusBadgeProps) {
  const normalizedStatus = status.toLowerCase();

  // if (participationStatus === "REJECTED") {
  //   return (
  //     <Badge variant="rejected" className={badgeClass}>
  //       거절됨
  //     </Badge>
  //   );
  // }

  if (participationStatus === "PENDING") {
    return (
      <Badge
        variant="approve"
        className={`${badgeClass} bg-amber-subtle text-amber-strong border-none`}
      >
        승인 대기중
      </Badge>
    );
  }

  if (normalizedStatus === "completed") {
    return (
      <Badge variant="closed" className={badgeClass}>
        종료
      </Badge>
    );
  }

  if (normalizedStatus === "recruitment_closed") {
    return (
      <Badge variant="closed" className={badgeClass}>
        모집 종료
      </Badge>
    );
  }

  if (normalizedStatus === "in_progress") {
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
