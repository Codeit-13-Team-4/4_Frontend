"use client";

import { useState, KeyboardEvent } from "react";
import Image from "next/image";
import { Controller, useFormContext } from "react-hook-form";
import { Field, FieldGroup, FieldLabel, FieldError } from "@/shared/ui";
import type { EditChallengeFormValues } from "./types";

export function EditChallengeBasicTab() {
  const {
    register,
    control,
    formState: { errors },
  } = useFormContext<EditChallengeFormValues>();

  const [tagInput, setTagInput] = useState("");
  const [tagError, setTagError] = useState("");

  return (
    <FieldGroup className="mt-6 gap-6">
      {/* 챌린지 제목 */}
      <Field className="gap-4">
        <FieldLabel>챌린지 제목</FieldLabel>
        <input
          {...register("title")}
          placeholder="제목을 입력해주세요"
          className="border-border-default h-12 w-full rounded-xl border bg-gray-800 px-3 text-base text-gray-50 outline-none placeholder:text-gray-400"
        />
        {errors.title && <FieldError>{errors.title.message}</FieldError>}
      </Field>

      {/* 챌린지 소개 */}
      <Field className="gap-4">
        <FieldLabel>챌린지 소개</FieldLabel>
        <textarea
          {...register("description")}
          placeholder="챌린지를 소개해주세요"
          className="border-border-default h-32 w-full resize-none rounded-xl border bg-gray-800 px-3 py-3 text-base text-gray-50 outline-none placeholder:text-gray-400"
        />
        {errors.description && (
          <FieldError>{errors.description.message}</FieldError>
        )}
      </Field>

      {/* 태그 */}
      <Field className="mb-12 gap-4">
        <FieldLabel>키워드 입력</FieldLabel>
        <Controller
          name="tags"
          control={control}
          render={({ field }) => {
            const addTag = () => {
              const trimmed = tagInput.trim();
              if (!trimmed) return;
              if (trimmed.length > 6) {
                setTagError("태그는 최대 6자까지 입력 가능합니다");
                return;
              }
              if (field.value.length >= 3) return;
              if (!field.value.includes(trimmed)) {
                field.onChange([...field.value, trimmed]);
              }
              setTagInput("");
              setTagError("");
            };

            const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
              if (e.key === "Enter") {
                e.preventDefault();
                addTag();
              }
            };

            const removeTag = (tag: string) => {
              field.onChange(field.value.filter((t) => t !== tag));
            };

            const isDisabled = field.value.length >= 3;

            return (
              <div className="flex flex-col gap-2">
                <div className="border-border-default flex h-12 items-center rounded-xl border bg-gray-800 px-3">
                  <input
                    value={tagInput}
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                      setTagInput(e.target.value);
                      if (tagError) setTagError("");
                    }}
                    onKeyDown={handleKeyDown}
                    placeholder={
                      isDisabled
                        ? "태그는 최대 3개까지 추가할 수 있습니다"
                        : "태그 키워드 입력"
                    }
                    disabled={isDisabled}
                    className="min-w-0 flex-1 bg-transparent text-base text-gray-50 outline-none placeholder:text-gray-400 disabled:cursor-not-allowed"
                  />
                  <button
                    type="button"
                    onClick={addTag}
                    disabled={isDisabled}
                    className="bg-mint-500 ml-2 shrink-0 rounded-lg px-4 py-1.5 text-sm font-semibold text-white transition-opacity hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-40"
                  >
                    추가
                  </button>
                </div>
                {tagError && <FieldError>{tagError}</FieldError>}
                {field.value.length > 0 && (
                  <div className="flex flex-wrap gap-2">
                    {field.value.map((tag) => (
                      <span
                        key={tag}
                        className="flex items-center gap-2 rounded-sm bg-gray-700 px-2 py-1 text-sm text-gray-200"
                      >
                        #{tag}
                        <button
                          type="button"
                          onClick={() => removeTag(tag)}
                          className="cursor-pointer text-gray-400 hover:text-white"
                        >
                          <Image
                            src="/icons/common/x-icon.svg"
                            alt="삭제"
                            width={12}
                            height={12}
                          />
                        </button>
                      </span>
                    ))}
                  </div>
                )}
              </div>
            );
          }}
        />
      </Field>
    </FieldGroup>
  );
}
