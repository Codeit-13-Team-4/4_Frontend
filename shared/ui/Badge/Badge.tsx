import { cn } from "@/shared/utils";
import { cva, type VariantProps } from "class-variance-authority";

const badgeVariants = cva(
  "rounded-full bg-gray-900 inline-flex items-center gap-1 border font-medium p-2",
  {
    variants: {
      variant: {
        default: "bg-white",
        recruit: "bg-mint-900 border-none text-mint-500",
        closed: "bg-gray-900 border-none text-gray-400",
        auto: "bg-gray-800 border border-blue-500 text-blue-500",
        approve: "bg-gray-800 border border-amber-200 text-amber-200",
        deadline: "border-none bg-gray-700 text-mint-500",
        dday: "border-none bg-gray-700 text-pink-400",
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
