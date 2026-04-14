"use client";

import { Controller, useFormContext } from "react-hook-form";
import { cn } from "@/shared/utils";
import { Field, FieldError, FieldGroup } from "@/shared/ui";
import type { JobLabelType } from "@/shared/types/user";
import type { SignupFormValues } from "../model/signupForm";

const JOB_OPTIONS: Array<{ value: JobLabelType; label: string }> = [
  { value: "android", label: "Android" },
  { value: "fe", label: "FE" },
  { value: "be", label: "BE" },
  { value: "designer", label: "Designer" },
  { value: "ios", label: "iOS" },
  { value: "devops", label: "DevOPS" },
  { value: "marketer", label: "Marketer" },
  { value: "pm", label: "PM" },
];

interface JobLabelSelectorProps {
  value: JobLabelType | "";
  onChange: (value: JobLabelType) => void;
}

function JobLabelSelector({ value, onChange }: JobLabelSelectorProps) {
  return (
    <div className="mx-auto flex w-full max-w-[560px] flex-col gap-3">
      {JOB_OPTIONS.map((option) => (
        <button
          key={option.value}
          type="button"
          aria-pressed={value === option.value}
          onClick={() => onChange(option.value)}
          className={cn(
            "flex h-[60px] w-full items-center justify-center rounded-[18px] border px-4 text-lg font-semibold transition-colors",
            value === option.value
              ? "border-[#00D7A0] bg-[#00D7A0] text-[#F8FAFC]"
              : "border-[#34455E] bg-[#243043] text-[#F8FAFC] hover:border-[#00D7A0]/40",
          )}
        >
          {option.label}
        </button>
      ))}
    </div>
  );
}

export default function SignupStep1() {
  const {
    control,
    formState: { errors },
  } = useFormContext<SignupFormValues>();

  return (
    <div className="flex flex-col gap-12 md:gap-14">
      <div className="flex flex-col gap-3 text-center">
        <h2 className="text-[32px] leading-tight font-semibold text-gray-50 md:text-[40px]">
          포지션 선택
        </h2>
        <p className="text-base text-gray-400 md:text-lg">
          활동하실 주 포지션을 선택해 주세요
        </p>
      </div>

      <FieldGroup className="gap-6">
        <Field>
          <Controller
            name="jobLabel"
            control={control}
            render={({ field }) => (
              <JobLabelSelector
                value={field.value}
                onChange={(value) => field.onChange(value)}
              />
            )}
          />

          <FieldError className="min-h-5">
            {errors.jobLabel?.message ?? ""}
          </FieldError>
        </Field>
      </FieldGroup>
    </div>
  );
}
