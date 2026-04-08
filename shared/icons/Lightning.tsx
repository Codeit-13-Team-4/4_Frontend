import type { SVGProps } from "react";
export function Lightning(props: SVGProps<SVGSVGElement>) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="1em"
      height="1em"
      fill="currentColor"
      viewBox="0 0 24 24"
      {...props}
    >
      <path fill="currentColor" d="M11 15H6l7-14v8h5l-7 14z" />
    </svg>
  );
}
