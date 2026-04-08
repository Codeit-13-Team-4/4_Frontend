import type { SVGProps } from "react";
export function CalendarIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="1em"
      height="1em"
      fill="currentColor"
      viewBox="0 0 18 18"
      {...props}
    >
      <path
        fill="currentColor"
        d="M13 0v1.8H5V0H3v1.8H2C.89 1.8.01 2.61.01 3.6L0 16.2c0 .99.89 1.8 2 1.8h14c1.1 0 2-.81 2-1.8V3.6c0-.99-.9-1.8-2-1.8h-1V0zm3 16.2H2V6.3h14z"
      />
    </svg>
  );
}
