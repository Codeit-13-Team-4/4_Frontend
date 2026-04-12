import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createProjectsDetailComment } from "@/features/projectsDetail/api/createProjectsDetailComment";
import { projectKeys } from "@/features/projects/model/projects.queryKey";

export function useCreateProjectsDetailComment(projectId: number) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (content: string) =>
      createProjectsDetailComment({ projectId, content }),
    meta: {
      successMessage: "댓글이 작성되었습니다.",
      errorMessage: {
        404: "존재하지 않는 프로젝트입니다.",
        409: "이미 작성한 댓글입니다.",
      },
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: projectKeys.comments(projectId),
      });
    },
  });
}
