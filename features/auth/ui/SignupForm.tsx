"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { signup } from "@/features/auth/api/signup";
import SocialLoginButtons from "@/features/auth/ui/SocialLoginButtons";
import {
  Button,
  Input,
  Field,
  FieldError,
  FieldGroup,
  FieldLabel,
} from "@/shared/ui";
import { getRandomName } from "@/shared/utils";
import { Eyeclose, Eyeopen, RandomIcon } from "@/shared/icons";

interface SignupFormValues {
  nickname: string;
  email: string;
  password: string;
  passwordConfirm: string;
}

export default function SignupForm() {
  const router = useRouter();

  const [form, setForm] = useState<SignupFormValues>({
    nickname: "",
    email: "",
    password: "",
    passwordConfirm: "",
  });

  const [isPending, setIsPending] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showPasswordConfirm, setShowPasswordConfirm] = useState(false);

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  const nicknameError =
    form.nickname.trim() === ""
      ? "닉네임을 입력해주세요."
      : form.nickname.trim().length < 2 || form.nickname.trim().length > 10
        ? "닉네임은 2자 이상, 10자 이하로 입력해주세요."
        : "";

  const emailError =
    form.email.trim() === ""
      ? "이메일을 입력해주세요."
      : !emailRegex.test(form.email)
        ? "올바른 이메일 형식을 입력해주세요."
        : "";

  const passwordError =
    form.password.trim() === "" ? "비밀번호를 입력해주세요." : "";

  const passwordConfirmError =
    form.passwordConfirm.trim() === ""
      ? "비밀번호를 입력해주세요."
      : form.password !== form.passwordConfirm
        ? "비밀번호가 일치하지 않습니다."
        : "";

  const isValid =
    !nicknameError && !emailError && !passwordError && !passwordConfirmError;

  const isSubmitDisabled = !isValid || isPending;

  const shouldShowError = (value: string) => isSubmitted || value.length > 0;

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

  const handleRandomNickname = () => {
    setForm((prev) => ({
      ...prev,
      nickname: getRandomName(),
    }));
  };

  const handleSubmit = async (e: React.SubmitEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitted(true);

    if (isSubmitDisabled) return;

    setErrorMessage(null);
    setIsPending(true);

    try {
      await signup({
        email: form.email,
        nickname: form.nickname,
        password: form.password,
      });

      router.replace("/login");
    } catch (error) {
      if (error instanceof Error) {
        setErrorMessage(error.message);
      } else {
        setErrorMessage("회원가입에 실패했습니다.");
      }
    } finally {
      setIsPending(false);
    }
  };

  const getInputClassName = (hasError: boolean) =>
    hasError ? "border border-error" : "";

  return (
    <div className="w-full px-5 sm:px-0">
      <div className="my-15 flex w-full max-w-142 flex-col items-center gap-2 rounded-[40px] bg-gray-800 px-14 pt-12 pb-11">
        <form
          onSubmit={handleSubmit}
          className="flex w-full max-w-114 flex-col gap-6"
        >
          <h1 className="text-center text-2xl font-bold text-gray-50">
            회원가입
          </h1>

          <FieldGroup className="gap-2">
            <Field className="gap-1">
              <FieldLabel htmlFor="nickname" required className="text-gray-50">
                닉네임
              </FieldLabel>

              <div className="flex items-center gap-1">
                <Input
                  id="nickname"
                  name="nickname"
                  type="text"
                  value={form.nickname}
                  onChange={handleInputChange}
                  placeholder="닉네임을 입력해주세요"
                  className={getInputClassName(
                    shouldShowError(form.nickname) && !!nicknameError,
                  )}
                />

                <button
                  type="button"
                  onClick={handleRandomNickname}
                  className="text-mint-500 flex shrink-0 items-center gap-1 text-sm"
                >
                  <RandomIcon width={24} height={24} />
                  <span>랜덤설정</span>
                </button>
              </div>

              <FieldError className="min-h-5">
                {shouldShowError(form.nickname) ? nicknameError : ""}
              </FieldError>
            </Field>

            <Field>
              <FieldLabel htmlFor="email" required className="text-gray-50">
                이메일
              </FieldLabel>

              <Input
                id="email"
                name="email"
                type="email"
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
                  aria-label={
                    showPassword ? "비밀번호 숨기기" : "비밀번호 보기"
                  }
                >
                  {showPassword ? (
                    <Eyeopen width={20} height={20} className="text-gray-400" />
                  ) : (
                    <Eyeclose
                      width={20}
                      height={20}
                      className="text-gray-400"
                    />
                  )}
                </button>
              </div>

              <FieldError className="min-h-5">
                {shouldShowError(form.password) ? passwordError : ""}
              </FieldError>
            </Field>

            <Field>
              <FieldLabel
                htmlFor="passwordConfirm"
                required
                className="text-gray-50"
              >
                비밀번호 확인
              </FieldLabel>

              <div className="relative">
                <Input
                  id="passwordConfirm"
                  name="passwordConfirm"
                  type={showPasswordConfirm ? "text" : "password"}
                  value={form.passwordConfirm}
                  onChange={handleInputChange}
                  placeholder="비밀번호를 입력해주세요"
                  className={getInputClassName(
                    shouldShowError(form.passwordConfirm) &&
                      !!passwordConfirmError,
                  )}
                />

                <button
                  type="button"
                  onClick={() => setShowPasswordConfirm((prev) => !prev)}
                  className="absolute top-1/2 right-4 -translate-y-1/2"
                  aria-label={
                    showPasswordConfirm ? "비밀번호 숨기기" : "비밀번호 보기"
                  }
                >
                  {showPassword ? (
                    <Eyeopen width={20} height={20} className="text-gray-400" />
                  ) : (
                    <Eyeclose
                      width={20}
                      height={20}
                      className="text-gray-400"
                    />
                  )}
                </button>
              </div>

              <FieldError className="min-h-5">
                {shouldShowError(form.passwordConfirm)
                  ? passwordConfirmError
                  : ""}
              </FieldError>
            </Field>
          </FieldGroup>

          {errorMessage && <FieldError>{errorMessage}</FieldError>}

          <div className="flex flex-col gap-10">
            <Button
              type="submit"
              variant="primary"
              disabled={isSubmitDisabled}
              className="w-full"
            >
              {isPending ? "회원가입 중..." : "회원가입"}
            </Button>
            {/* <SocialLoginButtons /> */}

            <p className="flex justify-center gap-1 text-sm text-gray-50">
              이미 회원이신가요?
              <Link
                href="/login"
                className="text-mint-500 font-semibold underline"
              >
                로그인
              </Link>
            </p>
          </div>
        </form>
      </div>
    </div>
  );
}
