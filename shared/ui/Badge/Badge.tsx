import { cn } from "@/shared/utils";
import { cva, type VariantProps } from "class-variance-authority";

const badgeVariants = cva(
  "rounded-3xl bg-[#0F172A] inline-flex items-center px-4 py-2 gap-1 border",
  {
    variants: {
      variant: {
        default: "bg-white",
        recruit: "bg-[#00D7A0] border-none text-[#0Fi172A]",
        closed: "bg-[#94A3B8] border-none text-[#0Fi172A]",
        auto: "bg-[#0F172A] border border-[#38C4FF] text-[#38C4FF]",
        approve: "bg-[#0F172A] border border-[#FDE68A] text-[#FDE68A]",
        deadline: "border border-[#00D7A0] text-[#00D7A0]",
        dday: "border-[#F472B6] text-[#F472B6]",
      },
      size: {
        default: "text-md",
        sm: "text-sm",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  },
);

interface BadgeProps
  extends
    React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof badgeVariants> {
  children?: React.ReactNode;
}

export function Badge({
  variant,
  size,
  className,
  children,
  ...props
}: BadgeProps) {
  return (
    <div className={cn(badgeVariants({ variant, size }), className)} {...props}>
      {children}
    </div>
  );
}
