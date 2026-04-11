"use client";

import { useState, useRef, useEffect } from "react";
import { Controller, useFormContext } from "react-hook-form";
import { type DateRange } from "react-day-picker";
import { Field, FieldGroup, FieldLabel, FieldError } from "@/shared/ui";
import { DatePicker } from "@/shared/ui/DatePicker/DatePicker";
import {
  VERIFICATION_METHOD_LABEL,
  VERIFICATION_FREQUENCY_LABEL,
} from "@/features/challenges/detail/model/challenges.constants";
import { JOIN_TYPE_OPTIONS } from "@/features/challenges/model";
import type {
  VerificationMethodType,
  VerificationFrequencyType,
  JoinType,
} from "@/features/challenges/detail/model/challengesDetail";
import type { EditChallengeFormValues } from "./types";

function SimpleSelect<T extends string>({
  value,
  onChange,
  options,
  placeholder,
}: {
  value: T | undefined;
  onChange: (v: T) => void;
  options: [T, string][];
  placeholder: string;
}) {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  const selected = options.find(([k]) => k === value);

  return (
    <div ref={ref} className="relative">
      <button
        type="button"
        onClick={() => setOpen((prev) => !prev)}
        className="border-border-default flex h-12 w-full cursor-pointer items-center justify-between rounded-xl border bg-gray-900 px-3 transition-colors"
      >
        <span className="text-base text-gray-50">
          {selected ? selected[1] : placeholder}
        </span>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="16"
          height="16"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="text-gray-400 transition-transform duration-200"
          style={{ transform: open ? "rotate(180deg)" : "rotate(0deg)" }}
        >
          <path d="m6 9 6 6 6-6" />
        </svg>
      </button>

      {open && (
        <ul className="absolute top-full left-0 z-10 mt-1 max-h-48 w-full overflow-y-auto rounded-xl border border-gray-600 bg-gray-800 shadow-lg">
          {options.map(([key, label]) => (
            <li key={key}>
              <button
                type="button"
                onMouseDown={(e) => e.preventDefault()}
                onClick={() => {
                  onChange(key);
                  setOpen(false);
                }}
                className={`w-full px-3 py-2.5 text-left text-sm transition-colors hover:bg-gray-700 ${
                  value === key ? "text-mint-500" : "text-gray-200"
                }`}
              >
                {label}
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

const VERIFICATION_METHOD_ENTRIES = Object.entries(
  VERIFICATION_METHOD_LABEL,
) as [VerificationMethodType, string][];

const VERIFICATION_FREQUENCY_ENTRIES = Object.entries(
  VERIFICATION_FREQUENCY_LABEL,
) as [VerificationFrequencyType, string][];

const JOIN_TYPE_ENTRIES = JOIN_TYPE_OPTIONS.map(
  ({ value, title }) => [value, title] as [JoinType, string],
);

export function EditChallengeScheduleTab() {
  const {
    control,
    formState: { errors },
  } = useFormContext<EditChallengeFormValues>();

  return (
    <FieldGroup className="gap-12">
      {/* 모집 마감 날짜 */}
      <Field className="mt-8">
        <FieldLabel>모집 마감 날짜</FieldLabel>
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
      </Field>

      {/* 챌린지 기간 */}
      <Field>
        <Controller
          name="challengeDateRange"
          control={control}
          render={({ field }) => (
            <DatePicker
              mode="range"
              value={field.value as DateRange | undefined}
              onChange={(range) =>
                field.onChange(range ?? { from: undefined, to: undefined })
              }
            />
          )}
        />
      </Field>

      {/* 인증 방법 */}
      <Field>
        <FieldLabel>인증 방법</FieldLabel>
        <Controller
          name="verificationMethod"
          control={control}
          render={({ field }) => (
            <SimpleSelect<VerificationMethodType>
              value={field.value}
              onChange={field.onChange}
              options={VERIFICATION_METHOD_ENTRIES}
              placeholder="인증 방법 선택"
            />
          )}
        />
      </Field>

      {/* 인증 주기 */}
      <Field>
        <FieldLabel>인증 주기</FieldLabel>
        <Controller
          name="verificationFrequency"
          control={control}
          render={({ field }) => (
            <SimpleSelect<VerificationFrequencyType>
              value={field.value}
              onChange={field.onChange}
              options={VERIFICATION_FREQUENCY_ENTRIES}
              placeholder="인증 주기 선택"
            />
          )}
        />
      </Field>

      {/* 참여 방식 */}
      <Field>
        <FieldLabel>참여 방식</FieldLabel>
        <Controller
          name="joinType"
          control={control}
          render={({ field }) => (
            <SimpleSelect<JoinType>
              value={field.value}
              onChange={field.onChange}
              options={JOIN_TYPE_ENTRIES}
              placeholder="참여 방식 선택"
            />
          )}
        />
      </Field>

      {/* 모집 인원 */}
      <Field className="mb-8">
        <FieldLabel>모집 인원</FieldLabel>
        <Controller
          name="maxParticipants"
          control={control}
          render={({ field }) => {
            const min = 3;
            const max = 30;
            const value = isNaN(field.value) ? min : field.value;
            const percent = ((value - min) / (max - min)) * 100;

            return (
              <div className="relative w-full">
                <div className="absolute top-1/2 left-0 h-2 w-full rounded-full bg-gray-900" />
                <div
                  className="absolute top-1/2 left-0 h-2 rounded-full"
                  style={{
                    width: `${percent}%`,
                    background: "var(--color-gradient-devup)",
                  }}
                />
                <div className="flex items-center justify-center text-gray-50">
                  {value}명
                </div>
                <input
                  type="range"
                  min={min}
                  max={max}
                  value={value}
                  onChange={(e) => field.onChange(Number(e.target.value))}
                  className="range-devup relative cursor-pointer"
                />
                <div className="flex justify-between text-sm text-gray-400">
                  <span>{min}</span>
                  <span>{max}</span>
                </div>
              </div>
            );
          }}
        />
        {errors.maxParticipants && (
          <FieldError>{errors.maxParticipants.message}</FieldError>
        )}
      </Field>
    </FieldGroup>
  );
}
