"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { Controller, useForm } from "react-hook-form";

import { ChevronLeftIcon, XIcon } from "@/shared/icons";
import { useUploadImage } from "@/shared/hooks/useUploadImage";
import { useOpenAlertModal } from "@/shared/store/AlertModal";
import { formatDate } from "@/shared/utils";
import {
  Button,
  DatePicker,
  Field,
  FieldError,
  FieldGroup,
  FieldLabel,
  Input,
  RangeBar,
  TiptapEditor,
} from "@/shared/ui";
import {
  POSITION_LABELS,
  PROJECT_TYPE_LABEL,
  projectFormSchema,
  ProjectFormValues,
  PositionType,
} from "@/features/projects/model";
import { CreateAlertModal } from "@/features/projects/create/ui/ProjectCreateModal/CreateAlertModal";
import { ProjectFilterRadioInput } from "@/features/projects/list/ui/ProjectFilter/ProjectFilterRadioInput";
import {
  ProjectContactLinkDropdown,
  ProjectCreatePositionDropdown,
  ProjectCreateTagInput,
} from "@/features/projects/ui";
import { useCreateProject } from "@/features/projects/create/hooks/useCreateProject";

interface ProjectFormProps {
  defaultValues?: Partial<ProjectFormValues>;
  onSubmit?: (values: ProjectFormValues) => void;
  submitLabel?: string;
  isPendingExternal?: boolean;
  cancelHref?: string;
}

