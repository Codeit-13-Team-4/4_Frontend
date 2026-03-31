export async function deleteProjectsDetail(projectId: number): Promise<void> {
  const response = await fetch(`/api/projects/${projectId}`, {
    method: "DELETE",
  });

  if (!response.ok) {
    const data = await response.json();
    throw new Error(data.message || "프로젝트 삭제에 실패했습니다.");
  }
}
