import { cn } from "@/shared/utils";
import type { ComponentProps, ReactNode } from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { Slot } from "radix-ui";

const gradientButtonVariants = cva(
  "relative inline-flex items-center justify-center gap-2.5 font-semibold cursor-pointer disabled:cursor-not-allowed disabled:opacity-50 border border-transparent [background-image:linear-gradient(var(--gb-bg),var(--gb-bg)),var(--color-gradient-devup)] [background-clip:padding-box,border-box] [background-origin:padding-box,border-box]",
  {
    variants: {
      variant: {
        default:
          "[--gb-bg:var(--color-gray-50)] hover:[--gb-bg:var(--color-mint-50)] active:[--gb-bg:var(--color-mint-100)]",
        dark: "[--gb-bg:var(--color-gray-800)] hover:[--gb-bg:var(--color-gray-700)] active:[--gb-bg:var(--color-gray-900)]",
      },
      size: {
        sm: "px-4 py-2.5 text-sm rounded-[10px]",
        md: "px-6 py-2 text-base rounded-[12px]",
        lg: "px-[30px] py-4 text-xl rounded-[16px]",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "md",
    },
  },
);

interface GradientButtonProps
  extends
    ComponentProps<"button">,
    VariantProps<typeof gradientButtonVariants> {
  children: ReactNode;
  asChild?: boolean;
}

function GradientButton({
  type = "button",
  children,
  className,
  variant,
  size,
  disabled,
  asChild = false,
  ...props
}: GradientButtonProps) {
  const Component = asChild ? Slot.Root : "button";

  return (
    <Component
      type={type}
      className={cn(
        gradientButtonVariants({ variant: disabled ? null : variant, size }),
        disabled &&
          "cursor-not-allowed border-none bg-gray-300 text-gray-600 opacity-100",
        className,
      )}
      disabled={disabled}
      {...props}
    >
      <span
        style={
          disabled
            ? undefined
            : {
                background: "var(--color-gradient-devup)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                backgroundClip: "text",
              }
        }
        className="inline-flex items-center gap-2.5"
      >
        {children}
      </span>
    </Component>
  );
}

export { GradientButton, gradientButtonVariants };
