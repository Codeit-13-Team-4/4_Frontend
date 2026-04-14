"use client";

import { useChallengeMembers } from "@/features/challenges/detail/hooks/useChallengeMembers";
import { useDeleteChallengeMember } from "@/features/challenges/detail/hooks/useDeleteChallengeMember";
import { useUserData } from "@/features/auth/hooks/queries/useUserData";
import { useOpenAlertModal } from "@/shared/store/AlertModal";
import { People } from "@/shared/icons";
import { ScrollArea } from "@/shared/ui";
import MemberItem from "./MemberItem";
import MemberItemSkeleton from "./MemberItemSkeleton";

interface MemberPanelProps {
  challengeId: number;
  isHost: boolean;
  className?: string;
}

export default function MemberPanel({
  challengeId,
  isHost,
  className,
}: MemberPanelProps) {
  const { data: user } = useUserData();
  const isLoggedIn = !!user;

  const { data } = useChallengeMembers(challengeId, { enabled: isLoggedIn });
  const { mutate: kickMember, isPending } =
    useDeleteChallengeMember(challengeId);
  const openAlertModal = useOpenAlertModal();

  function handleKick(userId: number, nickname: string) {
    openAlertModal({
      title: `${nickname}님을 내보내시겠습니까?`,
      description: "내보낸 멤버는 챌린지에서 제외됩니다.",
      positive: {
        text: "내보내기",
        button: { type: "default", variant: "destructive" },
      },
      negative: { text: "취소" },
      onPositive: () => kickMember(userId),
    });
  }

  return (
    <div className={className}>
      <h3 className="mb-3 flex items-center gap-1.5 text-sm font-semibold text-gray-400">
        <People width={18} height={18} />
        <span className="text-mint-700">{data ? data.total : ""}</span>
      </h3>
      {!isLoggedIn ? (
        <p className="py-4 text-center text-sm text-gray-500">
          로그인 후 멤버 목록을 확인할 수 있습니다.
        </p>
      ) : (
        <ScrollArea
          scrollbarClassName="translate-x-3"
          viewportClassName="max-h-75"
        >
          <div className="flex flex-col">
            {data
              ? data.data.map((member) => (
                  <MemberItem
                    key={member.id}
                    member={member}
                    isHost={isHost}
                    onKick={(userId) =>
                      handleKick(userId, member.user.nickname)
                    }
                    isPending={isPending}
                  />
                ))
              : Array.from({ length: 3 }).map((_, i) => (
                  <MemberItemSkeleton key={i} />
                ))}
          </div>
        </ScrollArea>
      )}
    </div>
  );
}
