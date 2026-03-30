import { formatDate, formatDateRange } from "./formatDate";

describe("formatDate 유틸 함수 테스트", () => {
  describe("formatDate 함수가 올바르게 작동하는지 테스트", () => {
    test("Date 객체를 yyyy-MM-dd 형식의 문자열로 반환한다.", () => {
      const date = new Date(2026, 2, 30);
      expect(formatDate(date)).toBe("2026-03-30");
    });

    test("월과 일이 한 자리일 때 앞에 0을 붙여 반환한다.", () => {
      const date = new Date(2026, 0, 5);
      expect(formatDate(date)).toBe("2026-01-05");
    });
  });

  describe("formatDateRange 함수가 올바르게 작동하는지 테스트", () => {
    test("from과 to가 모두 있으면 startDate, endDate를 반환한다.", () => {
      const range = { from: new Date(2026, 2, 1), to: new Date(2026, 2, 30) };
      expect(formatDateRange(range)).toEqual({
        startDate: "2026-03-01",
        endDate: "2026-03-30",
      });
    });

    test("from만 있으면 endDate는 undefined를 반환한다.", () => {
      const range = { from: new Date(2026, 2, 1), to: undefined };
      expect(formatDateRange(range)).toEqual({
        startDate: "2026-03-01",
        endDate: undefined,
      });
    });

    test("from이 없으면 startDate는 undefined를 반환한다.", () => {
      const range = { from: undefined, to: new Date(2026, 2, 30) };
      expect(formatDateRange(range)).toEqual({
        startDate: undefined,
        endDate: "2026-03-30",
      });
    });
  });
});
