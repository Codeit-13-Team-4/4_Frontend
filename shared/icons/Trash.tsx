import * as React from "react";
import type { SVGProps } from "react";
const SvgTrash = (props: SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="1em"
    height="1em"
    fill="none"
    viewBox="0 0 18 18"
    {...props}
  >
    <path
      stroke="#F8FAFC"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={1.6}
      d="M2.25 4.5h1.5m0 0h12m-12 0V15a1.5 1.5 0 0 0 1.5 1.5h7.5a1.5 1.5 0 0 0 1.5-1.5V4.5M6 4.5V3a1.5 1.5 0 0 1 1.5-1.5h3A1.5 1.5 0 0 1 12 3v1.5M7.5 8.25v4.5m3-4.5v4.5"
    />
  </svg>
);
export default SvgTrash;
