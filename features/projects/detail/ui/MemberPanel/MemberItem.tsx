"use client";

import { Avatar, AvatarImage, AvatarFallback } from "@/shared/ui";
import { AvatarIcon, Crown, XIcon } from "@/shared/icons";
import type { ProjectMemberList } from "@/features/projects/model";

interface MemberItemProps {
  member: ProjectMemberList;
  isHost: boolean;
  onKick?: (userId: number) => void;
  isPending?: boolean;
}

export default function MemberItem({
  member,
  isHost,
  onKick,
  isPending,
}: MemberItemProps) {
  const isHostMember = member.memberType === "HOST";

  return (
    <div className="flex items-center gap-3 py-2">
      <div className="shrink-0">
        <Avatar size="sm">
          <AvatarImage
            src={member.user.profileImageUrl ?? ""}
            alt={member.user.nickname}
          />
          <AvatarFallback delayMs={0}>
            <AvatarIcon
              width={20}
              height={20}
              className="h-full w-full text-gray-800"
            />
          </AvatarFallback>
        </Avatar>
      </div>

      <div className="flex min-w-0 flex-1 flex-col">
        <span className="truncate text-sm font-medium text-gray-200">
          {member.user.nickname}
        </span>
      </div>

      {isHostMember && <Crown width={20} height={20} />}

      {isHost && !isHostMember && onKick && (
        <button
          type="button"
          aria-label={`${member.user.nickname} 내보내기`}
          disabled={isPending}
          onClick={() => onKick(member.userId)}
          className="shrink-0 rounded p-1 text-gray-500 transition-colors hover:text-red-400 disabled:opacity-50"
        >
          <XIcon width={14} height={14} />
        </button>
      )}
    </div>
  );
}
