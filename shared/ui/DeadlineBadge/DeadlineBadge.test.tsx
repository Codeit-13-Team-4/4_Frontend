import { render, screen } from "@testing-library/react";
import { DeadlineBadge } from "./DeadlineBadge";

describe("DeadlineBadge", () => {
  function formatDate(date: Date) {
    return date.toISOString().split("T")[0];
  }

  test("미래 날짜를 넣으면 D-3 같은 라벨이 나온다", () => {
    const today = new Date();
    const future = new Date(today);
    future.setDate(today.getDate() + 3);

    render(<DeadlineBadge endDate={formatDate(future)} />);
    const badge = screen.getByText("마감 기한 D-3");
    expect(badge).toBeInTheDocument();
  });

  test("오늘 날짜를 넣으면 D-day 라벨이 나온다", () => {
    const today = new Date();
    render(<DeadlineBadge endDate={formatDate(today)} />);
    const badge = screen.getByText("마감 기한 D-day");
    expect(badge).toBeInTheDocument();
  });

  test("과거 날짜를 넣으면 Badge가 렌더링되지 않는다", () => {
    const today = new Date();
    const past = new Date(today);
    past.setDate(today.getDate() - 3);

    render(<DeadlineBadge endDate={formatDate(past)} />);
    const badge = screen.queryByText(/마감 기한/);
    expect(badge).toBeNull();
  });
});
