"use client";

import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { login } from "@/features/auth/api/login";
import SocialLoginButtons from "@/features/auth/ui/SocialLoginButtons";
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

export default function LoginForm() {
  const router = useRouter();

  const [form, setForm] = useState<LoginFormValues>({
    email: "",
    password: "",
  });

  const [isPending, setIsPending] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  const emailError =
    form.email.trim() === ""
      ? "이메일을 입력해주세요."
      : !emailRegex.test(form.email)
        ? "이메일 형식이 올바르지 않습니다."
        : "";

  const passwordError =
    form.password.trim() === "" ? "비밀번호를 입력해주세요." : "";

  const isValid = !emailError && !passwordError;
  const isSubmitDisabled = !isValid || isPending;

  const shouldShowError = (value: string) => isSubmitted || value.length > 0;

  const getInputClassName = (hasError: boolean) =>
    hasError
      ? "border border-error bg-gray-800"
      : "border border-gray-700 bg-gray-800 ";

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    setForm((prev) => ({
      ...prev,
      [name]: value,
    }));

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

      router.replace("/");
    } catch (error) {
      if (error instanceof Error) {
        setErrorMessage(error.message);
      } else {
        setErrorMessage("로그인에 실패했습니다.");
      }
    } finally {
      setIsPending(false);
    }
  };

  return (
    <div className="my-15 flex w-full max-w-142 flex-col items-center gap-2 rounded-[40px] bg-gray-800 px-14 pt-12 pb-11">
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

        {errorMessage && <FieldError>{errorMessage}</FieldError>}

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
