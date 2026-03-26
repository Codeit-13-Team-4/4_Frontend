"use client";

import * as RadixProgress from "@radix-ui/react-progress";

import { cn } from "@/shared/utils";

type ProgressProps = React.ComponentProps<typeof RadixProgress.Root>;

function Progress({ className, value = 0, ...props }: ProgressProps) {
  return (
    <RadixProgress.Root
      data-slot="progress"
      value={value}
      max={100}
      className={cn(
        "relative h-1.75 w-full overflow-hidden rounded-full bg-gray-900",
        className,
      )}
      {...props}
    >
      <RadixProgress.Indicator
        data-slot="progress-indicator"
        className="h-full w-full rounded-full transition-transform duration-300"
        style={{
          transform: `translateX(-${100 - (value || 0)}%)`,
          background: "var(--color-gradient-devup)",
        }}
      />
    </RadixProgress.Root>
  );
}

export { Progress };
