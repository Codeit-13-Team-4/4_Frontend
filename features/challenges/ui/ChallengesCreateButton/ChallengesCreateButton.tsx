"use client";
import { useUserData } from "@/features/auth/hooks/queries/useUserData";
import { PlusIcon } from "@/shared/icons";
import { Button } from "@/shared/ui";
import { useRouter } from "next/navigation";

export function ChallengesCreateButton({ circle }: { circle?: boolean }) {
  const { data: userData } = useUserData();

  const router = useRouter();
  const handleClick = () => {
    if (!userData) {
      router.push("/login");
      return;
    }
    router.push("/challenges/create");
  };

  return (
    <Button
      variant="primary"
      className={`p-3 ${circle ? "fixed right-4 bottom-6 z-99 h-12 w-12 rounded-full" : ""}`}
      onClick={handleClick}
    >
      <PlusIcon width={14} height={14} />
      <span className={`${circle ? "hidden" : ""}`}>챌린지 개설</span>
    </Button>
  );
}
