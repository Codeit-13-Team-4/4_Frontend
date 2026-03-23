export function getDeadlineCalculate(endDate: string) {
  const end = new Date(endDate);
  const today = new Date();

  const endDateOnly = new Date(
    end.getFullYear(),
    end.getMonth(),
    end.getDate(),
  );

  const todayDateOnly = new Date(
    today.getFullYear(),
    today.getMonth(),
    today.getDate(),
  );

  const diff = endDateOnly.getTime() - todayDateOnly.getTime();
  const diffDays = Math.ceil(diff / (1000 * 60 * 60 * 24));

  return diffDays;
}
