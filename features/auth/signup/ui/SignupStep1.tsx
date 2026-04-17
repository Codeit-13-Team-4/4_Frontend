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
    <div className="mx-auto flex w-full max-w-140 flex-col gap-3">
      {JOB_OPTIONS.map((option) => (
        <button
          key={option.value}
          type="button"
          aria-pressed={value === option.value}
          onClick={() => onChange(option.value)}
          className={cn(
            "flex w-full items-center justify-center rounded-full border px-4 py-3 text-sm font-normal transition-colors md:text-base",
            value === option.value
              ? "border-mint-500 bg-mint-500 text-gray-50"
              : "hover:border-mint-500/40 border-gray-700 bg-gray-800 text-gray-400",
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
    <div className="flex flex-col gap-7 md:gap-10">
      <div className="flex flex-col gap-3 text-center">
        <h2 className="text-base leading-tight font-semibold text-gray-50 md:text-2xl">
          포지션 선택
        </h2>
        <p className="text-sm font-medium text-gray-400 md:text-lg">
          활동하실 주 포지션을 선택해 주세요
        </p>
      </div>

      <FieldGroup>
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
