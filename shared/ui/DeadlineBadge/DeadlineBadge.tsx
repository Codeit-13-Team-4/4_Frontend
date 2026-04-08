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

  const variant = dueDate === 0 ? "dday" : "deadline";

  return (
    <Badge variant={variant} size="sm" className={className}>
      <Alarm />
      <span>마감 D-{dueDate === 0 ? "day" : dueDate}</span>
    </Badge>
  );
}
