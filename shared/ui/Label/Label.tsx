"use client";

import * as LabelPrimitive from "@radix-ui/react-label";
import type { InputHTMLAttributes } from "react";

import { cn } from "@/shared/utils";

interface LabelProps extends InputHTMLAttributes<HTMLInputElement> {
  label: string;
  errorMessage?: string;
  className?: string;
}

function Label({ label, errorMessage, className, id, ...props }: LabelProps) {
  const inputId = id ?? label;

  return (
    <div className={cn("flex flex-col gap-2", className)}>
      <LabelPrimitive.Root
        htmlFor={inputId}
        className={cn(
          "text-sm font-medium text-black dark:text-white",
          className,
        )}
      >
        {label}
      </LabelPrimitive.Root>

      <input
        id={inputId}
        className={cn(
          "h-11 rounded-xl border border-gray-300 px-4 text-sm text-black transition outline-none placeholder:text-gray-400 focus:border-black dark:border-gray-700 dark:bg-zinc-900 dark:text-white dark:focus:border-white",
          className,
        )}
        {...props}
      />

      {errorMessage ? (
        <p className={cn("text-sm text-red-500 dark:text-red-400", className)}>
          {errorMessage}
        </p>
      ) : null}
    </div>
  );
}

export { Label };
