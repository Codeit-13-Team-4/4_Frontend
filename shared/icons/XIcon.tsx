import * as React from "react";
import type { SVGProps } from "react";
const SvgXIcon = (props: SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="1em"
    height="1em"
    fill="none"
    viewBox="0 0 10 10"
    {...props}
  >
    <path
      stroke="#94A3B8"
      strokeLinecap="round"
      strokeWidth={1.4}
      d="m.7.7 8 8M8.7.7l-8 8"
    />
  </svg>
);
export default SvgXIcon;
