"use client";

import { useState } from "react";
import { User } from "@/shared/types/user";
import { ProfileJobBadge } from "@/features/mypage/ui/profileSection/ProfileJobBadge";

type ProfileInfoProps = {
  nickname: User["nickname"];
  jobLabel: User["jobLabel"] | null;
  bio: User["bio"];
};

export default function ProfileInfo({
  nickname,
  jobLabel,
  bio,
}: ProfileInfoProps) {
  const [expanded, setExpanded] = useState(false);

  return (
    <div className="flex flex-col gap-2">
      <div className="flex items-center justify-center gap-2 md:justify-start">
        <h2 className="text-lg font-bold text-gray-50 md:text-xl">
          {nickname}
        </h2>
        {jobLabel && <ProfileJobBadge jobLabel={jobLabel} />}
      </div>
      {bio ? (
        <div className="text-sm text-gray-400 md:text-base">
          <p className={expanded ? "" : "line-clamp-1 md:line-clamp-none"}>
            {bio}
          </p>
          <button
            onClick={() => setExpanded((prev) => !prev)}
            className="mt-1 text-sm text-gray-600 hover:cursor-pointer md:hidden"
          >
            {expanded ? "접기" : "더보기"}
          </button>
        </div>
      ) : (
        <p className="text-sm text-gray-600">자기소개를 작성해주세요.</p>
      )}
    </div>
  );
}
