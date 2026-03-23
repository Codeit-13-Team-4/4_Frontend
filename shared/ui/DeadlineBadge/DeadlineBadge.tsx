import { getDeadlineCalculate } from "@/shared/utils/deadlineCalculate/deadlineCalculate";
import { Badge } from "../Badge/Badge";

export function DeadlineBadge({ endDate }: { endDate: string }) {
  if (!endDate) return;
  const dueDate = getDeadlineCalculate(endDate);
  if (dueDate === null || dueDate < 0) return null;
  const label = dueDate === 0 ? "마감 기한 D-day" : `마감 기한 D-${dueDate}`;
  return <Badge variant="deadline">{label}</Badge>;
}
