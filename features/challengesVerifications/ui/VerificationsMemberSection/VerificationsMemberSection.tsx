"use client";
import { AvatarIcon, Crown, People } from "@/shared/icons";
import { Button, Progress } from "@/shared/ui";
import { MemberProgressBar } from "./MemberProgressBar";
import { useState } from "react";
import { VerificationsModal } from "../VerificationsModal/VerificationsModal";
import Image from "next/image";
import { useGetVerificationsMember } from "../../hook/useGetVerificationsMember";
import { useGetVerificationsMemberPermissions } from "../../hook/useGetVerificationsMemberPermissions";
import { ChallengesDetail } from "@/features/challenges/detail/model/challengesDetail";

export function VerificationsMemberSection({
  data,
}: {
  data: ChallengesDetail;
}) {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const {
    host,
    isHost,
    id: challengeId,
    progressRate,
    participantCount,
  } = data;

  const { data: memberData } = useGetVerificationsMember(challengeId);
  const { data: memberPermissions } =
    useGetVerificationsMemberPermissions(challengeId);

  return (
    <section className="grid gap-5 md:h-90 md:grid-cols-[0.8fr_1fr]">
      <div className="flex flex-col gap-5 rounded-[20px] bg-gray-800 p-5">
        <div className="flex flex-col items-center justify-center gap-4 pt-5">
          {host.profileImageUrl ? (
            <Image
              src={host.profileImageUrl}
              alt="호스트 프로필 이미지"
              width={120}
              height={120}
              className="rounded-full"
            />
          ) : (
            <AvatarIcon width={120} height={120} className="text-gray-800" />
          )}

          <span className="flex gap-1 text-[24px] font-semibold">
            {host.nickname} <span>{isHost ? <Crown /> : null}</span>
          </span>
        </div>
        <div>
          <span className="text-gray-600">달성률</span>
          <div className="flex items-center gap-4">
            <Progress value={progressRate} max={100} />

            <span className="text-nowrap text-gray-600">
              <span className="text-mint-500 text-[18px]">{progressRate}</span>%
            </span>
          </div>
        </div>

        <Button
          variant="primary"
          disabled={!memberPermissions?.canCreate}
          className="mt-auto w-full"
          onClick={() => setIsOpen(true)}
        >
          {memberPermissions?.canCreate ? "오늘 인증하기" : "오늘 인증완료"}
        </Button>
      </div>
      <div className="overflow-hidden rounded-[20px] bg-gray-800 p-5">
        <div className="mb-7 flex items-center justify-between pt-2">
          <div className="flex items-center gap-2">
            <People className="text-gray-400" width={28} height={28} />
            <span className="text-[18px] text-gray-300">
              {participantCount}
            </span>
          </div>
          <div className="flex gap-2">
            <span className="text-gray-200">인증 완료 멤버</span>
            <span className="text-gray-300">
              <span className="text-mint-500">5</span> / {participantCount}
            </span>
          </div>
        </div>
        <div className="custom-scrollbar flex max-h-70 flex-col gap-4 overflow-y-scroll pr-4">
          {memberData?.data?.map((member) => {
            return <MemberProgressBar data={member} key={member.id} />;
          })}
        </div>
      </div>
      <VerificationsModal
        open={isOpen}
        setIsOpen={setIsOpen}
        onOpenChange={() => setIsOpen(false)}
        challengeId={challengeId}
      />
    </section>
  );
}
