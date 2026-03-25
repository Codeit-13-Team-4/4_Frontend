import type { ComponentProps } from "react";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/shared/utils";
import { Label } from "@/shared/ui/Label/Label";

function FieldGroup({ className, ...props }: ComponentProps<"div">) {
  return (
    <div
      data-slot="field-group"
      className={cn("flex w-full flex-col gap-4", className)}
      {...props}
    />
  );
}

const fieldVariants = cva("flex w-full gap-1.5", {
  variants: {
    orientation: {
      vertical: "flex-col",
      horizontal: "flex-row items-center",
    },
  },
  defaultVariants: {
    orientation: "vertical",
  },
});

interface FieldProps
  extends ComponentProps<"div">, VariantProps<typeof fieldVariants> {}

function Field({ className, orientation, ...props }: FieldProps) {
  return (
    <div
      role="group"
      data-slot="field"
      data-orientation={orientation ?? "vertical"}
      className={cn(fieldVariants({ orientation }), className)}
      {...props}
    />
  );
}

function FieldLabel({ className, ...props }: ComponentProps<typeof Label>) {
  return <Label className={cn("font-medium", className)} {...props} />;
}

function FieldTitle({ className, ...props }: ComponentProps<"div">) {
  return (
    <div
      data-slot="field-label"
      className={cn("flex items-center gap-2 text-sm font-medium", className)}
      {...props}
    />
  );
}

function FieldError({ className, children, ...props }: ComponentProps<"p">) {
  return (
    <p
      className={cn("text-error pl-1 text-sm font-medium", className)}
      {...props}
    >
      {children}
    </p>
  );
}

export { FieldGroup, Field, FieldLabel, FieldTitle, FieldError };
