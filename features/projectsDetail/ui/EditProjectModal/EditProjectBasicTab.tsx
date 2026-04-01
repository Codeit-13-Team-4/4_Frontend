"use client";

import { Controller, useFormContext } from "react-hook-form";
import { Field, FieldGroup, FieldLabel, FieldError, Input } from "@/shared/ui";
import { ProjectTypeRadio } from "./ProjectTypeRadio";
import { PositionSelect } from "./PositionSelect";
import { TechStackSelect } from "./TechStackSelect";
import type { EditFormValues } from "./types";

export function EditProjectBasicTab() {
  const {
    register,
    control,
    formState: { errors },
  } = useFormContext<EditFormValues>();

  return (
    <FieldGroup className="mt-6 gap-6">
      {/* 프로젝트 제목 */}
      <Field className="gap-4">
        <FieldLabel>프로젝트 제목</FieldLabel>
        <Input placeholder="제목을 입력해주세요" {...register("title")} />
        {errors.title && <FieldError>{errors.title.message}</FieldError>}
      </Field>

      {/* 모집 분류 */}
      <Field className="gap-4">
        <FieldLabel>모집 분류</FieldLabel>
        <Controller
          name="projectType"
          control={control}
          render={({ field }) => (
            <ProjectTypeRadio value={field.value} onChange={field.onChange} />
          )}
        />
      </Field>

      {/* 프로젝트 소개 */}
      <Field className="gap-4">
        <FieldLabel>프로젝트 소개</FieldLabel>
        <textarea
          {...register("description")}
          placeholder="프로젝트를 소개해주세요"
          className="border-border-default h-32 w-full resize-none rounded-xl border bg-gray-800 px-3 py-3 text-base text-gray-50 outline-none placeholder:text-gray-400"
        />
        {errors.description && (
          <FieldError>{errors.description.message}</FieldError>
        )}
      </Field>

      {/* 모집 포지션 */}
      <Field className="gap-4">
        <FieldLabel>모집 포지션</FieldLabel>
        <Controller
          name="positions"
          control={control}
          render={({ field }) => (
            <PositionSelect value={field.value} onChange={field.onChange} />
          )}
        />
        {errors.positions && (
          <FieldError>{errors.positions.message}</FieldError>
        )}
      </Field>

      {/* 기술 스택 */}
      <Field className="mb-12 gap-4">
        <FieldLabel>기술 스택</FieldLabel>
        <Controller
          name="techStacks"
          control={control}
          render={({ field }) => (
            <TechStackSelect value={field.value} onChange={field.onChange} />
          )}
        />
        {errors.techStacks && (
          <FieldError>{errors.techStacks.message}</FieldError>
        )}
      </Field>
    </FieldGroup>
  );
}
