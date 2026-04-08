"use client";

import { UseFormRegister, FieldErrors } from "react-hook-form";
import { Input, Field, FieldLabel, FieldError } from "@/shared/ui";
import { PROFILE_LINK_ITEMS } from "@/features/mypage/model/mypage.constants";
import { UpdateProfileRequest } from "../model/edit.type";

const URL_PATTERN = /^https?:\/\/.+/;

interface Props {
  register: UseFormRegister<UpdateProfileRequest>;
  errors: FieldErrors<UpdateProfileRequest>;
}

export default function ProfileLinkFields({ register, errors }: Props) {
  return (
    <div className="flex flex-col gap-3">
      {PROFILE_LINK_ITEMS.map(({ key, label }) => (
        <Field key={key}>
          <FieldLabel className="text-sm text-gray-400">{label}</FieldLabel>
          <Input
            {...register(key, {
              validate: (value) =>
                !value ||
                URL_PATTERN.test(value) ||
                "올바른 URL 형식을 입력해주세요.",
            })}
            placeholder="https://"
            size="lg"
          />
          {errors[key] && <FieldError>{errors[key]?.message}</FieldError>}
        </Field>
      ))}
    </div>
  );
}
