"use client";
import { useEffect, useState } from "react";
import { cva } from "class-variance-authority";
import { Toast } from "radix-ui";
import { cn, registerToast, ToastItem, unregisterToast } from "@/shared/utils";

const toastVariants = cva(
  "flex items-center gap-3 w-full px-4 py-3 rounded-[10px] bg-white dark:bg-zinc-900 border border-zinc-100 dark:border-zinc-800 shadow-[0_2px_8px_rgba(0,0,0,0.08)] text-sm text-zinc-800 dark:text-zinc-100",
  {
    variants: {
      variant: {
        default: "",
        success: "",
        error: "",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  },
);

const dotVariants = cva("w-[6px] h-[6px] rounded-full flex-shrink-0", {
  variants: {
    variant: {
      default: "bg-zinc-400",
      success: "bg-green-500",
      error: "bg-red-500",
    },
  },
  defaultVariants: { variant: "default" },
});

export function ToastContainer() {
  const [toastList, setToastList] = useState<ToastItem[]>([]);

  useEffect(() => {
    registerToast(setToastList);
    return () => unregisterToast();
  }, []);

  return (
    <Toast.Provider swipeDirection="right">
      {toastList.map((item) => (
        <Toast.Root
          key={item.id}
          duration={item.duration}
          className={cn(
            toastVariants({ variant: item.variant }),
            "data-open:animate-toast-in",
          )}
        >
          <span
            className={cn(dotVariants({ variant: item.variant }))}
            data-testid="toast-dot"
          />
          {item.icon && <span className="text-base">{item.icon}</span>}
          <Toast.Description className="flex-1">
            {item.message}
          </Toast.Description>
        </Toast.Root>
      ))}
      <Toast.Viewport className="fixed top-5 right-5 z-50 flex max-w-90 min-w-70 flex-col items-end gap-2" />
    </Toast.Provider>
  );
}
