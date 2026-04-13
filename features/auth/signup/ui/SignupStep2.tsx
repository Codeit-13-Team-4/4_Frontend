"use client";

import { useState } from "react";
import { useFormContext } from "react-hook-form";
import {
  Github,
  Google,
  Kakao,
  Eyeclose,
  Eyeopen,
  RandomIcon,
} from "@/shared/icons";
import { Field, FieldError, FieldGroup, FieldLabel, Input } from "@/shared/ui";
import { getRandomName } from "@/shared/utils";
import type {
  SignupAccountMode,
  SignupFormValues,
  SocialSignupContext,
} from "../model/signupForm";

const SOCIAL_PROVIDER_LABELS = {
  google: "Google",
  kakao: "Kakao",
  github: "GitHub",
} as const;

function getInputClassName({
  hasError,
  hasValue,
  hasTrailingIcon = false,
  readOnly = false,
}: {
  hasError: boolean;
  hasValue: boolean;
  hasTrailingIcon?: boolean;
  readOnly?: boolean;
}) {
  return [
    "h-[60px] rounded-[18px] border bg-[#243043] px-5 text-base text-[#F8FAFC] placeholder:text-[#94A3B8] transition-colors",
    hasTrailingIcon ? "pr-14" : "",
    readOnly ? "cursor-default" : "",
    hasError
      ? "border-error hover:border-error focus:border-error focus-visible:border-error"
      : hasValue
        ? "border-[#00D7A0] hover:border-[#00D7A0] focus:border-[#00D7A0] focus-visible:border-[#00D7A0]"
        : "border-[#34455E] hover:border-[#00D7A0] focus:border-[#00D7A0] focus-visible:border-[#00D7A0]",
  ].join(" ");
}

interface SignupStep2Props {
  accountMode: SignupAccountMode;
  socialSignup?: SocialSignupContext;
}

interface SignupNicknameFieldProps {
  hasError: boolean;
  hasValue: boolean;
  message?: string;
  registerProps: ReturnType<
    ReturnType<typeof useFormContext<SignupFormValues>>["register"]
  >;
  onRandomClick: () => void;
}

interface SignupEmailFieldProps {
  hasError: boolean;
  hasValue: boolean;
  message?: string;
  readOnly?: boolean;
  registerProps: ReturnType<
    ReturnType<typeof useFormContext<SignupFormValues>>["register"]
  >;
}

interface PasswordFieldProps {
  id: "password" | "passwordConfirm";
  label: "비밀번호" | "비밀번호 확인";
  hasError: boolean;
  hasValue: boolean;
  message?: string;
  isVisible: boolean;
  registerProps: ReturnType<
    ReturnType<typeof useFormContext<SignupFormValues>>["register"]
  >;
  onToggleVisibility: () => void;
}

function AccountStepHeader() {
  return (
    <div className="flex flex-col gap-3 text-center">
      <h2 className="text-[32px] leading-tight font-semibold text-gray-50 md:text-[40px]">
        계정 정보 입력
      </h2>
      <p className="text-base text-gray-400 md:text-lg">
        입력하신 정보로 계정이 생성돼요
      </p>
    </div>
  );
}

function SocialSignupSummary({
  socialSignup,
}: {
  socialSignup: SocialSignupContext;
}) {
  return (
    <div className="rounded-[24px] border border-gray-700 bg-gray-900/70 p-4">
      <div className="flex items-center gap-3">
        <div className="flex size-10 items-center justify-center rounded-2xl bg-white">
          <SocialProviderIcon type={socialSignup.type} className="size-5" />
        </div>
        <div className="space-y-1">
          <p className="text-sm text-gray-400">가입 방식</p>
          <p className="text-base font-semibold text-gray-50">
            {SOCIAL_PROVIDER_LABELS[socialSignup.type]} 소셜 회원가입
          </p>
        </div>
      </div>

      <div className="mt-4 rounded-2xl border border-gray-700 bg-gray-800/80 p-4">
        <p className="text-sm text-gray-400">이메일</p>
        <p className="mt-1 text-base font-medium break-all text-gray-50">
          {socialSignup.email}
        </p>
      </div>
    </div>
  );
}

function NicknameField({
  hasError,
  hasValue,
  message,
  registerProps,
  onRandomClick,
}: SignupNicknameFieldProps) {
  return (
    <Field>
      <FieldLabel
        htmlFor="nickname"
        required
        className="text-base text-gray-50"
      >
        닉네임
      </FieldLabel>

      <div className="flex items-center gap-2">
        <Input
          id="nickname"
          type="text"
          placeholder="닉네임을 입력해주세요"
          {...registerProps}
          className={getInputClassName({
            hasError,
            hasValue,
          })}
        />

        <button
          type="button"
          onClick={onRandomClick}
          className="flex shrink-0 items-center gap-1 text-sm font-medium text-gray-400 transition-colors hover:text-gray-100"
        >
          <RandomIcon width={20} height={20} />
          <span>랜덤설정</span>
        </button>
      </div>

      <FieldError className="min-h-5">{message ?? ""}</FieldError>
    </Field>
  );
}

