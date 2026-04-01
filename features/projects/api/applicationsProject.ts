import { PositionType } from "../model";

type applyProjectProps = {
  projectId: string;
  position: PositionType;
  motivation: string;
};

export async function applicationsProject({
  projectId,
  position,
  motivation,
}: applyProjectProps) {
  const response = await fetch(`api/projects/applications`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ projectId, position, motivation }),
  });

  if (response.status === 409) {
    const error = await response.json();

    throw { status: 409, message: error.message };
  }

  if (!response.ok) {
    throw new Error(
      `사이드 프로젝트 지원을 실패했습니다. (${response.status})`,
    );
  }

  return response.json();
}
