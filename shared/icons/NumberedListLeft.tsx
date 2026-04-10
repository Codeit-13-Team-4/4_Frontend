import type { SVGProps } from "react";
export function NumberedListLeft(props: SVGProps<SVGSVGElement>) {
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
        d="M9 6h11M5 8V4M6 14H4.6a.6.6 0 0 1-.6-.6v-.8a.6.6 0 0 1 .6-.6h.8a.6.6 0 0 0 .6-.6v-.8a.6.6 0 0 0-.6-.6H4M4 16h1.4a.6.6 0 0 1 .6.6v2.8a.6.6 0 0 1-.6.6H4M6 18H4M9 12h11M9 18h11"
      />
    </svg>
  );
}
