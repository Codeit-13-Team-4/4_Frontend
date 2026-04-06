import * as React from "react";
import type { SVGProps } from "react";
const SvgChevronUpIcon = (props: SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="1em"
    height="1em"
    fill="none"
    viewBox="0 0 20 20"
    {...props}
  >
    <path
      stroke="#E2E8F0"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="m5 13 5-5 5 5"
    />
  </svg>
);
export default SvgChevronUpIcon;
