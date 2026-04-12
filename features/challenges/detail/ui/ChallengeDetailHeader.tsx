"use client";

import { useRouter } from "next/navigation";
import { Avatar, AvatarFallback, AvatarImage, Separator } from "@/shared/ui";
import {
  ChallengesJoinTypeBadge,
  ChallengesStatusBadge,
} from "@/features/challenges/ui";
import type { ChallengesDetail } from "@/features/challenges/detail/model/challengesDetail";
import { ArrowLeft, AvatarIcon, CommentIcon, Eyeopen } from "@/shared/icons";
import { formatDate } from "@/shared/utils";

interface ChallengeDetailHeaderProps {
  challenge: ChallengesDetail;
}

export default function ChallengeDetailHeader({
  challenge,
}: ChallengeDetailHeaderProps) {
  const router = useRouter();

  return (
    <div className="flex flex-col gap-3">
      <button
        onClick={() => router.back()}
        aria-label="뒤로가기"
        className="my-10 flex w-fit cursor-pointer items-center gap-1 text-sm text-gray-400 transition-colors hover:text-gray-200"
      >
        <ArrowLeft className="h-6 w-6 md:h-8 md:w-8" />
      </button>

      <div className="flex gap-2">
        <ChallengesStatusBadge status={challenge.status} />
        <ChallengesJoinTypeBadge type={challenge.joinType} />
      </div>

      <h1 className="flex text-xl font-medium md:text-3xl md:font-semibold">
        {challenge.title}
      </h1>

      {challenge.tags.length > 0 && (
        <ul className="mb-10 flex flex-wrap gap-3 text-sm text-gray-400 md:mb-15">
          {challenge.tags.map((tag) => (
            <li key={tag}>#{tag}</li>
          ))}
        </ul>
      )}

      <div className="flex flex-col justify-between gap-3 md:flex-row">
        <div className="flex items-center gap-5">
          <div className="flex items-center gap-2">
            <Avatar className="h-6 w-6 md:h-11 md:w-11">
              <AvatarFallback>
                <AvatarImage
                  src={challenge.host.profileImageUrl ?? ""}
                  alt="주최자 프로필"
                />
                <AvatarIcon className="h-full w-full text-gray-800" />
              </AvatarFallback>
            </Avatar>
            <span className="text-sm font-medium md:text-base">
              {challenge.host.nickname}
            </span>
          </div>

          <Separator
            orientation="vertical"
            className="h-6 bg-gray-700 md:h-9"
          />

          <span className="text-xs font-medium text-gray-400 md:text-sm md:font-normal">
            {formatDate(new Date(challenge.createdAt))}
          </span>
        </div>

        <div className="flex items-center gap-3 text-xs font-medium text-gray-400 md:gap-6 md:text-sm">
          <div className="flex items-center gap-1">
            <Eyeopen className="h-4 w-4 md:h-6 md:w-6" />
            <span>{challenge.viewCount}</span>
          </div>

          <div className="flex items-center gap-1 text-xs font-medium md:text-sm">
            <CommentIcon className="h-4 w-4 md:h-6 md:w-6" />
            <span>{challenge.commentCount}</span>
          </div>
        </div>
      </div>
    </div>
  );
}
