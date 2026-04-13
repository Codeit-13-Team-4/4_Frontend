import { fetchClient } from "@/shared/lib/client/fetchClient";
import { VerificationsFilter } from "../model/verifications.type";

const createSearchParams = (filters: VerificationsFilter) => {
  const { status, page, limit } = filters;
  const params = new URLSearchParams({
    page: String(page ?? 1),
    limit: String(limit ?? 10),
    status: status ?? "PENDING",
  });

  if (status) params.set("status", status);

  return params;
};

export async function getVerificationsList({
  challengeId,
  filters,
}: {
  challengeId: number;
  filters: VerificationsFilter;
}) {
  const response = await fetchClient(
    `/api/challenges/${challengeId}/verifications?${createSearchParams(filters)}`,
  );
  return response.json();
}
