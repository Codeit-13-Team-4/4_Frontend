import { act, render, screen } from "@testing-library/react";
import { test, expect, vi, describe } from "vitest";
import { ToastContainer } from "./Toast";
import { toast } from "@/shared/utils";

describe("Toast UI 테스트", () => {
  beforeEach(() => {
    render(<ToastContainer />);
  });
  describe("Toast Message 화면에 올바르게 나타나는지 테스트", () => {
    test("Toast Message가 화면에 나타단다.", async () => {
      toast("테스트 메시지");

      const toastItem = await screen.findByText("테스트 메시지");

      expect(toastItem).toBeInTheDocument();
    });
  });

  describe("Toast dot variant에 따른 색 테스트", () => {
    test("Toast의 variants가 default일 경우 class에 bg-zinc-400을 포함하는지 테스트", async () => {
      toast("toast default", { variant: "default" });

      const dotSpan = await screen.findByTestId("toast-dot");

      expect(dotSpan).toHaveClass("bg-zinc-400");
    });

    test("Toast의 variants가 success일 경우 class에 bg-green-500을 포함하는지 테스트", async () => {
      toast("toast success", { variant: "success" });

      const dotSpan = await screen.findByTestId("toast-dot");

      expect(dotSpan).toHaveClass("bg-green-500");
    });
    test("Toast의 variants가 error 경우 class에 bg-red-500을 포함하는지 테스트", async () => {
      toast("toast error", { variant: "error" });

      const dotSpan = await screen.findByTestId("toast-dot");

      expect(dotSpan).toHaveClass("bg-red-500");
    });
  });

  describe("Toast Message에 Icon이 정상 출력 되는지 테스트", () => {
    test("Toast Message의 이모지를 넣을 경우 테스트", async () => {
      toast("toast message with Icon", { icon: <span>👌</span> });

      const toastItem = await screen.findByText("👌");

      expect(toastItem).toBeInTheDocument();
    });
  });

  describe("Toast Message가 duration 후에 사라지는지 테스트", () => {
    test("Toast message가 default인 2초 뒤에 사라지는지 테스트", async () => {
      vi.useFakeTimers();

      act(() => {
        toast("toast duration default test");
      });

      const viewItem = screen.getByText("toast duration default test");
      expect(viewItem).toBeInTheDocument();

      act(() => {
        vi.advanceTimersByTime(2000);
      });

      const notViewItem = screen.queryByText("toast duration default test");
      expect(notViewItem).not.toBeInTheDocument();

      vi.useRealTimers();
    });

    test("Toast message가 duration만큼 5초뒤에 사라지는지 테스트", async () => {
      vi.useFakeTimers();

      act(() => {
        toast("toast duration 5000 test");
      });

      const viewItem = screen.getByText("toast duration 5000 test");
      expect(viewItem).toBeInTheDocument();

      act(() => {
        vi.advanceTimersByTime(5000);
      });

      const notViewItem = screen.queryByText("toast duration 5000 test");
      expect(notViewItem).not.toBeInTheDocument();

      vi.useRealTimers();
    });
  });
});
