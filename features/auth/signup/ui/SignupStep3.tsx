"use client";

import { useState } from "react";
import { Controller, useFormContext } from "react-hook-form";
import Image from "next/image";
import { XIcon } from "@/shared/icons";
import { Input, Field, FieldError, FieldGroup, FieldLabel } from "@/shared/ui";
import { TECH_STACK, type TechStackKey } from "@/shared/types/techStack";
import type { SignupFormValues } from "../model/signupForm";

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
    ? "hover:border-mint-500 focus-within:border-mint-500"
    : "hover:border-mint-500 focus:border-mint-500 focus-visible:border-mint-500";

  if (hasError) {
    return useFocusWithin
      ? "border-error hover:border-error focus-within:border-error"
      : "border-error hover:border-error focus:border-error focus-visible:border-error";
  }

  return hasValue
    ? `border-mint-500 ${focusClassName}`
    : `border-gray-700 ${focusClassName}`;
}

interface SignupSkillTagInputProps {
  value: TechStackKey[];
  onChange: (value: TechStackKey[]) => void;
}

function SignupSkillTagInput({ value, onChange }: SignupSkillTagInputProps) {
  const [query, setQuery] = useState("");
  const [isFocused, setIsFocused] = useState(false);

  const recommendList = Object.keys(TECH_STACK).filter(
    (key) =>
      (key.includes(query.toLowerCase()) ||
        TECH_STACK[key as TechStackKey].label
          .toLowerCase()
          .includes(query.toLowerCase())) &&
      !value.includes(key as TechStackKey),
  ) as TechStackKey[];

  const handleAdd = (key: TechStackKey) => {
    if (!value.includes(key)) {
      onChange([...value, key]);
    }
    setQuery("");
    setIsFocused(false);
  };

  const handleRemove = (target: TechStackKey) => {
    onChange(value.filter((item) => item !== target));
  };

  return (
    <div className="flex flex-col gap-3">
      <div className="relative">
        <Input
          placeholder="태그 키워드 입력"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onClick={() => setIsFocused((prev) => !prev)}
          onBlur={() => setTimeout(() => setIsFocused(false), 100)}
        />
        {isFocused && recommendList.length > 0 && (
          <ul className="scrollbar-hide absolute top-full z-50 mt-1 max-h-40 w-full overflow-y-auto rounded-md border border-gray-700 bg-gray-800">
            {recommendList.map((key) => (
              <li
                key={key}
                className="flex cursor-pointer items-center gap-2 px-3 py-1 hover:bg-gray-700"
                onClick={() => handleAdd(key)}
              >
                <Image
                  src={TECH_STACK[key].icon}
                  alt={TECH_STACK[key].label}
                  width={16}
                  height={16}
                />
                <span>{TECH_STACK[key].label}</span>
              </li>
            ))}
          </ul>
        )}
      </div>

      {value.length > 0 ? (
        <div className="flex flex-wrap gap-2">
          {value.map((item) => (
            <span
              key={item}
              className="flex h-8 min-w-20.5 items-center justify-center gap-2 rounded-sm bg-[#3A4962] px-2.5 text-base text-gray-100"
            >
              {TECH_STACK[item].label}
              <button
                type="button"
                onClick={() => handleRemove(item)}
                className="text-[#A5B3C7] hover:text-[#F8FAFC]"
                aria-label={`${TECH_STACK[item].label} 삭제`}
              >
                <XIcon width={14} height={14} />
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
        <h2 className="text-lg leading-tight font-semibold text-gray-50 md:text-2xl">
          추가 정보 입력
        </h2>
        <p className="text-sm text-gray-400 md:text-lg">
          나중에 마이페이지에서 언제든 수정할 수 있어요
        </p>
      </div>

      <FieldGroup className="mx-auto w-full max-w-140 gap-6">
        <Field>
          <FieldLabel
            htmlFor="bio"
            className="text-sm text-gray-50 md:text-base"
          >
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
          <FieldLabel className="text-sm text-gray-50 md:text-base">
            기술 스택
          </FieldLabel>
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
          <FieldLabel
            htmlFor="externalLink"
            className="text-sm text-gray-50 md:text-base"
          >
            외부 링크
          </FieldLabel>
          <Input
            id="externalLink"
            {...register("externalLink")}
            placeholder="Github, Notion, Behance 등"
            className={`rounded-[18px] border bg-[#243043] px-3 py-3 text-base text-gray-50 transition-colors placeholder:text-[#94A3B8] ${externalLinkFieldClassName}`}
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
            className="flex h-15 w-full items-center justify-center rounded-[18px] border border-[#E2E8F0] bg-[#F8FAFC] px-7.5 py-4 text-lg font-semibold text-[#58677D] transition-colors hover:bg-white disabled:cursor-not-allowed disabled:opacity-50"
            onClick={onPrevious}
            disabled={isSubmitting}
          >
            이전
          </button>

          <button
            type="button"
            className="flex h-15 w-full items-center justify-center rounded-[18px] bg-[#00D7A0] px-7.5 py-4 text-lg font-semibold text-[#F8FAFC] transition-colors hover:bg-[#00c391] disabled:cursor-not-allowed disabled:opacity-50"
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
