"use client";

import { useState } from "react";
import { User } from "@/shared/types/user";
import { ProfileSkillBadge } from "@/features/mypage/ui/ProfileSkillBadge";

const MOBILE_MAX = 3;
const DESKTOP_MAX = 10;

type ProfileSkillsProps = {
  skills: User["skills"];
};

export default function ProfileSkills({ skills }: ProfileSkillsProps) {
  const [expanded, setExpanded] = useState(false);

  const mobileHiddenCount = skills.length - MOBILE_MAX;
  const desktopHiddenCount = skills.length - DESKTOP_MAX;

  return (
    <ul className="flex flex-wrap gap-2">
      {skills.map((skill, index) => (
        <li
          key={skill}
          className={
            !expanded && index >= MOBILE_MAX
              ? index >= DESKTOP_MAX
                ? "hidden"
                : "hidden md:block"
              : ""
          }
        >
          <ProfileSkillBadge skill={skill} />
        </li>
      ))}
      {!expanded && (
        <>
          {mobileHiddenCount > 0 && (
            <li className="md:hidden">
              <button
                onClick={() => setExpanded(true)}
                className="inline-flex items-center gap-2 rounded-sm px-2 py-1 text-gray-400 hover:cursor-pointer"
              >
                +{mobileHiddenCount}개 더보기
              </button>
            </li>
          )}
          {desktopHiddenCount > 0 && (
            <li className="hidden md:block">
              <button
                onClick={() => setExpanded(true)}
                className="inline-flex items-center gap-2 rounded-sm px-2 py-1 text-gray-400 hover:cursor-pointer"
              >
                +{desktopHiddenCount}개 더보기
              </button>
            </li>
          )}
        </>
      )}
    </ul>
  );
}
