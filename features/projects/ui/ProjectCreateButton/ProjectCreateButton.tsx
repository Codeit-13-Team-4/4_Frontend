"use client";
import {
  buildCurrentPath,
  buildLoginPath,
} from "@/features/auth/lib/authRedirect";
import { useUserData } from "@/features/auth/hooks/queries/useUserData";
import { Button } from "@/shared/ui";
import { usePathname, useRouter, useSearchParams } from "next/navigation";

export function ProjectCreateButton({ circle }: { circle?: boolean }) {
  const { data: userData } = useUserData();

  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const loginPath = buildLoginPath(buildCurrentPath(pathname, searchParams));

  const handleClick = () => {
    if (!userData) {
      router.push(loginPath);
      return;
    }
    router.push("/projects/create");
  };

  return (
    <Button
      variant="primary"
      className={`p-3 ${circle ? "fixed right-4 bottom-6 z-99 h-12 w-12 rounded-full" : ""}`}
      onClick={handleClick}
    >
      <svg
        width="14"
        height="14"
        viewBox="0 0 14 14"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M0.75 6.75H12.75"
          stroke="#F8FAFC"
          strokeWidth="1.5"
          strokeLinecap="round"
        />
        <path
          d="M6.75 12.75L6.75 0.75"
          stroke="#F8FAFC"
          strokeWidth="1.5"
          strokeLinecap="round"
        />
      </svg>
      <span className={`${circle ? "hidden" : ""}`}>프로젝트 개설</span>
    </Button>
  );
}
