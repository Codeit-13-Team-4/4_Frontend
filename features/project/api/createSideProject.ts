export async function createSideProject() {
  const response = await fetch("/api/project/create", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      title: "프로젝트 타입 필수값 체크입니다.",
      description: "테스트에용",
      projectType: "PORTFOLIO",
      techStacks: ["JavaScript"],
      positions: ["PM", "FE"],
      maxMembers: 2,
      recruitEndDate: "2026-03-30",
      projectStartDate: "2026-03-26",
      projectEndDate: "2026-05-01",
      contactMethod: "KAKAO_OPEN_CHAT",
      contactLink: "string",
    }),
  });

  if (!response.ok) {
    throw new Error(
      `사이드 프로젝트 생성을 실패했습니다. (${response.status})`,
    );
  }

  const data = await response.json();

  return data;
}
