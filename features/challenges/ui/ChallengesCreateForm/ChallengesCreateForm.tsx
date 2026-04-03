"use client";

import {
  Button,
  DatePicker,
  Field,
  FieldError,
  FieldGroup,
  FieldLabel,
  Input,
  TextArea,
} from "@/shared/ui";
import Image from "next/image";
import { useState } from "react";
import { DateRange } from "react-day-picker";
import { formatDate } from "@/shared/utils";
import { useRouter } from "next/navigation";
import { useCreateChallenges } from "../../hooks/useCreateChallenges";
import {
  JOIN_TYPE_OPTIONS,
  ParticipationType,
  VERIFICATION_FREQUENCY_LABEL,
  VerificationFrequencyType,
} from "@/features/challenges/model";
import {
  ChallengesCreateAlertModal,
  ChallengesCreateCancelAlertModal,
  ChallengesCreateTagInput,
  ChallengesFilterRadioInput,
  ChallengesJoinTypeRadioInput,
} from "@/features/challenges/ui";
import { ProjectCreateRangeBar } from "@/features/projects/ui";

type CreateFormErrors = {
  title?: string;
  description?: string;
  tags?: string;
  challengeRange?: string;
  recruitDeadline?: string;
  verificationFrequency?: string;
  maxParticipants?: string;
  joinType?: string;
  verificationMethod?: string;
};

interface CreateFormState {
  title: string;
  description: string;
  tags: string[];
  challengeRange: DateRange | undefined;
  recruitDeadline: Date | undefined;
  verificationFrequency: VerificationFrequencyType | undefined;
  maxParticipants: number;
  joinType: ParticipationType | undefined;
  verificationMethod: "IMAGE_AND_TEXT" | "TEXT" | "IMAGE";
}

