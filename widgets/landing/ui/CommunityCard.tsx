"use client";

import { AvatarIcon } from "@/shared/icons";

interface CommunityCardProps {
  name: string;
  date: string;
  content: string;
}

export default function CommunityCard({
  name,
  date,
  content,
}: CommunityCardProps) {
  return (
    <article className="rounded-[20px] bg-[#16233d] px-6 py-5">
      <div className="mb-5 flex items-center gap-3">
        <div className="flex h-14 w-14 items-center justify-center">
          <AvatarIcon width={56} height={56} className="text-transparent" />
        </div>

        <div>
          <p className="text-sm font-semibold text-[#dbe7ff]">{name}</p>
          <p className="mt-1 text-xs text-[#6f809f]">{date}</p>
        </div>
      </div>

      <p className="text-base leading-8 whitespace-pre-line text-[#e7eefc]">
        {content}
      </p>
    </article>
  );
}
