export function getDeadlineCalculate(endDate: string) {
  const end = new Date(endDate);
  const today = new Date();

  const diff = end.getTime() - today.getTime();
  const diffDays = Math.ceil(diff / (1000 * 60 * 60 * 24));

  return diffDays;
}
