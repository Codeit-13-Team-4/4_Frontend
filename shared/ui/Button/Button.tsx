import { cn } from "@/shared/utils";
import type { ComponentProps, ReactNode } from "react";
import { cva, type VariantProps } from "class-variance-authority";

const buttonVariants = cva(
  "flex items-center justify-center gap-2.5 rounded-2xl disabled:cursor-not-allowed disabled:opacity-50 hover:cursor-pointer",
  {
    variants: {
      variant: {
        default: "bg-black text-white",
        primary: "bg-slate-500 text-white",
        secondary: "bg-gray-200 text-black",
        approve: "bg-green-600 text-white",
        reject: "bg-red-600 text-white",
        outline: "border border-slate-200 bg-white text-black",
      },
      size: {
        xs: "h-8 px-3 py-1.5 text-xs",
        sm: "h-10 px-4 py-2 text-sm",
        default: "h-12 px-5 py-2 text-sm font-semibold",
        lg: "h-12 px-6 py-3 text-base font-semibold",
        xl: "h-14 px-8 py-4 text-lg font-semibold",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  },
);

interface ButtonProps
  extends ComponentProps<"button">, VariantProps<typeof buttonVariants> {
  children: ReactNode;
}

function Button({
  type = "button",
  children,
  className,
  variant,
  size,
  ...props
}: ButtonProps) {
  return (
    <button
      type={type}
      className={cn(buttonVariants({ variant, size }), className)}
      {...props}
    >
      {children}
    </button>
  );
}

export { Button, buttonVariants };
