"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import type { ChallengesDetail } from "@/features/challenges/detail/model/challengesDetail";
import {
  JOIN_BUTTON_CONFIG,
  getJoinButtonKey,
} from "@/features/challenges/detail/model/challengeActionButton.constants";
import { useToggleChallengeLike } from "@/features/challenges/detail/hooks/useToggleChallengeLike";
import { useApplyChallenge } from "@/features/challenges/detail/hooks/useApplyChallenge";
import { useUserData } from "@/features/auth/hooks/queries/useUserData";
import { useLoginGuard } from "@/shared/hooks/useLoginGuard";
import { Button, LikeButton } from "@/shared/ui";
import ChallengeApplyModal from "@/features/challenges/detail/ui/ChallengeApplyModal";

interface ChallengeDetailActionButtonsProps {
  challenge: ChallengesDetail;
}

export default function ChallengeDetailActionButtons({
  challenge,
}: ChallengeDetailActionButtonsProps) {
  const [applyModalOpen, setApplyModalOpen] = useState(false);
  const router = useRouter();
  const { data: userData } = useUserData();
  const withLoginGuard = useLoginGuard();
  const { mutate: toggleLike } = useToggleChallengeLike(challenge.id);
  const { mutate: applyChallenge } = useApplyChallenge(challenge.id);

  const joinKey = getJoinButtonKey(challenge);
  const { label, disabled, variant } = JOIN_BUTTON_CONFIG[joinKey];

  function handleLike() {
    withLoginGuard(
      () => toggleLike(challenge.isLiked),
      "좋아요 기능은 로그인 후 이용할 수 있습니다.",
    );
  }

  function handleJoin() {
    if (joinKey === "isHost") {
      router.push(`/challenges/${challenge.id}/edit`);
      return;
    }
    withLoginGuard(() => {
      if (joinKey === "INSTANT") {
        if (!userData) return;
        applyChallenge(
          { name: userData.nickname, motivation: "" },
          { onSuccess: () => toast.success("챌린지에 참여했습니다.") },
        );
        return;
      }
      if (joinKey === "APPROVAL") {
        setApplyModalOpen(true);
      }
    }, "참여 신청은 로그인 후 이용할 수 있습니다.");
  }

  return (
    <>
      <div className="mt-2 flex items-center gap-3">
        <LikeButton liked={challenge.isLiked} onToggle={handleLike} />
        <Button
          variant={variant}
          disabled={disabled}
          className="flex-1"
          onClick={handleJoin}
        >
          {label}
        </Button>
      </div>

      <ChallengeApplyModal
        challengeId={challenge.id}
        open={applyModalOpen}
        onOpenChange={setApplyModalOpen}
      />
    </>
  );
}
