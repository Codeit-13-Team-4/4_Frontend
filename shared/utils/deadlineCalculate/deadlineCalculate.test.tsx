import { getDeadlineCalculate } from "./deadlineCalculate";

describe("deadlineCalculate 테스트", () => {
  describe("getDeadlineCalculate 함수가 올바르게 작동하는지 테스트", () => {
    const today = new Date();
    const todayStr = today.toISOString().split("T")[0];
    test("오늘 날짜를 넣으면 0을 반환한다.", () => {
      expect(getDeadlineCalculate(todayStr)).toBe(0);
    });
    test("5일 후 날짜를 넣으면 5를 반환한다.", () => {
      const future = new Date();
      future.setDate(today.getDate() + 5);
      const futureStr = future.toISOString().split("T")[0];

      expect(getDeadlineCalculate(futureStr)).toBe(5);
    });
    test("3일 전 날짜를 넣으면 -3을 반환한다.", () => {
      const past = new Date();
      past.setDate(today.getDate() - 3);
      const pastStr = past.toISOString().split("T")[0];
      expect(getDeadlineCalculate(pastStr)).toBe(-3);
    });
  });
});
