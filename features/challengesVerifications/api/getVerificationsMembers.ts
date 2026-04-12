import { fetchClient } from "@/shared/lib/client/fetchClient";
import { GetVerificationMembersResponse } from "../model";

export async function getVerificationsMembers(
  challengeId: number,
  { start = 1, perPage = 10 }: { start?: number; perPage?: number } = {},
): Promise<GetVerificationMembersResponse> {
  const query = new URLSearchParams();

  query.set("start", String(start));
  query.set("perPage", String(perPage));

  const response = await fetchClient(
    `/api/challenges/${challengeId}/verifications/members?${query.toString()}`,
  );

  return response.json();
}
