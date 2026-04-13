export function formatToDate(dateString: string | Date): string {
  const rtf = new Intl.RelativeTimeFormat("ko", { numeric: "auto" });

  const now = new Date();
  const targetDate = new Date(dateString);

  const diffInSeconds = Math.floor(
    (now.getTime() - targetDate.getTime()) / 1000,
  );

  if (diffInSeconds < 60) return "방금 전";

  const diffInMinutes = Math.floor(diffInSeconds / 60);
  if (diffInMinutes < 60) return rtf.format(-diffInMinutes, "minute");

  const diffInHours = Math.floor(diffInMinutes / 60);
  if (diffInHours < 24) return rtf.format(-diffInHours, "hour");

  const diffInDays = Math.floor(diffInHours / 24);
  if (diffInDays < 7) return rtf.format(-diffInDays, "day");

  const diffInWeeks = Math.floor(diffInDays / 7);
  if (diffInWeeks < 5) return rtf.format(-diffInWeeks, "week");

  const diffInMonths = Math.floor(diffInDays / 30);
  if (diffInMonths < 12) return rtf.format(-diffInMonths, "month");

  const diffInYears = Math.floor(diffInDays / 365);
  return rtf.format(-diffInYears, "year");
}