function EmailField({
  hasError,
  hasValue,
  message,
  readOnly = false,
  registerProps,
}: SignupEmailFieldProps) {
  return (
    <Field>
      <FieldLabel htmlFor="email" required className="text-base text-gray-50">
        이메일
      </FieldLabel>

      <Input
        id="email"
        type="email"
        readOnly={readOnly}
        placeholder={readOnly ? undefined : "이메일을 입력해주세요"}
        {...registerProps}
        className={getInputClassName({
          hasError,
          hasValue,
          readOnly,
        })}
      />

      <FieldError className="min-h-5">{message ?? ""}</FieldError>
    </Field>
  );
}

function PasswordField({
  id,
  label,
  hasError,
  hasValue,
  message,
  isVisible,
  registerProps,
  onToggleVisibility,
}: PasswordFieldProps) {
  return (
    <Field>
      <FieldLabel htmlFor={id} required className="text-base text-gray-50">
        {label}
      </FieldLabel>

      <div className="relative">
        <Input
          id={id}
          type={isVisible ? "text" : "password"}
          placeholder="비밀번호를 입력해주세요"
          {...registerProps}
          className={getInputClassName({
            hasError,
            hasValue,
            hasTrailingIcon: true,
          })}
        />

        <button
          type="button"
          onClick={onToggleVisibility}
          className="absolute top-1/2 right-4 -translate-y-1/2"
          aria-label={isVisible ? "비밀번호 숨기기" : "비밀번호 보기"}
        >
          {isVisible ? (
            <Eyeopen width={24} height={24} className="text-gray-400" />
          ) : (
            <Eyeclose width={24} height={24} className="text-gray-400" />
          )}
        </button>
      </div>

      <FieldError className="min-h-5">{message ?? ""}</FieldError>
    </Field>
  );
}

function SocialProviderIcon({
  type,
  className,
}: {
  type: SocialSignupContext["type"];
  className?: string;
}) {
  if (type === "google") {
    return <Google className={className} />;
  }

  if (type === "kakao") {
    return <Kakao className={className} />;
  }

  return <Github className={className} />;
}

export default function SignupStep2({
  accountMode,
  socialSignup,
}: SignupStep2Props) {
  const {
    register,
    setValue,
    watch,
    formState: { errors },
  } = useFormContext<SignupFormValues>();
  const [showPassword, setShowPassword] = useState(false);
  const [showPasswordConfirm, setShowPasswordConfirm] = useState(false);

  const nicknameRegister = register("nickname");
  const emailRegister = register("email");
  const nicknameValue = watch("nickname");
  const emailValue = watch("email");
  const passwordValue = watch("password");
  const passwordConfirmValue = watch("passwordConfirm");
  const isSocialSignup = accountMode === "social" && !!socialSignup;

  const handleRandomNickname = () => {
    setValue("nickname", getRandomName(), {
      shouldDirty: true,
      shouldValidate: true,
    });
  };

  return (
    <div className="flex w-full flex-col gap-12 md:gap-14">
      <AccountStepHeader />

      <div
        className={`mx-auto w-full max-w-[560px]${
          isSocialSignup ? "flex flex-col gap-6" : ""
        }`}
      >
        {isSocialSignup && socialSignup ? (
          <SocialSignupSummary socialSignup={socialSignup} />
        ) : null}

        <FieldGroup className="gap-1">
          <NicknameField
            hasError={!!errors.nickname}
            hasValue={nicknameValue.trim().length > 0}
            message={errors.nickname?.message}
            registerProps={nicknameRegister}
            onRandomClick={handleRandomNickname}
          />

          <EmailField
            hasError={!!errors.email}
            hasValue={emailValue.trim().length > 0}
            message={errors.email?.message}
            readOnly={isSocialSignup}
            registerProps={emailRegister}
          />

          {!isSocialSignup ? (
            <>
              <PasswordField
                id="password"
                label="비밀번호"
                hasError={!!errors.password}
                hasValue={passwordValue.trim().length > 0}
                message={errors.password?.message}
                isVisible={showPassword}
                registerProps={register("password")}
                onToggleVisibility={() => setShowPassword((prev) => !prev)}
              />

              <PasswordField
                id="passwordConfirm"
                label="비밀번호 확인"
                hasError={!!errors.passwordConfirm}
                hasValue={passwordConfirmValue.trim().length > 0}
                message={errors.passwordConfirm?.message}
                isVisible={showPasswordConfirm}
                registerProps={register("passwordConfirm")}
                onToggleVisibility={() =>
                  setShowPasswordConfirm((prev) => !prev)
                }
              />
            </>
          ) : null}
        </FieldGroup>
      </div>
    </div>
  );
}
