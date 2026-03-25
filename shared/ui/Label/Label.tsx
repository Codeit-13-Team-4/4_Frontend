"use client";

import * as LabelPrimitive from "@radix-ui/react-label";
import type { ComponentProps } from "react";

import { cn } from "@/shared/utils";

interface LabelProps extends ComponentProps<typeof LabelPrimitive.Root> {
  required?: boolean;
}

function Label({ className, required, children, ...props }: LabelProps) {
  return (
    <LabelPrimitive.Root
      data-slot="label"
      className={cn(
        "flex items-center gap-0.5 text-sm leading-none font-medium select-none",
        className,
      )}
      {...props}
    >
      {children}
      {required && <span className="text-mint-500">*</span>}
    </LabelPrimitive.Root>
  );
}

export { Label };
