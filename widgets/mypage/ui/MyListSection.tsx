"use client";

import { useState } from "react";
import MyTabBar from "@/features/mypage/ui/listSection/MyTabBar";
import type { MyTab, MyRoleType } from "@/features/mypage/model/mypage.types";
import MyRoleFilter from "@/features/mypage/ui/listSection/MyRoleFilter";
import MyStatusFilter from "@/features/mypage/ui/listSection/MyStatusFilter";
import {
  MY_CHALLENGE_STATUS_FILTERS,
  MY_PROJECT_STATUS_FILTERS,
} from "@/features/mypage/model/mypage.constants";
import { Separator } from "@/shared/ui";
import MyChallengeList from "@/features/mypage/ui/listSection/challenges/MyChallengeList";

export default function MyListSection() {
  const [tab, setTab] = useState<MyTab>("challenges");
  const [role, setRole] = useState<MyRoleType>("MEMBER");
  const [status, setStatus] = useState("");

  const handleTabChange = (newTab: MyTab) => {
    setTab(newTab);
    setRole("MEMBER");
    setStatus("");
  };

  const handleRoleChange = (newRole: MyRoleType) => {
    setRole(newRole);
    setStatus("");
  };

  return (
    <div className="flex flex-col gap-7 md:gap-10">
      <MyTabBar activeTab={tab} onTabChange={handleTabChange} />

      <div className="flex flex-col gap-8 sm:flex-row sm:items-center sm:gap-5">
        {tab !== "comments" && (
          <MyRoleFilter role={role} onRoleChange={handleRoleChange} />
        )}

        {tab !== "comments" && role !== "PENDING" && (
          <Separator
            orientation="vertical"
            className="hidden h-12 bg-gray-700 sm:block"
          />
        )}

        {tab !== "comments" && role !== "PENDING" && (
          <MyStatusFilter
            status={status}
            onStatusChange={setStatus}
            filters={
              tab === "challenges"
                ? MY_CHALLENGE_STATUS_FILTERS
                : MY_PROJECT_STATUS_FILTERS
            }
          />
        )}
      </div>
      {tab === "challenges" && <MyChallengeList role={role} status={status} />}
      {/* {tab === "projects" && <MyProjectList role={role} status={status} />} */}
      {/* {tab === "comments" && <MyCommentList />} */}
    </div>
  );
}
