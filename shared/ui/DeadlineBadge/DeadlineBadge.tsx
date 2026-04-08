import { getDeadlineCalculate } from "@/shared/utils/deadlineCalculate/deadlineCalculate";
import { Badge } from "../Badge/Badge";
import { Alarm } from "@/shared/icons";

export function DeadlineBadge({
  endDate,
  className,
}: {
  endDate: string;
  className?: string;
}) {
  const dueDate = getDeadlineCalculate(endDate);
  if (dueDate < 0) return null;
  const label =
    dueDate === 0 ? (
      <>
        <Alarm />
        마감 D-day
      </>
    ) : (
      <>
        <Alarm />
        마감 D-{dueDate}
      </>
    );
  const variant = dueDate === 0 ? "dday" : "deadline";

  return (
    <Badge variant={variant} size="sm" className={className}>
      {label}
    </Badge>
  );
}
