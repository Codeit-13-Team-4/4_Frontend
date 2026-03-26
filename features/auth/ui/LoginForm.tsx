"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useAuthStore } from "@/features/auth/model/authStore";
import { login } from "@/features/auth/api/login";
import {
  Button,
  Field,
  FieldError,
  FieldGroup,
  FieldLabel,
  Input,
} from "@/shared/ui";
import SocialLoginButtons from "@/features/auth/ui/SocialLoginButtons";

interface LoginSubmitButtonProps {
  disabled: boolean;
  isPending: boolean;
}

function LoginSubmitButton({ disabled, isPending }: LoginSubmitButtonProps) {
  return (
    <Button type="submit" disabled={disabled} className="w-full">
      {isPending ? "로그인 중..." : "로그인"}
    </Button>
  );
}

export default function LoginForm() {
  const router = useRouter();
  const setUser = useAuthStore((state) => state.setUser);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [isPending, setIsPending] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  const emailError =
    email.trim() === ""
      ? "이메일을 입력해주세요."
      : !emailRegex.test(email)
        ? "이메일 형식이 올바르지 않습니다."
        : "";

  const passwordError =
    password.trim() === "" ? "비밀번호를 입력해주세요." : "";

  const isValid = !emailError && !passwordError;
  const isSubmitDisabled = !isValid || isPending;

  const showEmailError = isSubmitted || email.length > 0;
  const showPasswordError = isSubmitted || password.length > 0;

  const getInputClassName = (hasError: boolean) =>
    hasError ? "border border-error" : "";

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitted(true);

    if (isSubmitDisabled) return;

    setErrorMessage(null);
    setIsPending(true);

    try {
      const data = await login({
        email,
        password,
      });

      setUser(data.user);
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
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="이메일을 입력해주세요"
              className={getInputClassName(showEmailError && !!emailError)}
            />
            <FieldError className="min-h-5">
              {showEmailError ? emailError : ""}
            </FieldError>
          </Field>

          <Field>
            <FieldLabel htmlFor="password" required className="text-gray-50">
              비밀번호
            </FieldLabel>
            <Input
              id="password"
              type="password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="비밀번호를 입력해주세요"
              className={getInputClassName(
                showPasswordError && !!passwordError,
              )}
            />
            <FieldError className="min-h-5">
              {showPasswordError ? passwordError : ""}
            </FieldError>
          </Field>
        </FieldGroup>

        {errorMessage && <FieldError>{errorMessage}</FieldError>}

        <div className="flex flex-col gap-10">
          <div className="flex flex-col gap-2">
            <LoginSubmitButton
              disabled={isSubmitDisabled}
              isPending={isPending}
            />

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