export function ChallengesCreateForm() {
  const [tagInput, setTagInput] = useState("");
  const [confirmAlertOpen, setConfirmAlertOpen] = useState(false);
  const [createAlertOpen, setCreateAlertOpen] = useState(false);
  const [errors, setErrors] = useState<CreateFormErrors>({});
  const [createForm, setCreateForm] = useState<CreateFormState>({
    title: "",
    description: "",
    tags: [],
    challengeRange: undefined,
    recruitDeadline: undefined,
    verificationFrequency: undefined,
    maxParticipants: 0,
    joinType: undefined,
    verificationMethod: "TEXT",
  });
  const [createdChallengeId, setCreatedChallengeId] = useState<
    number | undefined
  >(undefined);

  const updateForm = <K extends keyof CreateFormState>(
    key: K,
    value: CreateFormState[K],
  ) => {
    setCreateForm((prev) => ({ ...prev, [key]: value }));
  };

  const router = useRouter();
  const { mutate, isPending } = useCreateChallenges((data) => {
    setCreatedChallengeId(data.id);
    setCreateAlertOpen(true);
  });

  const handleBack = () => {
    if (window.history.length > 1) {
      router.back();
    } else {
      router.push("/");
    }
  };

  const handleSubmit = () => {
    const newErrors: typeof errors = {};

    if (!createForm.title.trim()) {
      newErrors.title = "챌린지 제목을 입력해주세요.";
    }
    if (!createForm.description.trim()) {
      newErrors.description = "챌린지 소개글을 입력해주세요.";
    }

    if (!createForm.recruitDeadline) {
      newErrors.recruitDeadline = "모집 마감일을 설정해주세요.";
    }
    if (!createForm.challengeRange?.from || !createForm.challengeRange?.to) {
      newErrors.challengeRange = "챌린지 진행 기간을 설정해주세요.";
    }
    if (!createForm.verificationFrequency) {
      newErrors.verificationFrequency = "인증 빈도를 선택해주세요.";
    }
    if (createForm.maxParticipants === 0) {
      newErrors.maxParticipants = "최대 참여 인원을 설정해주세요.";
    }
    if (!createForm.joinType) {
      newErrors.joinType = "참여 방식을 선택해주세요.";
    }

    setErrors(newErrors);

    if (Object.keys(newErrors).length === 0) {
      const data = {
        title: createForm.title,
        description: createForm.description,
        tags: createForm.tags,
        startDate: formatDate(createForm.challengeRange!.from!) as string,
        endDate: formatDate(createForm.challengeRange!.to!) as string,
        recruitDeadline: formatDate(createForm.recruitDeadline!) as string,
        verificationFrequency: createForm.verificationFrequency!,
        maxParticipants: createForm.maxParticipants,
        joinType: createForm.joinType!,
        verificationMethod: "TEXT" as const,
      };

      mutate(data);
    }
  };

  return (
    <div className="text-gray-400">
      <button onClick={handleBack} className="cursor-pointer">
        <Image
          src="/icons/common/chevron_left-icon.svg"
          alt=""
          width={16}
          height={16}
        />
      </button>

      <section>
        <h2 className="mt-10 mb-5 text-[20px] text-gray-50">기본정보</h2>
        <FieldGroup className="flex flex-col gap-7 rounded-[40px] bg-gray-800 px-10 py-5">
          <Field>
            <FieldLabel required>챌린지명</FieldLabel>
            <Input
              placeholder="챌린지 모임명을 입력해주세요."
              value={createForm.title}
              onChange={(e) => updateForm("title", e.target.value)}
            />
            {errors.title && <FieldError>{errors.title}</FieldError>}
          </Field>

          <Field>
            <FieldLabel required>소개</FieldLabel>
            <TextArea
              maxLength={200}
              value={createForm.description}
              placeholder="어떤 챌린지인지 간단하게 입력해주세요."
              onChange={(e) => updateForm("description", e.target.value)}
              wrapperClassName="w-full bg-gray-800 border border-gray-700"
            />
            {errors.description && (
              <FieldError>{errors.description}</FieldError>
            )}
          </Field>

          <Field>
            <FieldLabel>키워드 입력</FieldLabel>
            <ChallengesCreateTagInput
              input={tagInput}
              setInput={setTagInput}
              tags={createForm.tags}
              setTags={(tags) => updateForm("tags", tags)}
            />
            {errors.tags && <FieldError>{errors.tags}</FieldError>}
          </Field>
        </FieldGroup>
      </section>

      <section>
        <h2 className="mt-10 mb-5 text-[20px] text-gray-50">운영일정</h2>
        <FieldGroup className="flex flex-col gap-7 rounded-[40px] bg-gray-800 px-10 py-5">
          <Field>
            <FieldLabel required>모집 마감일</FieldLabel>
            <DatePicker
              mode="single"
              value={createForm.recruitDeadline}
              onChange={(date) => updateForm("recruitDeadline", date)}
            />
            {errors.recruitDeadline && (
              <FieldError>{errors.recruitDeadline}</FieldError>
            )}
          </Field>

          <Field>
            <FieldLabel required>챌린지 기간</FieldLabel>
            <DatePicker
              mode="range"
              value={createForm.challengeRange}
              onChange={(range) => updateForm("challengeRange", range)}
              showLabel={false}
            />
            {errors.challengeRange && (
              <FieldError>{errors.challengeRange}</FieldError>
            )}
          </Field>

          <Field>
            <FieldLabel required className="mb-1">
              인증빈도
            </FieldLabel>
            <ul className="flex flex-wrap gap-2">
              {Object.entries(VERIFICATION_FREQUENCY_LABEL)
                .slice(0, -1)
                .map(([value, label]) => (
                  <ChallengesFilterRadioInput
                    key={value}
                    name="verificationFrequency"
                    item={{ value, label }}
                    selectedValue={createForm.verificationFrequency}
                    onChange={(e) =>
                      updateForm(
                        "verificationFrequency",
                        e.target.value as VerificationFrequencyType,
                      )
                    }
                  />
                ))}
            </ul>
            {errors.verificationFrequency && (
              <FieldError>{errors.verificationFrequency}</FieldError>
            )}
          </Field>
        </FieldGroup>
      </section>

      <section>
        <h2 className="mt-10 mb-5 text-[20px] text-gray-50">
          모집 및 참여 조건
        </h2>
        <FieldGroup className="flex flex-col gap-7 rounded-[40px] bg-gray-800 px-10 py-5">
          <Field>
            <FieldLabel required>모집 정원</FieldLabel>

            <ProjectCreateRangeBar
              count={createForm.maxParticipants}
              setCount={(count) => updateForm("maxParticipants", count)}
            />
            {errors.maxParticipants && (
              <FieldError>{errors.maxParticipants}</FieldError>
            )}
          </Field>

          <Field>
            <FieldLabel required>모집 방식</FieldLabel>
            <ul className="flex flex-wrap gap-2">
              {JOIN_TYPE_OPTIONS.map((item) => (
                <ChallengesJoinTypeRadioInput
                  key={item.value}
                  {...item}
                  selectedValue={createForm.joinType}
                  onChange={(value) =>
                    updateForm("joinType", value as ParticipationType)
                  }
                />
              ))}
            </ul>

            {errors.joinType && <FieldError>{errors.joinType}</FieldError>}
          </Field>
        </FieldGroup>
      </section>

      <div className="my-12 flex justify-end gap-4">
        <Button
          size="lg"
          className="w-50"
          onClick={() => setConfirmAlertOpen(true)}
        >
          취소
        </Button>
        <Button
          size="lg"
          variant="primary"
          className="w-50"
          onClick={handleSubmit}
          disabled={isPending}
        >
          개설하기
        </Button>
      </div>

      <ChallengesCreateCancelAlertModal
        open={confirmAlertOpen}
        onOpenChange={setConfirmAlertOpen}
      />

      <ChallengesCreateAlertModal
        open={createAlertOpen}
        onOpenChange={setCreateAlertOpen}
        id={createdChallengeId}
      />
    </div>
  );
}
