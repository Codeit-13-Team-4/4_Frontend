import type { SVGProps } from "react";
export function Link(props: SVGProps<SVGSVGElement>) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="1em"
      height="1em"
      fill="none"
      viewBox="0 0 18 18"
      {...props}
    >
      <path
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={1.5}
        d="m9.75 4.5 1.5-1.5c.75-.75 2.25-.75 3 0l.75.75c.75.75.75 2.25 0 3l-3.75 3.75c-.75.75-2.25.75-3 0m0 3L6.75 15c-.75.75-2.25.75-3 0L3 14.25c-.75-.75-.75-2.25 0-3L6.75 7.5c.75-.75 2.25-.75 3 0"
      />
    </svg>
  );
}
