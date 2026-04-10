"use client";

import { useRouter } from "next/navigation";
import { useUserData } from "@/features/auth/hooks/queries/useUserData";
import { useOpenAlertModal } from "@/shared/store/AlertModal";

export function useLikeLoginGuard() {
  const router = useRouter();
  const { data: userData } = useUserData();
  const openAlertModal = useOpenAlertModal();

  return (onAuthenticated: () => void) => {
    if (!userData) {
      openAlertModal({
        title: "로그인이 필요합니다",
        description: "좋아요 기능은 로그인 후 이용할 수 있습니다.",
        positive: {
          text: "로그인하기",
          button: { type: "default", variant: "primary" },
        },
        negative: { text: "취소" },
        onPositive: () => router.push("/login"),
      });
      return;
    }

    onAuthenticated();
  };
}
