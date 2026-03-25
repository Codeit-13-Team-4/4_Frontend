import { cn } from "@/shared/utils";
import type { ComponentProps, ReactNode } from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { Slot } from "radix-ui";

const buttonVariants = cva(
  "flex items-center justify-center gap-2.5 disabled:cursor-not-allowed disabled:opacity-50 hover:cursor-pointer transition-colors duration-200",
  {
    variants: {
      variant: {
        default:
          "border border-gray-200 text-gray-600 bg-gray-50 hover:bg-gray-200",
        primary: "bg-mint-500 text-gray-50 hover:bg-mint-700",
        dark: "bg-gray-800 text-gray-400 border border-gray-600 hover:bg-gray-700",
        destructive:
          "text-gray-50 border border-error bg-error hover:bg-red-700",
        disabled: "bg-gray-300 text-gray-600",
        ghost: "text-gray-600 hover:bg-gray-100 hover:text-gray-900",
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
  asChild?: boolean;
}

function Button({
  type = "button",
  children,
  className,
  variant,
  size,
  disabled,
  asChild = false,
  ...props
}: ButtonProps) {
  const Component = asChild ? Slot.Root : "button";

  return (
    <Component
      type={type}
      className={cn(
        buttonVariants({ variant: disabled ? "disabled" : variant, size }),
        className,
      )}
      disabled={disabled}
      {...props}
    >
      {children}
    </Component>
  );
}

export { Button, buttonVariants };
