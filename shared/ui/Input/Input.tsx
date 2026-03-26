import { cva, type VariantProps } from "class-variance-authority";
import type { ComponentProps } from "react";

import { cn } from "@/shared/utils";

const inputVariants = cva(
  "w-full bg-gray-800 text-gray-50 outline-none placeholder:text-gray-400 font-normal border border-border-default",
  {
    variants: {
      size: {
        lg: "h-12 rounded-xl px-3 py-3 text-base",
        sm: "h-10 rounded-[10px] px-3 py-2.5 text-sm",
      },
    },
    defaultVariants: {
      size: "lg",
    },
  },
);

interface InputProps
  extends
    Omit<ComponentProps<"input">, "size">,
    VariantProps<typeof inputVariants> {}

function Input({ type = "text", className, size, ...props }: InputProps) {
  return (
    <input
      type={type}
      className={cn(inputVariants({ size }), className)}
      {...props}
    />
  );
}

export { Input };
