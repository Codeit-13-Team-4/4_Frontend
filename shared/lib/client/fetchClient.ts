import { ApiError } from "@/shared/lib/errors/ApiError";
import { getErrorMessage } from "@/shared/lib/errors/errorMessage";

export async function fetchClient(
  input: RequestInfo,
  init?: RequestInit,
): Promise<Response> {
  const response = await fetch(input, init);

  if (!response.ok) {
    const data = await response.json().catch(() => null);
    throw new ApiError(
      response.status,
      getErrorMessage(response.status, data?.message),

    );
  }

  return response;
}
