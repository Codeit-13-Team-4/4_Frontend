"use client";
import Image from "next/image";
import VerificationsCard from "./VerificationsCard";
import { VerificationsSkeletonCard } from "./VerificationsSkeletonCard";
import { useGetVerificationsList } from "../../hook/useGetVerificationsList";
import { VerificationsTabType } from "./VerificationsListSection";
import { useParams } from "next/navigation";
import { useGetVerificationsDetail } from "../../hook/useGetVerificationsDetail";
export function VerificationsCardList({
  status,
}: {
  status: VerificationsTabType;
}) {
  const params = useParams();
  const challengeId = Number(params.challengeId);
  const filters = { status };

  const { data, isLoading, isFetchingNextPage } = useGetVerificationsList(
    challengeId,
    filters,
  );

  const verificationsData =
    data?.pages.flatMap((page) => page.data ?? []) ?? [];

  if (isLoading) {
    return (
      <div className="grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-3">
        {Array.from({ length: 6 }).map((_, index) => (
          <VerificationsSkeletonCard key={index} />
        ))}
      </div>
    );
  }

  if (verificationsData.length === 0)
    return (
      <div className="mt-21 flex flex-col items-center justify-center gap-6 text-gray-400">
        <Image
          src="/images/img_empty.png"
          alt="인증 내역 없음"
          width={120}
          height={70}
        />
        아직 팀원들의 인증 내역이 없어요.
      </div>
    );

  return (
    <div className="grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-3">
      {verificationsData.map((verification) => (
        <VerificationsCard
          key={verification.verificationId}
          data={verification}
        />
      ))}

      {isFetchingNextPage &&
        Array.from({ length: 3 }).map((_, i) => (
          <VerificationsSkeletonCard key={i} />
        ))}
    </div>
  );
}
