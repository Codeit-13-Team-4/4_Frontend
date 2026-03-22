import type { ButtonHTMLAttributes, ReactNode } from "react";

import { cn } from "@/shared/utils";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode;
}

function Button({
  type = "button",
  children,
  className,
  ...props
}: ButtonProps) {
  return (
    <button
      type={type}
      className={cn(
        "flex h-14 w-full items-center justify-center gap-[10px] rounded-2xl px-[30px] py-4 text-base font-semibold",
        className,
      )}
      {...props}
    >
      {children}
    </button>
  );
}
export { Button };
