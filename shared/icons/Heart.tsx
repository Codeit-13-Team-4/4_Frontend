import type { SVGProps } from "react";
export function Heart(props: SVGProps<SVGSVGElement>) {
  return (
    <svg
      width="40"
      height="40"
      viewBox="0 0 40 40"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <rect width="40" height="40" rx="20" fill="#58677D" />
      <path
        d="M10 18.2448C10 23.1078 14.02 25.6988 16.962 28.0188C18 28.8368 19 29.6078 20 29.6078C21 29.6078 22 28.8378 23.038 28.0178C25.981 25.6998 30 23.1078 30 18.2458C30 13.3838 24.5 9.9328 20 14.6088C15.5 9.9328 10 13.3818 10 18.2448Z"
        fill="#94A3B8"
      />
    </svg>
  );
}
