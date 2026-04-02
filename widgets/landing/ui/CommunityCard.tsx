"use client";

import Image from "next/image";

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
    <article className="h-[220px] rounded-[20px] bg-[#16233d] p-6">
      <div className="mb-5 flex items-start gap-6">
        <div className="flex h-14 w-14 items-center justify-center">
          <Image
            src="/landing/user-icon.svg"
            alt="User"
            width={56}
            height={56}
          />
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
