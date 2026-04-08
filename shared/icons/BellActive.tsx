import type { SVGProps } from "react";
export function BellActive(props: SVGProps<SVGSVGElement>) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="1em"
      height="1em"
      fill="none"
      viewBox="0 0 20 20"
      {...props}
    >
      <path
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M15 6.667c0 2.575.649 4.338 1.375 5.504.612.984.918 1.476.907 1.613-.013.152-.045.21-.168.3-.11.083-.608.083-1.605.083H4.49c-.997 0-1.495 0-1.606-.082-.122-.091-.154-.149-.167-.301-.011-.137.295-.629.907-1.613.726-1.166 1.375-2.93 1.375-5.504a5 5 0 0 1 5-5M7.794 17.5a3.32 3.32 0 0 0 2.205.833 3.32 3.32 0 0 0 2.205-.833"
      />
      <circle cx={14.166} cy={2.5} r={2.5} fill="#00D7A0" />
    </svg>
  );
}
