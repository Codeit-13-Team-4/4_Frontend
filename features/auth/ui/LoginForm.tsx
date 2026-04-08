"use client";

import Image from "next/image";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { useState } from "react";
import { login } from "@/features/auth/api/login";
import { useQueryClient } from "@tanstack/react-query";
import { authKeys } from "@/features/auth/model/auth.queryKey";
import SocialLoginButtons from "@/features/auth/ui/SocialLoginButtons";
import { ApiError } from "@/shared/lib/errors/ApiError";
import {
  Button,
  Field,
  FieldError,
  FieldGroup,
  FieldLabel,
  Input,
} from "@/shared/ui";

interface LoginFormValues {
  email: string;
  password: string;
}

interface LoginFieldErrors {
  email: string | null;
  password: string | null;
}

function getRouteErrorMessage(error: string | null) {
  if (error === "social_account_exists") {
    return "해당 이메일은 다른 소셜 계정으로 가입되어 있습니다. 해당 소셜 계정으로 로그인해주세요.";
  }

  if (error === "social_email_exists") {
    return "이미 가입된 이메일입니다. 기존 계정으로 로그인해주세요.";
  }

  if (error === "social_login_failed") {
    return "로그인에 실패했습니다. 잠시 후 다시 시도해주세요.";
  }

  if (error === "invalid_social_callback") {
    return "로그인 정보를 다시 확인해주세요.";
  }

  return null;
}

export default function LoginForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const queryClient = useQueryClient();

  const [form, setForm] = useState<LoginFormValues>({
    email: "",
    password: "",
  });

  const [isPending, setIsPending] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [serverFieldErrors, setServerFieldErrors] = useState<LoginFieldErrors>({
    email: null,
    password: null,
  });
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  const routeErrorMessage = getRouteErrorMessage(searchParams.get("error"));

  const emailError =
    form.email.trim() === ""
      ? "이메일을 입력해주세요."
      : form.email.includes(" ")
        ? "이메일에는 공백을 포함할 수 없습니다."
        : !emailRegex.test(form.email)
          ? "이메일 형식이 올바르지 않습니다."
          : (serverFieldErrors.email ?? "");

  const passwordError =
    form.password.trim() === ""
      ? "비밀번호를 입력해주세요."
      : (serverFieldErrors.password ?? "");

  const isValid = !emailError && !passwordError;
  const isSubmitDisabled = !isValid || isPending;
  const displayErrorMessage = errorMessage ?? routeErrorMessage;

  const shouldShowError = (value: string) => isSubmitted || value.length > 0;

  const getInputClassName = (hasError: boolean) =>
    hasError
      ? "border border-error bg-gray-800"
      : "border border-gray-700 bg-gray-800 ";

  const getLoginFieldError = (error: unknown) => {
    if (!(error instanceof ApiError)) return null;

    if (error.status === 404) {
      if (error.message.includes("존재하지 않는")) {
        return {
          field: "email" as const,
          message: "존재하지 않는 아이디입니다.",
        };
      }

      return {
        field: "password" as const,
        message: "비밀번호나 아이디가 일치하지 않습니다.",
      };
    }

    return null;
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    setForm((prev) => ({
      ...prev,
      [name]: value,
    }));

    if (name === "email") {
      setServerFieldErrors({
        email: null,
        password: null,
      });
    }

    if (name === "password") {
      setServerFieldErrors((prev) => ({
        ...prev,
        password: null,
      }));
    }

    if (errorMessage) {
      setErrorMessage(null);
    }
  };

  const handleSubmit = async (e: React.SubmitEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitted(true);

    if (isSubmitDisabled) return;

    setErrorMessage(null);
    setIsPending(true);

    try {
      await login({ email: form.email, password: form.password });

      await queryClient.resetQueries({ queryKey: authKeys.me() });
      router.replace("/mypage");
    } catch (error) {
      const fieldError = getLoginFieldError(error);

      if (fieldError) {
        setServerFieldErrors((prev) => ({
          ...prev,
          [fieldError.field]: fieldError.message,
        }));
      } else if (error instanceof Error) {
        setErrorMessage(error.message);
      } else {
        setErrorMessage("로그인에 실패했습니다.");
      }
    } finally {
      setIsPending(false);
    }
  };

  return (
    <div className="flex w-full max-w-142 flex-col items-center gap-2 rounded-[40px] bg-gray-800 px-14 pt-12 pb-11">
      <form
        onSubmit={handleSubmit}
        className="flex w-full max-w-114 flex-col gap-6"
      >
        <h1 className="text-center text-2xl font-bold text-gray-50">로그인</h1>

        <FieldGroup className="gap-2">
          <Field>
            <FieldLabel htmlFor="email" required className="text-gray-50">
              이메일
            </FieldLabel>
            <Input
              id="email"
              name="email"
              type="email"
              required
              value={form.email}
              onChange={handleInputChange}
              placeholder="이메일을 입력해주세요"
              className={getInputClassName(
                shouldShowError(form.email) && !!emailError,
              )}
            />
            <FieldError className="min-h-5">
              {shouldShowError(form.email) ? emailError : ""}
            </FieldError>
          </Field>

          <Field>
            <FieldLabel htmlFor="password" required className="text-gray-50">
              비밀번호
            </FieldLabel>

            <div className="relative">
              <Input
                id="password"
                name="password"
                type={showPassword ? "text" : "password"}
                required
                value={form.password}
                onChange={handleInputChange}
                placeholder="비밀번호를 입력해주세요"
                className={getInputClassName(
                  shouldShowError(form.password) && !!passwordError,
                )}
              />

              <button
                type="button"
                onClick={() => setShowPassword((prev) => !prev)}
                className="absolute top-1/2 right-4 -translate-y-1/2"
                aria-label={showPassword ? "비밀번호 숨기기" : "비밀번호 보기"}
              >
                <Image
                  src={
                    showPassword ? "/auth/eyeopen.svg" : "/auth/eyeclose.svg"
                  }
                  alt={showPassword ? "비밀번호 보이기" : "비밀번호 숨기기"}
                  width={24}
                  height={24}
                />
              </button>
            </div>

            <FieldError className="min-h-5">
              {shouldShowError(form.password) ? passwordError : ""}
            </FieldError>
          </Field>
        </FieldGroup>

        {displayErrorMessage && <FieldError>{displayErrorMessage}</FieldError>}

        <div className="flex flex-col gap-10">
          <div className="flex flex-col gap-2">
            <Button
              type="submit"
              variant="primary"
              disabled={isSubmitDisabled}
              className="w-full"
            >
              {isPending ? "로그인 중..." : "로그인"}
            </Button>

            <p className="flex justify-center gap-1 text-sm text-gray-50">
              서비스가 처음이신가요?
              <Link
                href="/signup"
                className="text-mint-500 font-semibold underline"
              >
                회원가입
              </Link>
            </p>
          </div>

          <SocialLoginButtons />
        </div>
      </form>
    </div>
  );
}
