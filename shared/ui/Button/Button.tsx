import { cn } from "@/shared/utils";
import type { ComponentProps, ReactNode } from "react";
import { cva, type VariantProps } from "class-variance-authority";

const buttonVariants = cva(
  "flex items-center justify-center gap-[10px] rounded-2xl disabled:cursor-not-allowed disabled:opacity-50",
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
        default: "h-14 w-[456px] px-[30px] py-4 text-base font-semibold",
        xs: "h-8 px-3 py-1 text-xs",
        sm: "h-10 px-4 py-2 text-sm",
        lg: "h-16 px-8 py-5 text-lg",
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
