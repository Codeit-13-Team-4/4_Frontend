"use client";

import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { cn } from "@/shared/utils";

export function LikedTabs() {
  const searchParams = useSearchParams();
  const isProject = searchParams.get("tab") === "project";
  const challengeParams = new URLSearchParams(searchParams.toString());
  const projectParams = new URLSearchParams(searchParams.toString());

  challengeParams.delete("tab");
  challengeParams.delete("projectType");
  challengeParams.delete("positions");
  challengeParams.delete("status");
  challengeParams.delete("order");
  projectParams.set("tab", "project");
  projectParams.delete("participationType");
  projectParams.delete("status");
  projectParams.delete("order");

  const challengeQuery = challengeParams.toString();
  const projectQuery = projectParams.toString();
  const challengeHref = challengeQuery ? `/liked?${challengeQuery}` : "/liked";
  const projectHref = projectQuery ? `/liked?${projectQuery}` : "/liked";
  const isChallenge = !isProject;

  return (
    <div className="w-full border-b border-gray-700">
      <div className="-mb-px flex gap-6 md:gap-8">
        <Link
          href={challengeHref}
          className={cn(
            "inline-flex border-b-2 border-transparent pb-4 text-[16px] font-semibold transition-colors",
            isChallenge ? "border-mint-500 text-mint-500" : "text-gray-400",
          )}
        >
          챌린지
        </Link>

        <Link
          href={projectHref}
          className={cn(
            "inline-flex border-b-2 border-transparent pb-4 text-[16px] font-semibold transition-colors",
            isProject ? "border-mint-500 text-mint-500" : "text-gray-400",
          )}
        >
          프로젝트
        </Link>
      </div>
    </div>
  );
}
