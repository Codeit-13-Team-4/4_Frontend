import type { SVGProps } from "react";
export function Menu(props: SVGProps<SVGSVGElement>) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="1em"
      height="1em"
      fill="currentColor"
      viewBox="0 0 24 24"
      {...props}
    >
      <path
        fill="currentColor"
        d="M4 18a.97.97 0 0 1-.712-.288A.97.97 0 0 1 3 17q0-.424.288-.712A.97.97 0 0 1 4 16h16q.424 0 .712.288.288.287.288.712 0 .424-.288.712A.97.97 0 0 1 20 18zm0-5a.97.97 0 0 1-.712-.287A.97.97 0 0 1 3 12q0-.424.288-.713A.97.97 0 0 1 4 11h16q.424 0 .712.287.288.288.288.713 0 .424-.288.713A.97.97 0 0 1 20 13zm0-5a.97.97 0 0 1-.712-.287A.97.97 0 0 1 3 7q0-.424.288-.713A.97.97 0 0 1 4 6h16q.424 0 .712.287Q21 6.576 21 7q0 .424-.288.713A.97.97 0 0 1 20 8z"
      />
    </svg>
  );
}
