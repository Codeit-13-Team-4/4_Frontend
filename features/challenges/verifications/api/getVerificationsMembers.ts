import { fetchClient } from "@/shared/lib/client/fetchClient";
import { GetVerificationMembersResponse } from "../model";

export async function getVerificationsMembers(
  challengeId: number,
  start?: number,
  perPage?: number,
): Promise<GetVerificationMembersResponse> {
  const query = new URLSearchParams();

  query.set("start", String(start ?? 1));
  query.set("perPage", String(perPage ?? 10));

  const response = await fetchClient(
    `/api/challenges/${challengeId}/verifications/members?${query.toString()}`,
  );

  return response.json();
}
