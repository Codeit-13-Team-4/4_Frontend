"use client";

import { useState } from "react";
import { useForm, FormProvider } from "react-hook-form";
import { format } from "date-fns";
import { Modal, Button } from "@/shared/ui";
import { useOpenAlertModal } from "@/shared/store/AlertModal";
import { useUpdateProjectsDetail } from "@/features/projectsDetail/hooks/useUpdateProjectsDetail";
import type { ProjectDetail } from "@/features/projectsDetail/types/projectsDetail";
import { EditProjectBasicTab } from "./EditProjectBasicTab";
import { EditProjectScheduleTab } from "./EditProjectScheduleTab";
import type { EditFormValues } from "./types";

const TABS = ["기본 정보", "일정 및 상세"] as const;

interface EditProjectModalProps {
  project: ProjectDetail;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function EditProjectModal({
  project,
  open,
  onOpenChange,
}: EditProjectModalProps) {
  const [activeTab, setActiveTab] = useState<0 | 1>(0);
  const { mutate: updateProject, isPending } = useUpdateProjectsDetail(
    project.id,
  );

  const methods = useForm<EditFormValues>({
    defaultValues: {
      projectType: project.projectType,
      title: project.title,
      description: project.description,
      positions: project.positions,
      techStacks: project.techStacks,
      recruitEndDate: project.recruitEndDate
        ? new Date(project.recruitEndDate)
        : undefined,
      projectDateRange: {
        from: project.projectStartDate
          ? new Date(project.projectStartDate)
          : undefined,
        to: project.projectEndDate
          ? new Date(project.projectEndDate)
          : undefined,
      },
      contactMethod: project.contactMethod,
      contactLink: project.contactLink,
      maxMembers: project.maxMembers,
    },
  });

  const {
    handleSubmit,
    formState: { dirtyFields, isDirty },
    reset,
  } = methods;

  const openAlertModal = useOpenAlertModal();

  const onSubmit = (data: EditFormValues) => {
    const payload: Record<string, unknown> = {};

    if (dirtyFields.projectType) payload.projectType = data.projectType;
    if (dirtyFields.title) payload.title = data.title;
    if (dirtyFields.description) payload.description = data.description;
    if (dirtyFields.positions) payload.positions = data.positions;
    if (dirtyFields.techStacks) payload.techStacks = data.techStacks;
    if (dirtyFields.recruitEndDate && data.recruitEndDate) {
      payload.recruitEndDate = format(data.recruitEndDate, "yyyy-MM-dd");
    }
    if (dirtyFields.projectDateRange) {
      if (data.projectDateRange.from) {
        payload.projectStartDate = format(
          data.projectDateRange.from,
          "yyyy-MM-dd",
        );
      }
      if (data.projectDateRange.to) {
        payload.projectEndDate = format(data.projectDateRange.to, "yyyy-MM-dd");
      }
    }
    if (dirtyFields.contactMethod) payload.contactMethod = data.contactMethod;
    if (dirtyFields.contactLink) payload.contactLink = data.contactLink;
    if (dirtyFields.maxMembers) payload.maxMembers = data.maxMembers;

    updateProject(payload as Parameters<typeof updateProject>[0], {
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
          프로필 정보를 수정하고 저장할 수 있는 창입니다.
        </Modal.Description>
        <Modal.Header>
          <div className="flex items-center justify-between">
            <Modal.Title className="sr-only">프로젝트 수정</Modal.Title>
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
                <EditProjectBasicTab />
              ) : (
                <EditProjectScheduleTab />
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
