"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createSideProject } from "../api/createSideProject";
import { ProjectCardProps } from "../model";
import { projectKeys } from "@/features/projects/model/projects.queryKey";

export const useCreateProject = (
  onSuccess: (data: ProjectCardProps) => void,
) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: createSideProject,
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: projectKeys.lists() });
      onSuccess(data);
    },
  });
};
