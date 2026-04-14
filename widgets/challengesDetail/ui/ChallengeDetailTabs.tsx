"use client";

import { useEffect, useRef, useState } from "react";
import { useInView } from "react-intersection-observer";
import { cn } from "@/shared/utils";
import {
  CHALLENGE_DETAIL_TABS,
  type TabId,
} from "@/features/challenges/detail/model/challengeDetailTabs.constants";

export default function ChallengeDetailTabs() {
  const [activeTab, setActiveTab] = useState<TabId>("detail");
  const isClickScrolling = useRef(false);

  const { ref: detailRef } = useInView({
    threshold: 0.2,
    onChange: (inView) => {
      if (!isClickScrolling.current && inView) setActiveTab("detail");
    },
  });
  const { ref: memberRef } = useInView({
    threshold: 0.2,
    onChange: (inView) => {
      if (!isClickScrolling.current && inView) setActiveTab("member");
    },
  });
  const { ref: commentRef } = useInView({
    threshold: 0.1,
    onChange: (inView) => {
      if (!isClickScrolling.current && inView) setActiveTab("comment");
    },
  });

  useEffect(() => {
    const detailEl = document.getElementById("detail-section");
    const memberEl = document.getElementById("member-section");
    const commentEl = document.getElementById("comment-section");
    if (detailEl) detailRef(detailEl);
    if (memberEl) memberRef(memberEl);
    if (commentEl) commentRef(commentEl);
  }, [detailRef, memberRef, commentRef]);

  function handleTabClick(tab: (typeof CHALLENGE_DETAIL_TABS)[number]) {
    isClickScrolling.current = true;
    setActiveTab(tab.id);

    const el = document.getElementById(tab.sectionId);
    el?.scrollIntoView({ behavior: "smooth", block: "start" });

    setTimeout(() => {
      isClickScrolling.current = false;
    }, 700);
  }

  return (
    <div className="sticky top-0 z-10 flex border-b border-gray-700 bg-gray-800 lg:hidden">
      {CHALLENGE_DETAIL_TABS.map((tab) => (
        <button
          key={tab.id}
          type="button"
          onClick={() => handleTabClick(tab)}
          className={cn(
            "flex-1 py-3 text-sm font-medium transition-colors",
            activeTab === tab.id
              ? "border-mint-500 text-mint-500 border-b-2 bg-gray-900"
              : "text-gray-400 hover:text-gray-200",
          )}
        >
          {tab.label}
        </button>
      ))}
    </div>
  );
}
