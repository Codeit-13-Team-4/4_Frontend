"use client";

import * as LabelPrimitive from "@radix-ui/react-label";
import type { ComponentPropsWithoutRef } from "react";

import { cn } from "@/shared/utils";

interface LabelProps extends Omit<
  ComponentPropsWithoutRef<typeof LabelPrimitive.Root>,
  "children"
> {
  htmlFor: string;
}

function Label({ htmlFor, className, ...props }: LabelProps) {
  return (
    <LabelPrimitive.Root
      htmlFor={htmlFor}
      className={cn("text-black dark:text-white", className)}
      {...props}
    >
      {htmlFor}
    </LabelPrimitive.Root>
  );
}

export { Label };
