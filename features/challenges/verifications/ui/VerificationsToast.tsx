"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { buildLoginPath } from "@/features/auth/lib/authRedirect";

export function VerificationsToast({
  isMember,
  challengeId,
}: {
  isMember: boolean;
  challengeId: number;
}) {
  const router = useRouter();

  useEffect(() => {
    if (!isMember) {
      toast.error("멤버만 이용이 가능합니다.");
      router.replace(buildLoginPath(`/challenges/${challengeId}`));
    }
  }, [isMember, challengeId, router]);

  return null;
}
