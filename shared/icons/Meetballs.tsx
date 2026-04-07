import type { SVGProps } from "react";
export function Meetballs(props: SVGProps<SVGSVGElement>) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="1em"
      height="1em"
      fill="currentColor"
      viewBox="0 0 24 24"
      {...props}
    >
      <circle cx={6.149} cy={12.291} r={1.5} fill="currentColor" />
      <circle cx={12.149} cy={12.291} r={1.5} fill="currentColor" />
      <circle cx={18.149} cy={12.291} r={1.5} fill="currentColor" />
    </svg>
  );
}
