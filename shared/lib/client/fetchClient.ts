import { ApiError } from "@/shared/lib/errors/ApiError";

export async function fetchClient(
  input: RequestInfo,
  init?: RequestInit,
): Promise<Response> {
  const response = await fetch(input, init);

  if (!response.ok) {
    const data = await response.json().catch(() => null);
    throw new ApiError(
      response.status,
      data?.message ?? "요청에 실패했습니다.",
      typeof data?.code === "string" ? data.code : null,
    );
  }

  return response;
}
