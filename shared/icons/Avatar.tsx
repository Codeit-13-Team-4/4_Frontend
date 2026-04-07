import type { SVGProps } from "react";
export function Avatar(props: SVGProps<SVGSVGElement>) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="1em"
      height="1em"
      fill="currentColor"
      viewBox="0 0 44 44"
      {...props}
    >
      <rect width={43} height={43} x={0.5} y={0.5} stroke="#58677D" rx={21.5} />
      <path
        stroke="#58677D"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M22 22a6.667 6.667 0 1 0 0-13.333A6.667 6.667 0 0 0 22 22"
      />
      <path
        stroke="#58677D"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M10.334 35.333v-1.666C10.334 27.223 15.557 22 22.001 22c6.443 0 11.666 5.223 11.666 11.667v1.666"
      />
    </svg>
  );
}
