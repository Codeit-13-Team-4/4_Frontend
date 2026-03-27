import { cn } from "@/shared/utils";

interface CompleteAnimationProps {
  className?: string;
}

export function CompleteAnimation({ className }: CompleteAnimationProps) {
  return (
    <svg
      className={cn("size-12.5 overflow-visible", className)}
      viewBox="0 0 100 100"
    >
      <circle
        cx="50"
        cy="50"
        r="45"
        className="animate-drawCircle origin-[50%_50%] fill-none stroke-[#007da5] stroke-8 [stroke-linecap:round] [stroke-linejoin:round]"
        style={{
          strokeDasharray: 283,
          strokeDashoffset: 283,
        }}
      />
      <circle
        cx="50"
        cy="50"
        r="45"
        className="animate-fillCircle fill-[#007da5] opacity-0 [animation-delay:0.5s]"
      />
      <path
        d="M32 52 L44 64 L70 38"
        className="animate-showCheck origin-[50%_50%] fill-none stroke-white stroke-8 opacity-0 [animation-delay:0.5s] [stroke-linecap:round] [stroke-linejoin:round]"
      />
    </svg>
  );
}
