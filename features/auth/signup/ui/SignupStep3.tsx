"use client";

import { useState } from "react";
import { Controller, useFormContext } from "react-hook-form";
import { toast } from "sonner";
import { XIcon } from "@/shared/icons";
import { Input, Field, FieldError, FieldGroup, FieldLabel } from "@/shared/ui";
import { TECH_STACK, type TechStackKey } from "@/shared/types/techStack";
import type { SignupFormValues } from "../model/signupForm";

const TECH_STACK_ENTRIES = Object.entries(TECH_STACK) as [
  TechStackKey,
  { label: string; icon: string },
][];

function getFieldBorderClassName({
  hasError,
  hasValue,
  useFocusWithin = false,
}: {
  hasError: boolean;
  hasValue: boolean;
  useFocusWithin?: boolean;
}) {
  const focusClassName = useFocusWithin
    ? "hover:border-[#00D7A0] focus-within:border-[#00D7A0]"
    : "hover:border-[#00D7A0] focus:border-[#00D7A0] focus-visible:border-[#00D7A0]";

  if (hasError) {
    return useFocusWithin
      ? "border-error hover:border-error focus-within:border-error"
      : "border-error hover:border-error focus:border-error focus-visible:border-error";
  }

  return hasValue
    ? `border-[#00D7A0] ${focusClassName}`
    : `border-[#34455E] ${focusClassName}`;
}

function findSkillKey(query: string, selected: TechStackKey[]) {
  const normalizedQuery = query.trim().toLowerCase();

  if (!normalizedQuery) return null;

  const availableEntries = TECH_STACK_ENTRIES.filter(([key]) => {
    return !selected.includes(key);
  });

  const exactMatch = availableEntries.find(([key, { label }]) => {
    return (
      key.toLowerCase() === normalizedQuery ||
      label.toLowerCase() === normalizedQuery
    );
  });

  const partialMatch = availableEntries.find(([key, { label }]) => {
    return (
      key.toLowerCase().includes(normalizedQuery) ||
      label.toLowerCase().includes(normalizedQuery)
    );
  });

  return exactMatch?.[0] ?? partialMatch?.[0] ?? null;
}

interface SignupSkillTagInputProps {
  value: TechStackKey[];
  onChange: (value: TechStackKey[]) => void;
}

function SignupSkillTagInput({ value, onChange }: SignupSkillTagInputProps) {
  const [query, setQuery] = useState("");
  const hasSkillValue = query.trim().length > 0 || value.length > 0;

  const handleAdd = () => {
    const normalizedQuery = query.trim();

    if (!normalizedQuery) return;

    const skillKey = findSkillKey(query, value);

    if (!skillKey) {
      toast.error("등록 가능한 기술 스택을 찾을 수 없어요.");
      return;
    }

    onChange([...value, skillKey]);
    setQuery("");
  };

  const handleRemove = (target: TechStackKey) => {
    onChange(value.filter((item) => item !== target));
  };

  return (
    <div className="flex flex-col gap-3">
      <div
        className={`flex h-[60px] items-center gap-2.5 rounded-[18px] border bg-[#243043] px-4 transition-colors ${getFieldBorderClassName(
          {
            hasError: false,
            hasValue: hasSkillValue,
            useFocusWithin: true,
          },
        )}`}
      >
        <input
          type="text"
          value={query}
          onChange={(event) => setQuery(event.target.value)}
          onKeyDown={(event) => {
            if (event.key === "Enter") {
              event.preventDefault();
              handleAdd();
            }
          }}
          placeholder="태그 키워드 입력"
          className="min-w-0 flex-1 bg-transparent text-base text-gray-50 outline-none placeholder:text-[#94A3B8]"
        />

        <button
          type="button"
          onClick={handleAdd}
          className="flex h-10 w-[58px] shrink-0 items-center justify-center rounded-xl bg-gray-50 text-base font-semibold text-[#64748B]"
        >
          추가
        </button>
      </div>

      {value.length > 0 ? (
        <div className="flex flex-wrap gap-2">
          {value.map((item) => (
            <span
              key={item}
              className="flex h-8 min-w-[82px] items-center justify-center gap-2 rounded-[4px] bg-[#3A4962] px-2.5 text-base text-gray-100"
            >
              {TECH_STACK[item].label}
              <button
                type="button"
                onClick={() => handleRemove(item)}
                className="text-[#A5B3C7] hover:text-[#F8FAFC]"
                aria-label={`${TECH_STACK[item].label} 삭제`}
              >
                <XIcon width={16} height={16} />
              </button>
            </span>
          ))}
        </div>
      ) : null}
    </div>
  );
}

