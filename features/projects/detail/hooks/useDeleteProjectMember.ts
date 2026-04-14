import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteProjectMember } from "../api/deleteProjectMember";
import { projectKeys } from "@/features/projects/model";

export function useDeleteProjectMember(projectId: number) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (targetUserId: number) =>
      deleteProjectMember({ projectId, targetUserId }),
    meta: { successMessage: "멤버를 내보냈습니다." },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: projectKeys.members(projectId),
      });
      queryClient.invalidateQueries({
        queryKey: projectKeys.detail(projectId),
      });
    },
  });
}
