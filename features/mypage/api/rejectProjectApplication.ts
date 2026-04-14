import { fetchClient } from "@/shared/lib/client/fetchClient";
import { ApplicationRejectionType } from "../model/mypage.types";

type RejectProjectApplicationParams = {
  applicationId: number;
  rejectionType: ApplicationRejectionType;
  rejectionText: string;
};

export default async function rejectProjectApplication({
  applicationId,
  rejectionType,
  rejectionText,
}: RejectProjectApplicationParams) {
  const response = await fetchClient(
    `/api/projects/applications/${applicationId}/reject`,
    {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ rejectionType, rejectionText }),
    },
  );
  return response.json();
}