export function ProjectCreateForm({
  defaultValues,
  onSubmit: onSubmitProp,
  submitLabel,
  isPendingExternal,
  cancelHref,
}: ProjectFormProps = {}) {
  const [createAlertOpen, setCreateAlertOpen] = useState(false);
  const [createdProjectId, setCreatedProjectId] = useState<number | undefined>(
    undefined,
  );
  const [techTagInput, setTechTagInput] = useState("");

  const router = useRouter();
  const openAlertModal = useOpenAlertModal();
  const { mutateAsync: uploadImage } = useUploadImage();
  const { mutate, isPending } = useCreateProject((data) => {
    setCreatedProjectId(data.id);
    setCreateAlertOpen(true);
  });

  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<ProjectFormValues>({
    resolver: zodResolver(projectFormSchema),
    defaultValues: {
      title: "",
      content: "",
      positions: [],
      techStacks: [],
      maxMembers: 0,
      contactLink: "",
      ...defaultValues,
    },
  });

  const handleCancelClick = () => {
    openAlertModal({
      title: "작성을 중단하시겠어요?",
      description: "지금 나가면 작성 중인 내용이 저장되지 않고 사라져요.",
      negative: { text: "나가기" },
      positive: { text: "이어서 작성하기" },
      onNegative: () => router.replace(cancelHref ?? "/projects"),
    });
  };

  const onSubmit = (values: ProjectFormValues) => {
    if (onSubmitProp) {
      onSubmitProp(values);
      return;
    }
    mutate({
      title: values.title,
      description: values.content,
      projectType: values.projectType,
      techStacks: values.techStacks,
      positions: values.positions,
      maxMembers: values.maxMembers,
      recruitEndDate: formatDate(values.recruitEndDate) as string,
      projectStartDate: formatDate(values.projectStart) as string,
      projectEndDate: formatDate(values.projectEnd) as string,
      contactMethod: values.contactMethod,
      contactLink: values.contactLink,
    });
  };

  return (
    <div className="pt-12 text-gray-400">
      <button onClick={handleCancelClick} className="cursor-pointer">
        <ChevronLeftIcon width={16} height={16} className="text-gray-200" />
      </button>

      <form onSubmit={handleSubmit(onSubmit)}>
        <section>
          <h2 className="mt-10 mb-5 text-[20px] text-gray-50">모집 정보</h2>
          <FieldGroup className="flex flex-col gap-7 rounded-[40px] bg-gray-800 px-10 py-5">
            <Field>
              <FieldLabel required>모집 마감 날짜</FieldLabel>
              <Controller
                name="recruitEndDate"
                control={control}
                render={({ field }) => (
                  <DatePicker
                    mode="single"
                    value={field.value}
                    onChange={field.onChange}
                  />
                )}
              />
              {errors.recruitEndDate && (
                <FieldError>{errors.recruitEndDate.message}</FieldError>
              )}
            </Field>

            <Field>
              <FieldLabel required>진행 기간</FieldLabel>
              <Controller
                name="projectStart"
                control={control}
                render={({ field: startField }) => (
                  <Controller
                    name="projectEnd"
                    control={control}
                    render={({ field: endField }) => (
                      <DatePicker
                        mode="range"
                        value={
                          startField.value || endField.value
                            ? { from: startField.value, to: endField.value }
                            : undefined
                        }
                        onChange={(range) => {
                          startField.onChange(range?.from);
                          endField.onChange(range?.to);
                        }}
                        showLabel={false}
                      />
                    )}
                  />
                )}
              />
              {(errors.projectStart || errors.projectEnd) && (
                <FieldError>
                  {errors.projectStart?.message ?? errors.projectEnd?.message}
                </FieldError>
              )}
            </Field>

            <Field>
              <FieldLabel required>프로젝트 목적</FieldLabel>
              <Controller
                name="projectType"
                control={control}
                render={({ field }) => (
                  <ul className="flex gap-2">
                    {Object.entries(PROJECT_TYPE_LABEL).map(
                      ([value, label]) => (
                        <ProjectFilterRadioInput
                          key={value}
                          item={{ value, label }}
                          name="projectType"
                          selectedValue={field.value}
                          onChange={(e) => field.onChange(e.target.value)}
                        />
                      ),
                    )}
                  </ul>
                )}
              />
              {errors.projectType && (
                <FieldError>{errors.projectType.message}</FieldError>
              )}
            </Field>

            <Field>
              <FieldLabel required>모집 포지션</FieldLabel>
              <Controller
                name="positions"
                control={control}
                render={({ field }) => (
                  <>
                    <ProjectCreatePositionDropdown
                      items={field.value}
                      setItems={field.onChange}
                    />
                    <ul className="flex gap-2">
                      {field.value.map((item: PositionType) => (
                        <li
                          key={item}
                          className="border-mint-500 text-mint-500 flex items-center gap-1 rounded-3xl border bg-gray-900 px-3 py-1"
                        >
                          <span>{POSITION_LABELS[item]}</span>
                          <button
                            type="button"
                            onClick={() =>
                              field.onChange(
                                field.value.filter(
                                  (v: PositionType) => v !== item,
                                ),
                              )
                            }
                            className="cursor-pointer"
                          >
                            <XIcon width={12} height={12} />
                          </button>
                        </li>
                      ))}
                    </ul>
                  </>
                )}
              />
              {errors.positions && (
                <FieldError>{errors.positions.message}</FieldError>
              )}
            </Field>

            <Field>
              <FieldLabel required>기술 스택</FieldLabel>
              <Controller
                name="techStacks"
                control={control}
                render={({ field }) => (
                  <ProjectCreateTagInput
                    input={techTagInput}
                    setInput={setTechTagInput}
                    tags={field.value}
                    setTags={field.onChange}
                  />
                )}
              />
              {errors.techStacks && (
                <FieldError>{errors.techStacks.message}</FieldError>
              )}
            </Field>

            <Field>
              <FieldLabel required>모집 정원</FieldLabel>
              <Controller
                name="maxMembers"
                control={control}
                render={({ field }) => (
                  <RangeBar
                    min={0}
                    max={30}
                    value={field.value}
                    onChange={field.onChange}
                  />
                )}
              />
              {errors.maxMembers && (
                <FieldError>{errors.maxMembers.message}</FieldError>
              )}
            </Field>

            <Field>
              <FieldLabel required>연락 방법</FieldLabel>
              <Controller
                name="contactMethod"
                control={control}
                render={({ field }) => (
                  <ProjectContactLinkDropdown
                    value={field.value}
                    setValue={field.onChange}
                  />
                )}
              />
              {errors.contactMethod && (
                <FieldError>{errors.contactMethod.message}</FieldError>
              )}
              <Input
                type="text"
                placeholder="연락 링크"
                {...register("contactLink")}
              />
              {errors.contactLink && (
                <FieldError>{errors.contactLink.message}</FieldError>
              )}
            </Field>
          </FieldGroup>
        </section>

        <section>
          <h2 className="mt-10 mb-5 text-[20px] text-gray-50">프로젝트 소개</h2>
          <FieldGroup className="flex flex-col gap-7 rounded-[40px] bg-gray-800 px-10 py-5">
            <Field>
              <FieldLabel required>제목</FieldLabel>
              <Input
                placeholder="프로젝트 모임명을 입력해주세요."
                {...register("title")}
              />
              {errors.title && <FieldError>{errors.title.message}</FieldError>}
            </Field>

            <Field>
              <FieldLabel required>소개</FieldLabel>
              <Controller
                name="content"
                control={control}
                render={({ field }) => (
                  <TiptapEditor
                    value={field.value}
                    onChange={field.onChange}
                    onImageUpload={uploadImage}
                    className="min-h-150 bg-transparent"
                  />
                )}
              />
              {errors.content && (
                <FieldError>{errors.content.message}</FieldError>
              )}
            </Field>
          </FieldGroup>
        </section>

        <div className="my-12 flex justify-end gap-4">
          <Button
            size="lg"
            className="w-50"
            type="button"
            onClick={handleCancelClick}
          >
            취소
          </Button>
          <Button
            size="lg"
            variant="primary"
            className="w-50"
            type="submit"
            disabled={isPending || isPendingExternal}
          >
            {submitLabel ?? "개설하기"}
          </Button>
        </div>
      </form>

      <CreateAlertModal
        open={createAlertOpen}
        onOpenChange={setCreateAlertOpen}
        id={createdProjectId}
      />
    </div>
  );
}
