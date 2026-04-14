"use client";

import { MemberPanel } from "@/features/projects/detail/ui/MemberPanel";

interface MemberSectionProps {
  projectId: number;
  isHost: boolean;
}

export default function MemberSection({
  projectId,
  isHost,
}: MemberSectionProps) {
  return (
    <section id="member-section" className="mt-8 lg:mt-0">
      <MemberPanel
        projectId={projectId}
        isHost={isHost}
        className="rounded-[20px] border border-gray-700 bg-gray-800 px-5 py-6"
      />
    </section>
  );
}
