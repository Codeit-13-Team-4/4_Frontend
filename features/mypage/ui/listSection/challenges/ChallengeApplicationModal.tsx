"use client";

import { useState } from "react";
import { Modal } from "@/shared/ui/Modal/Modal";
import { Avatar, AvatarImage, AvatarFallback } from "@/shared/ui";
import { Check, XIcon, ChevronDownIcon, AvatarIcon } from "@/shared/icons";
import { useChallengeApplications } from "@/features/mypage/hooks/useChallengeApplications";
import { useApproveChallengeApplication } from "@/features/mypage/hooks/useApproveChallengeApplication";
import { ChallengeApplication } from "@/features/mypage/model/mypage.types";
import ChallengeRejectionModal from "./ChallengeRejectionModal";

interface ChallengeApplicationModalProps {
  challengeId: number;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export default function ChallengeApplicationModal({
  challengeId,
  open,
  onOpenChange,
}: ChallengeApplicationModalProps) {
  const [rejectTarget, setRejectTarget] = useState<ChallengeApplication | null>(
    null,
  );
  const [expandedId, setExpandedId] = useState<number | null>(null);

  const { data, isLoading } = useChallengeApplications(challengeId, open);
  const { mutate: approve } = useApproveChallengeApplication(challengeId);

  const applications = data?.data ?? [];

  return (
    <div onClick={(e) => e.stopPropagation()}>
      <Modal open={open} onOpenChange={onOpenChange}>
        <Modal.Content className="gap-0 p-10" aria-describedby={undefined}>
          <Modal.Header className="mb-6 flex-row items-center justify-between">
            <Modal.Title>신청자 목록</Modal.Title>
            <Modal.CloseIcon />
          </Modal.Header>

          <Modal.Body scrollbarClassName="mr-[-8px]">
            {isLoading ? (
              <div className="py-8 text-center text-sm text-gray-400">
                불러오는 중...
              </div>
            ) : applications.length === 0 ? (
              <div className="py-8 text-center text-sm text-gray-400">
                신청자가 없습니다.
              </div>
            ) : (
              <ul className="flex flex-col gap-3 pr-3">
                {applications.map((application) => {
                  const isExpanded = expandedId === application.id;
                  return (
                    <li
                      key={application.id}
                      className="rounded-xl border border-gray-700 bg-gray-900"
                    >
                      {/* 이름 행 */}
                      <div className="flex items-center gap-3 px-4 py-3">
                        <Avatar size="sm">
                          <AvatarImage
                            src={application.user?.profileImageUrl ?? ""}
                            alt={application.user?.nickname ?? application.name}
                          />
                          <AvatarFallback delayMs={0}>
                            <AvatarIcon
                              width={20}
                              height={20}
                              className="h-full w-full text-gray-800"
                            />
                          </AvatarFallback>
                        </Avatar>
                        <span className="flex-1 text-sm font-medium text-gray-50">
                          {application.user?.nickname ?? application.name}
                        </span>

                        {/* 승인/거절 버튼 */}
                        {application.status === "PENDING" && (
                          <div className="flex items-center gap-2">
                            <button
                              type="button"
                              aria-label="승인"
                              onClick={() => approve(application.id)}
                              className="flex h-7 w-7 cursor-pointer items-center justify-center rounded-full text-green-400 transition-colors hover:bg-green-400/10"
                            >
                              <Check width={20} height={20} />
                            </button>
                            <button
                              type="button"
                              aria-label="거절"
                              onClick={() => setRejectTarget(application)}
                              className="flex h-7 w-7 cursor-pointer items-center justify-center rounded-full text-red-400 transition-colors hover:bg-red-400/10"
                            >
                              <XIcon width={16} height={16} />
                            </button>
                          </div>
                        )}

                        {application.status === "APPROVED" && (
                          <span className="text-xs font-medium text-green-400">
                            승인됨
                          </span>
                        )}

                        {application.status === "REJECTED" && (
                          <span className="text-xs font-medium text-red-400">
                            거절됨
                          </span>
                        )}
                      </div>

                      {/* 신청 사유 드롭다운 트리거 */}
                      <button
                        type="button"
                        onClick={() =>
                          setExpandedId(isExpanded ? null : application.id)
                        }
                        className="flex w-full cursor-pointer items-center justify-between border-t border-gray-700 px-4 py-2.5 text-left text-sm text-gray-400 transition-colors hover:bg-gray-800"
                      >
                        <span>신청 사유</span>
                        <ChevronDownIcon
                          width={16}
                          height={16}
                          className="transition-transform duration-200"
                          style={{
                            transform: isExpanded
                              ? "rotate(180deg)"
                              : "rotate(0deg)",
                          }}
                        />
                      </button>

                      {/* 신청 사유 내용 */}
                      {isExpanded && (
                        <div className="border-t border-gray-700 px-4 py-3 text-sm text-gray-300">
                          {application.motivation || "신청 사유 없음"}
                        </div>
                      )}
                    </li>
                  );
                })}
              </ul>
            )}
          </Modal.Body>
        </Modal.Content>
      </Modal>

      {rejectTarget && (
        <ChallengeRejectionModal
          challengeId={challengeId}
          application={rejectTarget}
          open={!!rejectTarget}
          onOpenChange={(open) => {
            if (!open) setRejectTarget(null);
          }}
        />
      )}
    </div>
  );
}
