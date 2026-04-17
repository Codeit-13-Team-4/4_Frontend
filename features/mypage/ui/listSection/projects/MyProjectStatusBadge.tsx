import { Badge } from "@/shared/ui";
import { ProjectCardProps } from "@/features/projects/model";

interface MyProjectStatusBadgeProps {
  status: ProjectCardProps["status"];
}

const badgeClass = "px-3 py-2.5 text-sm";

export default function MyProjectStatusBadge({
  status,
}: MyProjectStatusBadgeProps) {
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
