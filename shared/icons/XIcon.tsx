import type { SVGProps } from "react";
export function XIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      fill="currentColor"
      viewBox="0 0 10 10"
      {...props}
    >
      <path
        stroke="currentColor"
        strokeLinecap="round"
        strokeWidth="1.4"
        d="m.7.7 8 8M8.7.7l-8 8"
      />
    </svg>
  );
}
