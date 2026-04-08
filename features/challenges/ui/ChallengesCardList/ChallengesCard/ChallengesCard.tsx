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
import { useToggleChallengeLike } from "@/features/challengesDetail/hooks/useToggleChallengeLike";
import { useOpenAlertModal } from "@/shared/store/AlertModal";

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
    isLiked,
    isJoinable,
    // joinButtonLabel,
    isMember,
    isHost,
    myParticipationStatus,
  } = data;

  const router = useRouter();

  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [alertOpen, setAlertOpen] = useState<boolean>(false);
  const [confirmAlertOpen, setConfirmAlertOpen] = useState<boolean>(false);
  const openAlertModal = useOpenAlertModal();
  const { data: userData } = useUserData();
  const { mutate: toggleLike } = useToggleChallengeLike(id);

  const handleOpen = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (!userData) {
      router.push("/login");
      return;
    }
    setIsOpen(true);
  };

  const handleLikeToggle = () => {
    if (!userData) {
      openAlertModal({
        title: "로그인이 필요합니다",
        description: "좋아요 기능은 로그인 후 이용할 수 있습니다.",
        positive: {
          text: "로그인하기",
          button: { type: "default", variant: "primary" },
        },
        negative: { text: "취소" },
        onPositive: () => router.push("/login"),
      });
      return;
    }
    toggleLike(isLiked);
  };

  const handleCardClick = () => {
    if (isOpen || alertOpen || confirmAlertOpen) return;
    router.push(`/challenges/${id}`);
  };
  const handleClose = () => {
    setIsOpen(false);
  };

  const badgeStatus =
    CHALLENGES_STATUS[status].value === "recruiting"
      ? "recruiting"
      : "recruitment_closed";

  return (
    <article
      onClick={handleCardClick}
      className="flex h-90.5 w-full cursor-pointer flex-col rounded-[20px] border-2 border-gray-700 bg-gray-800 px-5 pt-8 pb-5"
    >
      <header className="mb-7 flex items-center justify-between">
        <div className="flex gap-2">
          <StatusBadge status={badgeStatus} />
          <ChallengesBadge type={participationType} />
        </div>
        <div
          onClick={(e) => {
            e.stopPropagation();
          }}
        >
          <LikeButton liked={isLiked} onToggle={handleLikeToggle} />
        </div>
      </header>
      <div className="mb-7 flex flex-col">
        <section className="flex flex-col">
          <div className="mb-2 flex items-center justify-between gap-1">
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
          disabled={
            status !== "RECRUITING" ||
            isHost ||
            isMember ||
            !isJoinable ||
            myParticipationStatus === "PENDING"
          }
        >
          {isMember
            ? "참여중"
            : myParticipationStatus === "PENDING"
              ? "승인 대기중"
              : "참여하기"}
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
