import type { SVGProps } from "react";
export function LineMdLink(props: SVGProps<SVGSVGElement>) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      {...props}
    >
      <path
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={1.5}
        d="m13 6 2-2c1-1 3-1 4 0l1 1c1 1 1 3 0 4l-5 5c-1 1-3 1-4 0m0 4-2 2c-1 1-3 1-4 0l-1-1c-1-1-1-3 0-4l5-5c1-1 3-1 4 0"
      />
    </svg>
  );
}