interface SignupStep3Props {
  isSubmitting?: boolean;
  submitError?: string | null;
  onPrevious?: () => void;
  onSkip?: () => void;
  onSubmit?: () => void;
}

export default function SignupStep3({
  isSubmitting = false,
  submitError = null,
  onPrevious,
  onSkip,
  onSubmit,
}: SignupStep3Props) {
  const {
    register,
    control,
    watch,
    formState: { errors },
  } = useFormContext<SignupFormValues>();
  const bioValue = watch("bio");
  const externalLinkValue = watch("externalLink");
  const bioFieldClassName = getFieldBorderClassName({
    hasError: !!errors.bio,
    hasValue: bioValue.trim().length > 0,
    useFocusWithin: true,
  });
  const externalLinkFieldClassName = getFieldBorderClassName({
    hasError: !!errors.externalLink,
    hasValue: externalLinkValue.trim().length > 0,
  });

  return (
    <div className="flex w-full flex-1 flex-col gap-10 md:gap-12">
      <div className="flex flex-col gap-3 text-center">
        <h2 className="text-[32px] leading-tight font-semibold text-gray-50 md:text-[40px]">
          추가 정보 입력
        </h2>
        <p className="text-base text-gray-400 md:text-lg">
          나중에 마이페이지에서 언제든 수정할 수 있어요
        </p>
      </div>

      <FieldGroup className="mx-auto w-full max-w-[560px] gap-6">
        <Field>
          <FieldLabel htmlFor="bio" className="text-base text-gray-50">
            소개
          </FieldLabel>
          <div
            className={`rounded-[18px] border bg-[#243043] px-4 py-3 transition-colors ${bioFieldClassName}`}
          >
            <textarea
              id="bio"
              {...register("bio")}
              placeholder="나의 소개, 선호하는 협업 스타일"
              className="h-28 w-full resize-none bg-transparent text-base text-gray-50 outline-none placeholder:text-[#94A3B8]"
            />
          </div>
          <FieldError className="min-h-5">
            {errors.bio?.message ?? ""}
          </FieldError>
        </Field>

        <Field>
          <FieldLabel className="text-base text-gray-50">기술 스택</FieldLabel>
          <Controller
            name="skills"
            control={control}
            render={({ field }) => (
              <SignupSkillTagInput
                value={field.value}
                onChange={field.onChange}
              />
            )}
          />
        </Field>

        <Field>
          <FieldLabel htmlFor="externalLink" className="text-base text-gray-50">
            외부 링크
          </FieldLabel>
          <Input
            id="externalLink"
            {...register("externalLink")}
            placeholder="Github, Notion, Behance 등"
            className={`h-[60px] rounded-[18px] border bg-[#243043] px-5 text-base text-gray-50 transition-colors placeholder:text-[#94A3B8] ${externalLinkFieldClassName}`}
          />
          <FieldError className="min-h-5">
            {errors.externalLink?.message ?? ""}
          </FieldError>
        </Field>
      </FieldGroup>

      <div className="mt-auto flex w-full flex-col gap-3 pt-6">
        {submitError ? <FieldError>{submitError}</FieldError> : null}

        <div className="flex w-full gap-3">
          <button
            type="button"
            className="flex h-[60px] w-full items-center justify-center rounded-[18px] border border-[#E2E8F0] bg-[#F8FAFC] px-[30px] py-4 text-lg font-semibold text-[#58677D] transition-colors hover:bg-white disabled:cursor-not-allowed disabled:opacity-50"
            onClick={onPrevious}
            disabled={isSubmitting}
          >
            이전
          </button>

          <button
            type="button"
            className="flex h-[60px] w-full items-center justify-center rounded-[18px] bg-[#00D7A0] px-[30px] py-4 text-lg font-semibold text-[#F8FAFC] transition-colors hover:bg-[#00c391] disabled:cursor-not-allowed disabled:opacity-50"
            disabled={isSubmitting}
            onClick={onSubmit}
          >
            {isSubmitting ? "처리 중..." : "가입하기"}
          </button>
        </div>

        <button
          type="button"
          onClick={onSkip}
          className="text-mint-500 text-center text-base font-semibold"
          disabled={isSubmitting}
        >
          건너뛰기
        </button>
      </div>
    </div>
  );
}
