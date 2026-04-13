"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createSideProject } from "../api/createSideProject";
import { ProjectCardProps, projectKeys } from "@/features/projects/model";

export const useCreateProject = (
  onSuccess: (data: ProjectCardProps) => void,
) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: createSideProject,
    meta: { successMessage: "프로젝트 생성에 성공했습니다." },
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: projectKeys.lists() });
      onSuccess(data);
    },
  });
};
