import VerifyCard from "@/features/challengesVerify/ui/VerifyCard";
import { VerifyMemberSection } from "@/features/challengesVerify/ui/VerifyMemberSection/VerifyMemberSection";
import { ChevronLeftIcon } from "@/shared/icons";

import Link from "next/link";

export default async function VerifyPage({
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
      <VerifyMemberSection />
      <h3 className="mt-11 mb-7 text-[24px] text-gray-50">실시간 인증 현황</h3>
      <div className="grid grid-cols-3">
        <VerifyCard />
      </div>
    </div>
  );
}
