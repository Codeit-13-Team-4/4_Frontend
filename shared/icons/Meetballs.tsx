import * as React from "react";
import type { SVGProps } from "react";
const SvgMeetballs = (props: SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="1em"
    height="1em"
    fill="none"
    viewBox="0 0 24 24"
    {...props}
  >
    <circle cx={6.149} cy={12.291} r={1.5} fill="#A4A4A4" />
    <circle cx={12.149} cy={12.291} r={1.5} fill="#A4A4A4" />
    <circle cx={18.149} cy={12.291} r={1.5} fill="#A4A4A4" />
  </svg>
);
export default SvgMeetballs;
