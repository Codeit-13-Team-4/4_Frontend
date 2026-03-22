import type { ComponentProps } from "react";

import { cn } from "@/shared/utils";

function Input({
  type = "text",
  className,
  ...props
}: ComponentProps<"input">) {
  return (
    <input
      type={type}
      className={cn(
        "h-12 w-full rounded-xl bg-gray-50 p-3 text-sm text-slate-800 outline-none placeholder:text-slate-500",
        className,
      )}
      {...props}
    />
  );
}

export { Input };
