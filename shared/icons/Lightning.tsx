import * as React from "react";
import type { SVGProps } from "react";
const SvgLightning = (props: SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="1em"
    height="1em"
    fill="none"
    viewBox="0 0 24 24"
    {...props}
  >
    <path fill="#38C4FF" d="M11 15H6l7-14v8h5l-7 14z" />
  </svg>
);
export default SvgLightning;
