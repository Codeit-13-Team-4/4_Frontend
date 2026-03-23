import { getDeadlineCalculate } from "@/shared/utils/deadlineCalculate/deadlineCalculate";
import { Badge } from "../Badge/Badge";

export function DeadlineBadge({ endDate }: { endDate: string }) {
  const dueDate = getDeadlineCalculate(endDate);
  if (dueDate < 0) return null;
  const label = dueDate === 0 ? "마감 기한 D-day" : `마감 기한 D-${dueDate}`;
  const variant = dueDate === 0 ? "dday" : "deadline";

  return <Badge variant={variant}>{label}</Badge>;
}
