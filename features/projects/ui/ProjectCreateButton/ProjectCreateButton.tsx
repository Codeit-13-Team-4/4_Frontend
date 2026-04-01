"use client";
import { useUserData } from "@/features/auth/hooks/queries/useUserData";
import { Button } from "@/shared/ui";
import { useRouter } from "next/navigation";

export function ProjectCreateButton() {
  const { data: userData } = useUserData();

  const router = useRouter();
  const handleClick = () => {
    if (!userData) {
      router.push("/login");
      return;
    }
    router.push("/projects/create");
  };

  return (
    <Button variant="primary" className="p-3" onClick={handleClick}>
      + 프로젝트 개설
    </Button>
  );
}
