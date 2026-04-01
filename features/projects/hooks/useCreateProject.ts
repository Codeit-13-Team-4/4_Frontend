"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createSideProject } from "../api/createSideProject";

export const useCreateProject = (onSuccess: () => void) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: createSideProject,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["projectList"] });
      onSuccess();
    },
  });
};
