import { cn } from "@/shared/utils";
import { cva, type VariantProps } from "class-variance-authority";

const badgeVariants = cva(
  "rounded-full bg-gray-900 inline-flex items-center gap-1 border font-medium",
  {
    variants: {
      variant: {
        default: "bg-white px-3 py-2",
        recruit: "bg-mint-500 border-none text-gray-900 px-3 py-2.5",
        closed: "bg-gray-400 border-none text-gray-900 px-3 py-2.5",
        auto: "bg-gray-900 border border-blue-500 text-blue-500 px-3 py-2",
        approve: "bg-gray-900 border border-amber-200 text-amber-200 px-3 py-2",
        deadline: "border border-mint-500 text-mint-500 px-2 py-1",
        dday: "border-pink-400 text-pink-400 px-2 py-1",
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
