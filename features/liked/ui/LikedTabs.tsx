"use client";

import Link from "next/link";
import { useMemo } from "react";
import { useSearchParams } from "next/navigation";
import { cn } from "@/shared/utils";

const PROJECT_TAB_VALUE = "project";

export function LikedTabs() {
  const searchParams = useSearchParams();
  const searchParamsString = searchParams.toString();
  const { challengeHref, projectHref, isProject } = useMemo(() => {
    const currentParams = new URLSearchParams(searchParamsString);
    const challengeParams = new URLSearchParams(searchParamsString);
    const projectParams = new URLSearchParams(searchParamsString);
    const isProject = currentParams.get("tab") === PROJECT_TAB_VALUE;

    challengeParams.delete("tab");
    challengeParams.delete("projectType");
    challengeParams.delete("positions");
    challengeParams.delete("status");
    challengeParams.delete("order");

    projectParams.set("tab", PROJECT_TAB_VALUE);
    projectParams.delete("participationType");
    projectParams.delete("status");
    projectParams.delete("order");

    const challengeQuery = challengeParams.toString();
    const projectQuery = projectParams.toString();

    return {
      challengeHref: challengeQuery ? `/liked?${challengeQuery}` : "/liked",
      projectHref: projectQuery ? `/liked?${projectQuery}` : "/liked",
      isProject,
    };
  }, [searchParamsString]);
  const isChallenge = !isProject;

  return (
    <div className="w-full border-b border-gray-700">
      <div className="-mb-px flex w-full md:w-fit">
        <Link
          href={challengeHref}
          className={cn(
            "inline-flex flex-1 justify-center border-b-2 border-transparent pb-4 text-[16px] font-semibold transition-colors md:w-[159px] md:flex-none",
            isChallenge
              ? "border-mint-700 text-mint-700"
              : "text-gray-600 hover:text-gray-600",
          )}
        >
          챌린지
        </Link>

        <Link
          href={projectHref}
          className={cn(
            "inline-flex flex-1 justify-center border-b-2 border-transparent pb-4 text-[16px] font-semibold transition-colors md:w-[159px] md:flex-none",
            isProject
              ? "border-mint-700 text-mint-700"
              : "text-gray-600 hover:text-gray-600",
          )}
        >
          프로젝트
        </Link>
      </div>
    </div>
  );
}
