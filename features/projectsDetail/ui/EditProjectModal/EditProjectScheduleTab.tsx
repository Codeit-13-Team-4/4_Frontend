"use client";

import { useState, useRef, useEffect } from "react";
import { Controller, useFormContext } from "react-hook-form";
import { type DateRange } from "react-day-picker";
import { Field, FieldGroup, FieldLabel, Input } from "@/shared/ui";
import { DatePicker } from "@/shared/ui/DatePicker/DatePicker";
import { CONTACT_METHOD } from "@/features/projectsDetail/model/projects.constants";
import type { ContactMethodType } from "@/features/projectsDetail/types/projectsDetail";
import type { EditFormValues } from "./types";

const CONTACT_METHOD_ENTRIES = Object.entries(CONTACT_METHOD) as [
  ContactMethodType,
  string,
][];

export function EditProjectScheduleTab() {
  const { register, control } = useFormContext<EditFormValues>();
  const [contactOpen, setContactOpen] = useState(false);
  const contactRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (
        contactRef.current &&
        !contactRef.current.contains(e.target as Node)
      ) {
        setContactOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <FieldGroup className="gap-12">
      {/* 모집 마감 날짜 */}
      <Field className="mt-8">
        <FieldLabel>모집 마감 날짜</FieldLabel>
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
      </Field>

      {/* 시작일 / 종료일 */}
      <Field>
        <Controller
          name="projectDateRange"
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

      {/* 연락 방법 */}
      <Field>
        <FieldLabel>연락 방법</FieldLabel>
        <Controller
          name="contactMethod"
          control={control}
          render={({ field }) => (
            <div ref={contactRef} className="relative">
              <button
                type="button"
                onClick={() => setContactOpen((prev) => !prev)}
                className="border-border-default flex h-12 w-full cursor-pointer items-center justify-between rounded-xl border bg-gray-900 px-3 transition-colors"
              >
                <span className="text-base text-gray-50">
                  {CONTACT_METHOD[field.value as keyof typeof CONTACT_METHOD] ??
                    "연락 방법 선택"}
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
                  style={{
                    transform: contactOpen ? "rotate(180deg)" : "rotate(0deg)",
                  }}
                >
                  <path d="m6 9 6 6 6-6" />
                </svg>
              </button>

              {contactOpen && (
                <ul className="absolute top-full left-0 z-10 mt-1 max-h-48 w-full overflow-y-auto rounded-xl border border-gray-600 bg-gray-800 shadow-lg">
                  {CONTACT_METHOD_ENTRIES.map(([key, label]) => (
                    <li key={key}>
                      <button
                        type="button"
                        onMouseDown={(e) => e.preventDefault()}
                        onClick={() => {
                          field.onChange(key);
                          setContactOpen(false);
                        }}
                        className={`w-full px-3 py-2.5 text-left text-sm transition-colors hover:bg-gray-700 ${
                          field.value === key
                            ? "text-mint-500"
                            : "text-gray-200"
                        }`}
                      >
                        {label}
                      </button>
                    </li>
                  ))}
                </ul>
              )}
            </div>
          )}
        />
      </Field>

      {/* 연락 링크 */}
      <Field>
        <FieldLabel>연락 링크</FieldLabel>
        <Input
          placeholder="연락 링크를 입력해주세요"
          {...register("contactLink")}
        />
      </Field>

      {/* 모집 인원 */}
      <Field className="mb-8">
        <FieldLabel>모집 인원</FieldLabel>
        <Input
          type="number"
          min={1}
          placeholder="모집 인원을 입력해주세요"
          {...register("maxMembers", { valueAsNumber: true })}
          className="[appearance:textfield] [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none"
        />
      </Field>
    </FieldGroup>
  );
}
