"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { useState } from "react";

import { Controller, useForm } from "react-hook-form";
import { ChevronLeftIcon } from "@/shared/icons";
import { formatDate } from "@/shared/utils";
import {
  Button,
  DatePicker,
  Field,
  FieldError,
  FieldGroup,
  FieldLabel,
  Input,
  TiptapEditor,
} from "@/shared/ui";
import { useUploadImage } from "@/shared/hooks/useUploadImage";
import { useCreateChallenges } from "@/features/challenges/create/hooks/useCreateChallenges";
import {
  JOIN_TYPE_OPTIONS,
  VERIFICATION_FREQUENCY_LABEL,
  VERIFICATION_METHOD_OPTIONS,
  VerificationFrequencyType,
} from "@/features/challenges/model";
import {
  challengesCreateSchema,
  ChallengesCreateFormValues,
} from "@/features/challenges/create/model/challenges.schema";
import { ChallengesCreateAlertModal } from "@/features/challenges/create/ui/ChallengesCreateModal/ChallengesCreateAlertModal";
import {
  ChallengesTagInput,
  ChallengesFilterRadioInput,
  ChallengesJoinTypeRadioInput,
} from "@/features/challenges/ui";
import { RangeBar } from "@/shared/ui";
import { useOpenAlertModal } from "@/shared/store/AlertModal";

interface ChallengesFormProps {
  defaultValues?: Partial<ChallengesCreateFormValues>;
  onSubmit?: (values: ChallengesCreateFormValues) => void;
  submitLabel?: string;
  isPendingExternal?: boolean;
  cancelHref?: string;
}

