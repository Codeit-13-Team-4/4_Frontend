import * as React from "react";
import type { SVGProps } from "react";
const SvgClock = (props: SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="1em"
    height="1em"
    fill="none"
    viewBox="0 0 18 18"
    {...props}
  >
    <g clipPath="url(#clock_svg__a)">
      <path
        fill="#58677D"
        d="M15.75 9a6.75 6.75 0 1 0-13.5 0 6.75 6.75 0 0 0 13.5 0m-7.5-4.5a.75.75 0 0 1 1.5 0v4.036l2.585 1.293a.75.75 0 0 1-.67 1.342l-3-1.5A.75.75 0 0 1 8.25 9zm9 4.5A8.25 8.25 0 1 1 .75 9a8.25 8.25 0 0 1 16.5 0"
      />
    </g>
    <defs>
      <clipPath id="clock_svg__a">
        <path fill="#fff" d="M0 0h18v18H0z" />
      </clipPath>
    </defs>
  </svg>
);
export default SvgClock;
