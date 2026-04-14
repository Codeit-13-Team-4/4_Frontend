import { fetchClient } from "@/shared/lib/client/fetchClient";
import { ReasonCategoryType } from "../model/mypage.types";

type RejectChallengeApplicationParams = {
  applicationId: number;
  reasonCategory: ReasonCategoryType;
  reasonDetail: string;
};

export default async function rejectChallengeApplication({
  applicationId,
  reasonCategory,
  reasonDetail,
}: RejectChallengeApplicationParams) {
  const response = await fetchClient(
    `/api/challenges/applications/${applicationId}/reject`,
    {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ reasonCategory, reasonDetail }),
    },
  );
  return response.json();
}
