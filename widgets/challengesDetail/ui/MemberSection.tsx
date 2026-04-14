"use client";

import { MemberPanel } from "@/features/challenges/detail/ui/MemberPanel";

interface MemberSectionProps {
  challengeId: number;
  isHost: boolean;
}

export default function MemberSection({
  challengeId,
  isHost,
}: MemberSectionProps) {
  return (
    <section id="member-section" className="mt-8 lg:mt-0">
      <MemberPanel
        challengeId={challengeId}
        isHost={isHost}
        className="rounded-[20px] border border-gray-700 bg-gray-800 px-5 py-6"
      />
    </section>
  );
}
