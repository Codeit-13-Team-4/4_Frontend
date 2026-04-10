import type { SVGProps } from "react";
export function List(props: SVGProps<SVGSVGElement>) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      stroke="currentColor"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      className="list_svg__lucide list_svg__lucide-list-icon list_svg__lucide-list"
      viewBox="0 0 24 24"
      {...props}
    >
      <path d="M3 5h.01M3 12h.01M3 19h.01M8 5h13M8 12h13M8 19h13" />
    </svg>
  );
}
