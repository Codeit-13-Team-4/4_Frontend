import { format } from "date-fns";
import { type DateRange } from "react-day-picker";

export function formatDate(date: Date): string {
  return format(date, "yyyy-MM-dd");
}

export function formatDateRange(range: DateRange): {
  startDate: string | undefined;
  endDate: string | undefined;
} {
  return {
    startDate: range.from ? format(range.from, "yyyy-MM-dd") : undefined,
    endDate: range.to ? format(range.to, "yyyy-MM-dd") : undefined,
  };
}
