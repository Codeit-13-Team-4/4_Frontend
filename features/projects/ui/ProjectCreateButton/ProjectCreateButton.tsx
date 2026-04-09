"use client";
import {
  buildCurrentPath,
  buildLoginPath,
} from "@/features/auth/lib/authRedirect";
import { useUserData } from "@/features/auth/hooks/queries/useUserData";
import { PlusIcon } from "@/shared/icons";
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
      <PlusIcon width={14} height={14} />
      <span className={`${circle ? "hidden" : ""}`}>프로젝트 개설</span>
    </Button>
  );
}
