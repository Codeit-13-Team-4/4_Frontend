import { Badge } from "@/shared/ui";
import { ProjectCardProps } from "@/features/projects/model";
import { MyRoleType } from "@/features/mypage/model/mypage.types";

interface MyProjectStatusBadgeProps {
  role: MyRoleType;
  status: ProjectCardProps["status"];
  applicationStatus: ProjectCardProps["applicationStatus"];
}

const badgeClass = "px-3 py-2.5 text-sm";

export default function MyProjectStatusBadge({
  role,
  status,
  applicationStatus,
}: MyProjectStatusBadgeProps) {
  if (role === "PENDING") {
    if (applicationStatus === "rejected") {
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

  if (status === "recruitment_closed") {
    return (
      <Badge variant="closed" className={badgeClass}>
        모집 종료
      </Badge>
    );
  }

  return (
    <Badge variant="recruit" className={badgeClass}>
      모집중
    </Badge>
  );
}
