import Image from "next/image";
import { TECH_STACK } from "@/features/mypage/model/mypage.constants";

export function ProfileSkillBadge({ skill }: { skill: string }) {
  const tech = TECH_STACK[skill];

  if (!tech) {
    return (
      <div className="inline-flex items-center gap-1.5 rounded-sm bg-gray-700 px-1.5 py-1 md:gap-2 md:px-2">
        <span className="text-xs text-gray-200 md:text-[14px]">{skill}</span>
      </div>
    );
  }

  return (
    <div className="inline-flex items-center gap-1.5 rounded-sm bg-gray-700 px-1.5 py-1 md:gap-2 md:px-2">
      <Image src={tech.icon} alt={tech.label} width={16} height={16} />
      <span className="text-xs text-gray-200 md:text-[14px]">{tech.label}</span>
    </div>
  );
}
