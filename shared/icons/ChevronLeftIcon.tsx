import type { SVGProps } from "react";
export function ChevronLeftIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="1em"
      height="1em"
      fill="none"
      viewBox="0 0 12 20"
      {...props}
    >
      <path
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={3.2}
        d="m9.6 1.6-8 8 8 8"
      />
    </svg>
  );
}
