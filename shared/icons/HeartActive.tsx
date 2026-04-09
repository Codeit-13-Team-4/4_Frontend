import type { SVGProps } from "react";
export function HeartActive(props: SVGProps<SVGSVGElement>) {
  return (
    <svg
      width="40"
      height="40"
      viewBox="0 0 40 40"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <rect
        width="40"
        height="40"
        rx="20"
        fill="url(#paint0_linear_21360_95415)"
      />
      <path
        d="M10 18.2448C10 23.1078 14.02 25.6988 16.962 28.0188C18 28.8368 19 29.6078 20 29.6078C21 29.6078 22 28.8378 23.038 28.0178C25.981 25.6998 30 23.1078 30 18.2458C30 13.3838 24.5 9.9328 20 14.6088C15.5 9.9328 10 13.3818 10 18.2448Z"
        fill="#F8FAFC"
      />
      <defs>
        <linearGradient
          id="paint0_linear_21360_95415"
          x1="0"
          y1="19.9999"
          x2="40"
          y2="19.9999"
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor="#00D7A0" />
          <stop offset="1" stopColor="#38C4FF" />
        </linearGradient>
      </defs>
    </svg>
  );
}