export function ChallengesForm({
  defaultValues,
  onSubmit: onSubmitProp,
  submitLabel,
  isPendingExternal,
  cancelHref,
}: ChallengesFormProps = {}) {
  const [createAlertOpen, setCreateAlertOpen] = useState(false);
  const [createdChallengeId, setCreatedChallengeId] = useState<
    number | undefined
  >(undefined);

  const router = useRouter();
  const openAlertModal = useOpenAlertModal();
  const { mutateAsync: uploadImage } = useUploadImage();
  const { mutate, isPending } = useCreateChallenges((data) => {
    setCreatedChallengeId(data.id);
    setCreateAlertOpen(true);
  });

  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<ChallengesCreateFormValues>({
    resolver: zodResolver(challengesCreateSchema),
    defaultValues: {
      title: "",
      content: "",
      tags: [],
      maxParticipants: 0,
      ...defaultValues,
    },
  });

  const handleCancelClick = () => {
    openAlertModal({
      title: "작성을 중단하시겠어요?",
      description: "지금 나가면 작성 중인 내용이 저장되지 않고 사라져요.",
      negative: { text: "나가기" },
      positive: { text: "이어서 작성하기" },
      onNegative: () => router.replace(cancelHref ?? "/challenges"),
    });
  };

  const onSubmit = (values: ChallengesCreateFormValues) => {
    if (onSubmitProp) {
      onSubmitProp(values);
      return;
    }
    mutate({
      title: values.title,
      description: values.content,
      tags: values.tags,
      startDate: formatDate(values.challengeStart) as string,
      endDate: formatDate(values.challengeEnd) as string,
      recruitDeadline: formatDate(values.recruitDeadline) as string,
      verificationFrequency: values.verificationFrequency,
      maxParticipants: values.maxParticipants,
      joinType: values.joinType,
      verificationMethod: values.verificationMethod,
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
              <FieldLabel required>모집 마감일</FieldLabel>
              <Controller
                name="recruitDeadline"
                control={control}
                render={({ field }) => (
                  <DatePicker
                    mode="single"
                    value={field.value}
                    onChange={field.onChange}
                  />
                )}
              />
              {errors.recruitDeadline && (
                <FieldError>{errors.recruitDeadline.message}</FieldError>
              )}
            </Field>

            <Field>
              <FieldLabel required>진행 기간</FieldLabel>
              <Controller
                name="challengeStart"
                control={control}
                render={({ field: startField }) => (
                  <Controller
                    name="challengeEnd"
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
              {(errors.challengeStart || errors.challengeEnd) && (
                <FieldError>
                  {errors.challengeStart?.message ??
                    errors.challengeEnd?.message}
                </FieldError>
              )}
            </Field>

            <Field>
              <FieldLabel required className="mb-1">
                인증 빈도
              </FieldLabel>
              <Controller
                name="verificationFrequency"
                control={control}
                render={({ field }) => (
                  <ul className="flex flex-wrap gap-2">
                    {Object.entries(VERIFICATION_FREQUENCY_LABEL).map(
                      ([value, label]) => (
                        <ChallengesFilterRadioInput
                          key={value}
                          name="verificationFrequency"
                          item={{ value, label }}
                          selectedValue={field.value}
                          onChange={(e) =>
                            field.onChange(
                              e.target.value as VerificationFrequencyType,
                            )
                          }
                        />
                      ),
                    )}
                  </ul>
                )}
              />
              {errors.verificationFrequency && (
                <FieldError>{errors.verificationFrequency.message}</FieldError>
              )}
            </Field>

            <Field>
              <FieldLabel required className="mb-1">
                인증 방식
              </FieldLabel>
              <Controller
                name="verificationMethod"
                control={control}
                render={({ field }) => (
                  <ul className="flex flex-wrap gap-2">
                    {VERIFICATION_METHOD_OPTIONS.map(({ value, label }) => (
                      <ChallengesFilterRadioInput
                        key={value}
                        name="verificationMethod"
                        item={{ value, label }}
                        selectedValue={field.value}
                        onChange={(e) => field.onChange(e.target.value)}
                      />
                    ))}
                  </ul>
                )}
              />
              {errors.verificationMethod && (
                <FieldError>{errors.verificationMethod.message}</FieldError>
              )}
            </Field>
          </FieldGroup>
        </section>

        <section>
          <h2 className="mt-10 mb-5 text-[20px] text-gray-50">참여 조건</h2>
          <FieldGroup className="flex flex-col gap-7 rounded-[40px] bg-gray-800 px-10 py-5">
            <Field>
              <FieldLabel required>모집 정원</FieldLabel>
              <Controller
                name="maxParticipants"
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
              {errors.maxParticipants && (
                <FieldError>{errors.maxParticipants.message}</FieldError>
              )}
            </Field>

            <Field>
              <FieldLabel required>모집 방식</FieldLabel>
              <Controller
                name="joinType"
                control={control}
                render={({ field }) => (
                  <ul className="grid grid-cols-1 gap-2 lg:grid-cols-2">
                    {JOIN_TYPE_OPTIONS.map((item) => (
                      <ChallengesJoinTypeRadioInput
                        key={item.value}
                        {...item}
                        selectedValue={field.value}
                        onChange={field.onChange}
                      />
                    ))}
                  </ul>
                )}
              />
              {errors.joinType && (
                <FieldError>{errors.joinType.message}</FieldError>
              )}
            </Field>
          </FieldGroup>
        </section>

        <section>
          <h2 className="mt-10 mb-5 text-[20px] text-gray-50">챌린지 소개</h2>
          <FieldGroup className="flex flex-col gap-7 rounded-[40px] bg-gray-800 px-10 py-5">
            <Field>
              <FieldLabel required>제목</FieldLabel>
              <Input
                placeholder="챌린지 모임명을 입력해주세요."
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

            <Field>
              <FieldLabel required>키워드 입력</FieldLabel>
              <Controller
                name="tags"
                control={control}
                render={({ field }) => (
                  <ChallengesTagInput
                    value={field.value}
                    onChange={field.onChange}
                  />
                )}
              />
              {errors.tags && <FieldError>{errors.tags.message}</FieldError>}
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

      <ChallengesCreateAlertModal
        open={createAlertOpen}
        onOpenChange={setCreateAlertOpen}
        id={createdChallengeId}
      />
    </div>
  );
}
