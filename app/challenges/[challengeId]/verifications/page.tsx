import { getMeServer } from "@/features/auth/api/getMeServer";
import { buildLoginPath } from "@/features/auth/lib/authRedirect";
import { getChallengesDetailServer } from "@/features/challenges/detail/api/getChallengesDetail.server";
import { VerificationsListSection } from "@/features/challenges/verifications/ui/VerificationsListSection/VerificationsListSection";
import { VerificationsMemberSection } from "@/features/challenges/verifications/ui/VerificationsMemberSection/VerificationsMemberSection";
import { ChevronLeftIcon } from "@/shared/icons";
import Link from "next/link";
import { redirect } from "next/navigation";
import { VerificationsToast } from "@/features/challenges/verifications/ui/VerificationsToast";

export default async function VerificationsPage({
  params,
}: {
  params: Promise<{ challengeId: string }>;
}) {
  const { challengeId } = await params;
  const userData = await getMeServer();
  const data = await getChallengesDetailServer(Number(challengeId));

  if (!userData) {
    return redirect(buildLoginPath(`/challenges/${challengeId}/verifications`));
  }

  if (data?.isMember === false) {
    return (
      <VerificationsToast
        isMember={data.isMember}
        challengeId={Number(challengeId)}
      />
    );
  }

  return (
    <div>
      <header className="flex items-center gap-3 pb-10">
        <Link href={`/challenges/${challengeId}`}>
          <ChevronLeftIcon
            width={20}
            height={20}
            className="h-4 w-4 text-gray-200 md:h-5 md:w-5"
          />
        </Link>
        <h2 className="text-[18px] font-semibold text-gray-50 md:text-[30px]">
          {data.title}
        </h2>
      </header>
      <VerificationsMemberSection data={data} />
      <VerificationsListSection isHost={data.isHost} />
    </div>
  );
}
