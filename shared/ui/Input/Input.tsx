import type { InputHTMLAttributes } from "react";

import { cn } from "@/shared/utils";

export default function Input({
  type = "text",
  className,
  ...props
}: InputHTMLAttributes<HTMLInputElement>) {
  return (
    <input
      type={type}
      className={cn(
        "h-12 w-[456px] rounded-xl bg-gray-50 p-3 text-sm text-slate-800 outline-none placeholder:text-slate-500",
        className,
      )}
      {...props}
    />
  );
}
