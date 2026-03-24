import { cn } from "@/shared/utils";
import type { ComponentProps, ReactNode } from "react";
import { cva, type VariantProps } from "class-variance-authority";

const buttonVariants = cva(
  "flex items-center justify-center gap-2.5 disabled:cursor-not-allowed disabled:opacity-50 hover:cursor-pointer",
  {
    variants: {
      variant: {
        default: "border border-gray-200 text-gray-600 bg-gray-50",
        primary: "bg-mint-500 text-gray-50",
        dark: "bg-gray-800 text-gray-400 border border-gray-600",
        destructive: "text-gray-50 border border-error bg-error",
        disabled: "bg-gray-600 text-gray-300",
      },
      size: {
        sm: "h-10 px-4 py-2.5 text-sm rounded-[10px] font-semibold",
        md: "h-12 px-6 py-3 text-sm font-semibold rounded-xl",
        lg: "h-15 px-[30px] py-4 text-base font-semibold rounded-2xl",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "md",
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
