"use client";
import {
  DeadlineBadge,
  GradientButton,
  LikeButton,
  Progress,
  StatusBadge,
} from "@/shared/ui";
import Image from "next/image";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { useUserData } from "@/features/auth/hooks/queries/useUserData";
import {
  ChallengeCardProps,
  CHALLENGES_STATUS,
  VERIFICATION_FREQUENCY_LABEL,
} from "@/features/challenges/model";
import {
  ChallengesApplyModal,
  ChallengesBadge,
} from "@/features/challenges/ui";

export function ChallengesCard({ data }: { data: ChallengeCardProps }) {
  const {
    id,
    title,
    // host,
    status,
    participationType,
    tags,
    verificationFrequency,
    // startDate,
    // endDate,
    recruitDeadline,
    // daysLeft,
    participantCount,
    maxParticipants,
    // progressRate,
    viewCount,
    commentCount,
    isBookmarked,
    // isJoinable,
    // joinButtonLabel,
    // isMember,
    isHost,
  } = data;

  const router = useRouter();

  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [alertOpen, setAlertOpen] = useState<boolean>(false);
  const [confirmAlertOpen, setConfirmAlertOpen] = useState<boolean>(false);

  const { data: userData } = useUserData();

  const handleOpen = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (!userData) {
      router.push("/login");
      return;
    }
    setIsOpen(true);
  };

  const handleCardClick = () => {
    if (isOpen || alertOpen || confirmAlertOpen) return;
    router.push(`/challenges/${id}`);
  };
  const handleClose = () => {
    setIsOpen(false);
  };

  const badgeStatus = CHALLENGES_STATUS[status].value;

  return (
    <article
      onClick={handleCardClick}
      className="flex h-90.5 w-104.5 cursor-pointer flex-col rounded-[20px] border-2 border-gray-700 bg-gray-800 px-5 pt-8 pb-5 md:w-85.5 lg:w-104.5"
    >
      <header className="mb-7 flex items-center justify-between">
        <div className="flex gap-2">
          <StatusBadge status={badgeStatus} />
          <ChallengesBadge type={participationType} />
        </div>

        <LikeButton liked={isBookmarked} onToggle={() => {}} />
      </header>
      <div className="mb-7 flex flex-col">
        <section className="flex flex-col">
          <div className="mb-2 flex items-center justify-between">
            <h4 className="line-clamp-1 text-[20px] text-gray-50 lg:line-clamp-2">
              {title}
            </h4>
            <DeadlineBadge
              endDate={recruitDeadline}
              className="self-start text-nowrap"
            />
          </div>
          <ul className="flex gap-3 text-[14px] text-gray-400">
            {tags.map((item) => (
              <li key={item}>#{item}</li>
            ))}
          </ul>
        </section>
      </div>
      <section className="mb-5 flex gap-2">
        <span className="text-[16px] text-gray-400">인증 주기</span>
        <span>{VERIFICATION_FREQUENCY_LABEL[verificationFrequency]}</span>
      </section>
      <section className="flex items-center gap-2">
        <span className="text-[16px] text-gray-400">참여인원</span>
        <Progress
          value={participantCount}
          max={maxParticipants}
          className="flex-1"
        />
        <p className="text-sm text-gray-400">
          <span className="text-mint-500">{participantCount}</span> /
          <span>{maxParticipants}</span>
        </p>
      </section>
      <footer className="mt-auto flex justify-between">
        <div className="flex gap-6">
          <div className="flex items-center gap-1.25">
            <Image
              src="/icons/common/visibility_on-icon.svg"
              alt=""
              width={24}
              height={24}
            />
            <span className="text-[14px] text-gray-400">{viewCount}</span>
          </div>
          <div className="flex items-center gap-1.25">
            <Image
              src="/icons/common/comment-icon.svg"
              alt=""
              width={24}
              height={24}
            />
            <span className="text-[14px] text-gray-400">{commentCount}</span>
          </div>
        </div>

        <GradientButton
          size="sm"
          onClick={handleOpen}
          disabled={status !== "RECRUITING" || !isHost}
        >
          참여하기
        </GradientButton>
        {userData && (
          <ChallengesApplyModal
            isOpen={isOpen}
            setIsOpen={setIsOpen}
            onClose={handleClose}
            challengeId={id}
            alertOpen={alertOpen}
            setAlertOpen={setAlertOpen}
            confirmAlertOpen={confirmAlertOpen}
            setConfirmAlertOpen={setConfirmAlertOpen}
            name={userData.nickname}
            participationType={participationType}
          />
        )}
      </footer>
    </article>
  );
}
