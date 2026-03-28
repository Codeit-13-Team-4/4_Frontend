const BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;

export async function createSideProject() {
  let token; //지워야함
  const response = await fetch(`${BASE_URL}/projects`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({
      title: "테스트 카드1",
      description: "2026.03.26 사이드 프로젝트 post api 테스트입니다.",
      projectType: "SIDE_PROJECT",
      techStacks: ["Javascript"],
      difficulty: "BEGINNER",
      meetingType: "ONLINE",
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
