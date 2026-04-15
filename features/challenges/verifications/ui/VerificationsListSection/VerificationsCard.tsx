"use client";
import { AvatarIcon, Check, XIcon } from "@/shared/icons";
import { useEffect, useRef, useState } from "react";
import { toast } from "sonner";
import { VerificationCardProps } from "@/features/challenges/verifications/model";
import {
  useGetVerificationsDetail,
  useUpdateVerificationsStatus,
  useDeleteVerifications,
} from "@/features/challenges/verifications/hook";
import Image from "next/image";
import { formatToDate } from "../../utils/formatToDate";
import { VerificationsRejectModal } from "../VerificationsModal/VerificationsRejectModal";
import { VerificationsEditModal } from "../VerificationsModal/VerificationsEditModal";
import { VerificationsStatusDropdown } from "./VerificationsStatusDropdown";
import { useUserData } from "@/features/auth/hooks/queries/useUserData";

export default function VerifyCard({
  data,
  isHost,
}: {
  data: VerificationCardProps;
  isHost: boolean;
}) {
  const { verificationId, challengeId } = data;

  const [isOverflow, setIsOverflow] = useState(false);
  const [expanded, setExpanded] = useState(false);
  const contentRef = useRef<HTMLDivElement>(null);
  const [rejectModalIsOpen, setRejectModalIsOpen] = useState(false);
  const [rejectReason, setRejectReason] = useState("");
  const [editModalIsOpen, setEditModalIsOpen] = useState(false);

  const { data: verificationData } = useGetVerificationsDetail({
    challengeId,
    verificationId,
  });

  const { mutate: updateStatus } = useUpdateVerificationsStatus({
    challengeId,
    verificationId,
  });

  const { mutate: deleteVerification } = useDeleteVerifications({
    challengeId,
    verificationId,
  });

  const { data: me } = useUserData();

  const { content, user, imageUrls, createdAt, status } =
    verificationData?.data ?? {};

  const isOwner = data?.user.id === me?.id;

  useEffect(() => {
    const el = contentRef?.current;
    if (!el) return;

    const observer = new ResizeObserver(() => {
      if (el.scrollHeight > el.clientHeight) {
        setIsOverflow(true);
      }
    });

    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  const handleApprove = () => {
    updateStatus(
      { status: "APPROVED" },
      {
        onSuccess: () => {
          toast.success("인증이 승인되었습니다", {});
        },
      },
    );
  };

  const handleReject = () => {
    updateStatus(
      { status: "REJECTED", message: rejectReason },
      {
        onSuccess: () => {
          toast.error("인증이 거절되었습니다.", {});
        },
      },
    );
  };

  return (
    <div className="flex max-h-150 w-full flex-col gap-10 rounded-[20px] border border-gray-700 bg-gray-800 px-5 pt-10 pb-5">
      <div className="flex items-center gap-1.5">
        <div className="h-13 w-13 overflow-hidden rounded-full">
          {user?.profileImageUrl ? (
            <Image
              src={user.profileImageUrl}
              alt="인증자 프로필 이미지"
              width={52}
              height={52}
              className="h-full w-full object-cover"
              priority
            />
          ) : (
            <AvatarIcon className="text-gray-800" width={52} height={52} />
          )}
        </div>

        <div className="flex flex-1">
          <div className="flex flex-col">
            <span className="text-gray-400">{user?.nickname}</span>
            <span className="text-gray-600">
              {createdAt && formatToDate(createdAt)}
            </span>
          </div>
          <div className="ml-auto flex">
            {isOwner && status === "PENDING" && (
              <div className="flex flex-col items-end gap-2">
                <VerificationsStatusDropdown
                  onEdit={() => setEditModalIsOpen(true)}
                  onDelete={deleteVerification}
                />

                {isHost && (
                  <div className="flex items-center gap-6">
                    <button onClick={handleApprove} aria-label="인증 승인">
                      <Check className="text-mint-500" width={24} height={24} />
                    </button>
                    <button
                      onClick={() => setRejectModalIsOpen(true)}
                      aria-label="인증 거절"
                    >
                      <XIcon className="text-error" width={18} height={18} />
                    </button>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
      <div className="relative aspect-square overflow-hidden rounded-[40px] bg-gray-700">
        {imageUrls?.length > 0 && imageUrls[0] ? (
          <Image
            src={imageUrls[0]}
            alt="인증이미지"
            fill
            sizes="(max-width: 350px) 100vw, 350px"
          />
        ) : (
          <div className="h-full w-full bg-gray-700" />
        )}
      </div>

      <div className="relative">
        <div
          ref={contentRef}
          className={`relative pr-8 leading-6 text-gray-300 ${
            !expanded ? "line-clamp-2" : ""
          }`}
          style={{ maxHeight: !expanded ? "3rem" : "none" }}
        >
          {content}
        </div>
        {isOverflow && (
          <button
            onClick={() => setExpanded(!expanded)}
            className="absolute right-0 bottom-0 mt-1 cursor-pointer text-[14px] font-semibold text-gray-400 hover:text-gray-200"
          >
            {expanded ? "접기" : "더보기"}
          </button>
        )}
      </div>
      <VerificationsRejectModal
        setIsOpen={setRejectModalIsOpen}
        isOpen={rejectModalIsOpen}
        setRejectReason={setRejectReason}
        onSubmit={handleReject}
        rejectReason={rejectReason}
      />
      <VerificationsEditModal
        key={verificationId}
        open={editModalIsOpen}
        onOpenChange={() => setEditModalIsOpen(false)}
        challengeId={challengeId}
        verificationId={verificationId}
        data={verificationData?.data}
      />
    </div>
  );
}
