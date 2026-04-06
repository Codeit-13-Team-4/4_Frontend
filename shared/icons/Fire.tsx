import * as React from "react";
import type { SVGProps } from "react";
const SvgFire = (props: SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="1em"
    height="1em"
    fill="none"
    viewBox="0 0 18 18"
    {...props}
  >
    <path
      stroke="#58677D"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={1.5}
      d="M4.5 7.275a6 6 0 1 0 7.8-1.05Q12 9 9 9.75q2.25-4.5-1.5-9 0 3.75-3 6.525"
    />
  </svg>
);
export default SvgFire;
