"use client";

import { useState } from "react";
import { useForm, FormProvider } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { format } from "date-fns";
import { Modal, Button } from "@/shared/ui";
import { useOpenAlertModal } from "@/shared/store/AlertModal";
import { useUpdateChallengesDetail } from "@/features/challenges/detail/hooks/useUpdateChallengesDetail";
import type { ChallengesDetail } from "@/features/challenges/detail/model/challengesDetail";
import { EditChallengeBasicTab } from "./EditChallengeBasicTab";
import { EditChallengeScheduleTab } from "./EditChallengeScheduleTab";
import { editChallengeSchema, type EditChallengeFormValues } from "./types";

const TABS = ["기본 정보", "일정 및 상세"] as const;

interface EditChallengeModalProps {
  challenge: ChallengesDetail;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function EditChallengeModal({
  challenge,
  open,
  onOpenChange,
}: EditChallengeModalProps) {
  const [activeTab, setActiveTab] = useState<0 | 1>(0);
  const { mutate: updateChallenge, isPending } = useUpdateChallengesDetail(
    challenge.id,
  );

  const methods = useForm<EditChallengeFormValues>({
    resolver: zodResolver(editChallengeSchema),
    defaultValues: {
      title: challenge.title,
      description: challenge.description,
      tags: challenge.tags,
      verificationMethod: challenge.verificationMethod,
      verificationFrequency: challenge.verificationFrequency,
      joinType: challenge.joinType,
      recruitDeadline: challenge.recruitDeadline
        ? new Date(challenge.recruitDeadline)
        : undefined,
      challengeDateRange: {
        from: challenge.startDate ? new Date(challenge.startDate) : undefined,
        to: challenge.endDate ? new Date(challenge.endDate) : undefined,
      },
      maxParticipants: challenge.maxParticipants,
    },
  });

  const {
    handleSubmit,
    formState: { dirtyFields, isDirty },
    reset,
  } = methods;

  const openAlertModal = useOpenAlertModal();

  const onSubmit = (data: EditChallengeFormValues) => {
    const payload: Record<string, unknown> = {};

    if (dirtyFields.title) payload.title = data.title;
    if (dirtyFields.description) payload.description = data.description;
    if (dirtyFields.tags) payload.tags = data.tags;
    if (dirtyFields.verificationMethod)
      payload.verificationMethod = data.verificationMethod;
    if (dirtyFields.verificationFrequency)
      payload.verificationFrequency = data.verificationFrequency;
    if (dirtyFields.joinType) payload.joinType = data.joinType;
    if (dirtyFields.recruitDeadline && data.recruitDeadline) {
      payload.recruitDeadline = format(data.recruitDeadline, "yyyy-MM-dd");
    }
    if (dirtyFields.challengeDateRange) {
      if (data.challengeDateRange.from) {
        payload.startDate = format(data.challengeDateRange.from, "yyyy-MM-dd");
      }
      if (data.challengeDateRange.to) {
        payload.endDate = format(data.challengeDateRange.to, "yyyy-MM-dd");
      }
    }
    if (dirtyFields.maxParticipants)
      payload.maxParticipants = data.maxParticipants;

    updateChallenge(payload as Parameters<typeof updateChallenge>[0], {
      onSuccess: () => {
        reset();
        setActiveTab(0);
        onOpenChange(false);
      },
    });
  };

  const handleClose = () => {
    if (!isDirty) {
      reset();
      setActiveTab(0);
      onOpenChange(false);
      return;
    }

    openAlertModal({
      title: "수정을 중단하고 나가시겠어요?",
      description: "지금 나가면 변경된 수정 내용이 저장되지 않고 사라져요.",
      negative: { text: "나가기" },
      positive: {
        text: "이어서 수정하기",
        button: { type: "default", variant: "primary" },
      },
      onNegative: () => {
        reset();
        setActiveTab(0);
        onOpenChange(false);
      },
    });
  };

  return (
    <Modal open={open} onOpenChange={onOpenChange}>
      <Modal.Content>
        <Modal.Description className="sr-only">
          챌린지 정보를 수정하고 저장할 수 있는 창입니다.
        </Modal.Description>
        <Modal.Header>
          <div className="flex items-center justify-between">
            <Modal.Title className="sr-only">챌린지 수정</Modal.Title>
            <button
              type="button"
              onClick={handleClose}
              className="ml-auto h-6 cursor-pointer p-0 text-gray-400 hover:text-white"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M18 6 6 18" />
                <path d="m6 6 12 12" />
              </svg>
            </button>
          </div>

          {/* 탭 */}
          <div className="flex">
            {TABS.map((tab, index) => (
              <button
                key={tab}
                type="button"
                onClick={() => setActiveTab(index as 0 | 1)}
                className={`flex-1 cursor-pointer py-4 text-xl font-semibold transition-colors ${
                  activeTab === index
                    ? "border-mint-700 text-mint-500 border-b"
                    : "border-b border-gray-700 text-gray-600"
                }`}
              >
                {tab}
              </button>
            ))}
          </div>
        </Modal.Header>

        <FormProvider {...methods}>
          <form onSubmit={handleSubmit(onSubmit)} className="contents">
            <Modal.Body scrollbarClassName="translate-x-[23px]">
              {activeTab === 0 ? (
                <EditChallengeBasicTab />
              ) : (
                <EditChallengeScheduleTab />
              )}
            </Modal.Body>

            <Modal.Footer>
              <Button
                type="button"
                variant="default"
                size="md"
                className="flex-1"
                onClick={handleClose}
              >
                취소
              </Button>
              <Button
                type="submit"
                variant="primary"
                size="md"
                className="flex-1"
                disabled={isPending}
              >
                수정 완료
              </Button>
            </Modal.Footer>
          </form>
        </FormProvider>
      </Modal.Content>
    </Modal>
  );
}
