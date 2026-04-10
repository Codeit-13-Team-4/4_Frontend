"use client";

import { useEffect } from "react";
import { useInView } from "react-intersection-observer";
import { MyRoleType } from "@/features/mypage/model/mypage.types";
import { useGetMyProjects } from "@/features/mypage/hooks/useGetMyProjects";
import MyProjectCard from "./MyProjectCard";
import MyProjectCardSkeleton from "./MyProjectCardSkeleton";
import MyProjectEmpty from "./MyProjectEmpty";
import { Spinner } from "@/shared/ui";

interface MyProjectListProps {
  role: MyRoleType;
  status: string;
}

export default function MyProjectList({ role, status }: MyProjectListProps) {
  const { data, fetchNextPage, hasNextPage, isFetchingNextPage, isLoading } =
    useGetMyProjects(role, status);

  const { ref, inView } = useInView();

  useEffect(() => {
    if (inView && hasNextPage && !isFetchingNextPage) {
      fetchNextPage();
    }
  }, [inView, hasNextPage, isFetchingNextPage, fetchNextPage]);

  const projects = data?.pages.flatMap((page) => page.data) ?? [];

  if (isLoading) {
    return (
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
        {Array.from({ length: 6 }).map((_, i) => (
          <MyProjectCardSkeleton key={i} />
        ))}
      </div>
    );
  }

  if (projects.length === 0) {
    return <MyProjectEmpty />;
  }

  return (
    <div>
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
        {projects.map((project) => (
          <MyProjectCard key={project.id} data={project} role={role} />
        ))}
      </div>

      <div ref={ref} className="py-4">
        {isFetchingNextPage && (
          <div className="flex justify-center">
            <Spinner size="md" className="text-mint-500" />
          </div>
        )}
      </div>
    </div>
  );
}
