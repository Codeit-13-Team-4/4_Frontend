import { cn } from "./cn";

describe("cn 유틸함수 테스트", () => {
  describe("기본 동작", () => {
    test("단일 클래스를 반환한다", () => {
      expect(cn("foo")).toBe("foo");
    });

    test("여러 클래스를 공백으로 합친다", () => {
      expect(cn("foo", "bar")).toBe("foo bar");
    });

    test("인수가 없으면 빈 문자열을 반환한다", () => {
      expect(cn()).toBe("");
    });
  });

  describe("조건부 클래스 (clsx)", () => {
    test("true 조건의 클래스만 포함한다", () => {
      expect(cn("foo", true && "bar", false && "baz")).toBe("foo bar");
    });

    test("undefined, null, false는 무시한다", () => {
      expect(cn("foo", undefined, null, false)).toBe("foo");
    });

    test("객체 형태의 조건부 클래스를 처리한다", () => {
      expect(cn({ foo: true, bar: false, baz: true })).toBe("foo baz");
    });

    test("배열 형태의 클래스를 처리한다", () => {
      expect(cn(["foo", "bar"])).toBe("foo bar");
    });
  });

  describe("Tailwind 충돌 병합 (tailwind-merge)", () => {
    test("같은 속성의 Tailwind 클래스는 마지막 것으로 덮어쓴다", () => {
      expect(cn("p-4", "p-8")).toBe("p-8");
    });

    test("text 색상 충돌 시 마지막 클래스를 유지한다", () => {
      expect(cn("text-red-500", "text-blue-500")).toBe("text-blue-500");
    });

    test("충돌하지 않는 클래스는 모두 유지한다", () => {
      expect(cn("p-4", "m-4")).toBe("p-4 m-4");
    });

    test("조건부 클래스와 Tailwind 충돌 병합을 함께 처리한다", () => {
      expect(cn("p-4", true && "p-8")).toBe("p-8");
    });
  });
});
