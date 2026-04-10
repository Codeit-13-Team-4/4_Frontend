"use client";

import { ProjectCardProps, POSITION_LABELS } from "@/features/projects/model";
import { useRouter } from "next/navigation";
import { Crown } from "@/shared/icons";
import MyProjectStatusBadge from "./MyProjectStatusBadge";
import { DeadlineBadge, LikeButton } from "@/shared/ui";
import MyProjectCardButton from "./MyProjectCardButton";
import { useToggleMyProjectLike } from "@/features/mypage/hooks/useToggleMyProjectLike";
import { MyRoleType } from "@/features/mypage/model/mypage.types";

interface MyProjectCardProps {
  data: ProjectCardProps;
  role: MyRoleType;
}

export default function MyProjectCard({ data, role }: MyProjectCardProps) {
  const router = useRouter();
  const { mutate: toggleLike } = useToggleMyProjectLike(data.id);

  const handleCardClick = () => router.push(`/projects/${data.id}`);

  const positionText = data.positions.map((p) => POSITION_LABELS[p]).join(", ");

  return (
    <article
      onClick={handleCardClick}
      className="flex w-full cursor-pointer flex-col rounded-[20px] border border-gray-700 bg-gray-800 px-5 pt-6 pb-5"
    >
      {/* 상태배지, 찜하기 */}
      <header className="mb-4 flex items-center justify-between">
        <MyProjectStatusBadge
          role={role}
          status={data.status}
          applicationStatus={data.applicationStatus}
        />
        <div
          className="flex items-center gap-2"
          onClick={(e) => e.stopPropagation()}
        >
          {data.isHost ? (
            <Crown />
          ) : (
            <LikeButton
              onToggle={() => toggleLike(data.liked)}
              liked={data.liked}
            />
          )}
        </div>
      </header>

      {/* 제목 */}
      <h4 className="mb-7 line-clamp-1 text-lg font-semibold text-gray-50">
        {data.title}
      </h4>

      {/* 정보 */}
      <div className="mb-4 flex flex-col gap-3 text-sm">
        <div className="flex items-center gap-2">
          <span className="shrink-0 text-gray-400">모집 마감일</span>
          <span className="text-gray-200">{data.recruitEndDate}</span>
          <DeadlineBadge endDate={data.recruitEndDate} className="px-2 py-1" />
        </div>
        <div className="flex items-center gap-2">
          <span className="shrink-0 text-gray-400">지원 포지션</span>
          <span className="truncate text-gray-200">{positionText}</span>
        </div>
        <div className="flex items-center gap-2">
          <span className="shrink-0 text-gray-400">진행 기간</span>
          <span className="text-gray-200">
            {data.projectStartDate} ~ {data.projectEndDate}
          </span>
        </div>
        <div className="flex items-center gap-2">
          <span className="shrink-0 text-gray-400">참여 인원</span>
          <span className="text-gray-200">
            {data.currentMembers}/{data.maxMembers}
          </span>
        </div>
      </div>

      {/* 버튼 */}
      <footer className="mt-auto pt-4">
        <MyProjectCardButton
          status={data.status}
          applicationStatus={data.applicationStatus}
          isHost={data.isHost}
        />
      </footer>
    </article>
  );
}
