"use client";
import { AvatarIcon, Check, Meetballs, XIcon } from "@/shared/icons";
import { Dropdown } from "@/shared/ui";
import { useEffect, useRef, useState } from "react";
import { toast } from "sonner";
import { VerificationCardProps } from "@/features/challengesVerifications/model";
import { useGetVerificationsDetail } from "../../hook/useGetVerificationsDetail";
import Image from "next/image";
import { formatToDate } from "../../utils/formatToDate";

const isHost = true;
export default function VerifyCard({ data }: { data: VerificationCardProps }) {
  const { verificationId, challengeId } = data;

  // console.log("🚀 ~ VerifyCard ~ challengeId:", challengeId);
  // console.log("🚀 ~ VerifyCard ~ verificationId:", verificationId);

  const [isOverflow, setIsOverflow] = useState(false);
  const [expanded, setExpanded] = useState(false);
  const contentRef = useRef<HTMLDivElement>(null);

  const { data: verificationData } = useGetVerificationsDetail({
    challengeId,
    verificationId,
  });
  // console.log("🚀 ~ VerifyCard ~ verificationData:", verificationData);

  const { content, user, imageUrls, createdAt } = verificationData?.data ?? {};

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
    console.log("승인");

    toast.success("인증이 승인되었습니다", {
      action: (
        <button
          className="ml-auto cursor-pointer text-gray-400"
          onClick={() => console.log("Action!")}
        >
          실행 취소
        </button>
      ),
    });
  };

  const handleReject = () => {
    console.log("거절");

    toast.error("인증이 거절되었습니다", {
      action: (
        <button
          className="ml-auto cursor-pointer text-gray-400"
          onClick={() => console.log("Action!")}
        >
          실행 취소
        </button>
      ),
    });
  };

  return (
    <div className="flex max-h-150 w-full flex-col gap-10 rounded-[20px] border border-gray-700 bg-gray-800 px-5 pt-10 pb-5">
      <div className="flex items-center justify-center gap-1.5">
        <AvatarIcon className="text-gray-800" width={52} height={52} />

        <div className="flex w-full items-center">
          <div className="flex flex-col">
            <span className="text-gray-400">{user?.nickname}</span>
            <span className="text-gray-600">
              {createdAt && formatToDate(createdAt)}
            </span>
          </div>
          <div className="ml-auto flex">
            {isHost ? (
              <div className="flex items-center gap-6">
                <button onClick={handleApprove} className="cursor-pointer">
                  <Check className="text-mint-500" width={24} height={24} />
                </button>
                <button onClick={handleReject} className="cursor-pointer">
                  <XIcon className="text-error" width={18} height={18} />
                </button>
              </div>
            ) : (
              <Dropdown>
                <Dropdown.Trigger>
                  <button type="button" aria-label="인증 메뉴">
                    <Meetballs
                      width={24}
                      height={24}
                      className="text-gray-400"
                    />
                  </button>
                </Dropdown.Trigger>
                <Dropdown.Content
                  align="end"
                  className="min-w-24 border-gray-700 bg-gray-800 text-sm text-gray-200"
                >
                  <Dropdown.Item className="px-3 py-2 hover:bg-gray-900">
                    수정
                  </Dropdown.Item>
                  <Dropdown.Item className="px-3 py-2 text-red-400 hover:bg-gray-900">
                    삭제
                  </Dropdown.Item>
                </Dropdown.Content>
              </Dropdown>
            )}
          </div>
        </div>
      </div>
      <div className="relative aspect-4/3 overflow-hidden rounded-[40px] bg-red-50">
        {imageUrls?.length > 0 && imageUrls[0] ? (
          <Image
            src="https://devup-bucket.s3.ap-northeast-2.amazonaws.com/13/a4b98e21-69c4-451e-9f9b-da9b9389cfa6.jpg"
            alt="인증이미지"
            fill
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
    </div>
  );
}
