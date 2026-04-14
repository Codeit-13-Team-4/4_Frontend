import { fetchClient } from "@/shared/lib/client/fetchClient";
import { ChallengeApplicationProps } from "../model/mypage.types";

type GetChallengeApplicationsParams = {
  challengeId: number;
  start?: number;
  perPage?: number;
};

export default async function getChallengeApplications({
  challengeId,
  start = 0,
  perPage = 50,
}: GetChallengeApplicationsParams): Promise<ChallengeApplicationProps> {
  const searchParams = new URLSearchParams({
    start: String(start),
    perPage: String(perPage),
  });

  const response = await fetchClient(
    `/api/challenges/${challengeId}/applications?${searchParams}`,
  );
  return response.json();
}
