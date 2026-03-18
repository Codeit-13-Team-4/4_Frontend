import { cn } from "@/shared/utils";

type SpinnerSize = "sm" | "md" | "lg" | number;

interface SpinnerProps {
  size?: SpinnerSize;
  className?: string;
}

const sizeMap = {
  sm: 16,
  md: 24,
  lg: 32,
};

export function Spinner({ size = "md", className }: SpinnerProps) {
  const resolvedSize = typeof size === "number" ? size : sizeMap[size];

  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={resolvedSize}
      height={resolvedSize}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      stroke-width="2"
      stroke-linecap="round"
      stroke-linejoin="round"
      className={cn("animate-spin", className)}
    >
      <path d="M21 12a9 9 0 1 1-6.219-8.56" />
    </svg>
  );
}
