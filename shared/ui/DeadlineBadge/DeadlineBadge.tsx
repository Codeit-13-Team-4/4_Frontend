import { getDeadlineCalculate } from "@/shared/utils/deadlineCalculate/deadlineCalculate";
import { Badge } from "../Badge/Badge";

export function DeadlineBadge({ endDate }: { endDate: string }) {
  const dueDate = getDeadlineCalculate(endDate);
  if (dueDate < 0) return null;
  const label = dueDate === 0 ? "모집마감 D-day" : `모집마감 D-${dueDate}`;
  const variant = dueDate === 0 ? "dday" : "deadline";

  return <Badge variant={variant}>{label}</Badge>;
}
