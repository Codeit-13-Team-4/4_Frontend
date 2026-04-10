import { VerificationsListSection } from "@/features/challengesVerifications/ui/VerificationsListSection/VerificationsListSection";
import { VerificationsMemberSection } from "@/features/challengesVerifications/ui/VerificationsMemberSection/VerificationsMemberSection";
import { ChevronLeftIcon } from "@/shared/icons";
import Link from "next/link";

export default async function VerificationsPage({
  params,
}: {
  params: Promise<{ challengeId: string }>;
}) {
  const { challengeId } = await params;

  return (
    <div>
      <header className="flex items-center gap-3 pb-10">
        <Link href={`/challenges/${challengeId}`}>
          <ChevronLeftIcon width={20} height={20} className="text-gray-200" />
        </Link>
        <h2 className="text-[30px] font-semibold text-gray-50">
          챌린지의 제목
        </h2>
      </header>
      <VerificationsMemberSection />
      <VerificationsListSection />
    </div>
  );
}
