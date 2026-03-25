"use client";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import RandomIcon from "@/public/auth/randomIcon.svg";
import { signup } from "@/features/auth/api/signup";
import { Button, Input, Label } from "@/shared/ui";
import { getRandomName } from "@/shared/utils/randomName/randomName";

interface SignupSubmitButtonProps {
  disabled: boolean;
  isPending: boolean;
}

function SignupSubmitButton({ disabled, isPending }: SignupSubmitButtonProps) {
  return (
    <Button
      type="submit"
      variant="primary"
      disabled={disabled}
      className="w-full"
    >
      {isPending ? "회원가입 중..." : "회원가입"}
    </Button>
  );
}

export default function SignupForm() {
  const router = useRouter();

  const [nickname, setNickname] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordConfirm, setPasswordConfirm] = useState("");

  const [isPending, setIsPending] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  const nicknameError =
    nickname.trim() === ""
      ? "닉네임을 입력해주세요."
      : nickname.trim().length < 2 || nickname.trim().length > 10
        ? "닉네임은 2자 이상, 10자 이하로 입력해주세요."
        : "";

  const emailError =
    email.trim() === ""
      ? "이메일을 입력해주세요."
      : !emailRegex.test(email)
        ? "올바른 이메일 형식을 입력해주세요."
        : "";

  const passwordError =
    password.trim() === "" ? "비밀번호를 입력해주세요." : "";

  const passwordConfirmError =
    passwordConfirm.trim() === ""
      ? "비밀번호를 입력해주세요."
      : password !== passwordConfirm
        ? "비밀번호가 일치하지 않습니다."
        : "";

  const isValid =
    !nicknameError && !emailError && !passwordError && !passwordConfirmError;

  const isSubmitDisabled = !isValid || isPending;

  const showNicknameError = isSubmitted || nickname.length > 0;
  const showEmailError = isSubmitted || email.length > 0;
  const showPasswordError = isSubmitted || password.length > 0;
  const showPasswordConfirmError = isSubmitted || passwordConfirm.length > 0;

  const handleRandomNickname = () => {
    const randomName = getRandomName();
    setNickname(randomName);
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitted(true);

    if (isSubmitDisabled) return;

    setErrorMessage(null);
    setIsPending(true);

    try {
      await signup({
        email,
        nickname,
        password,
        passwordConfirm,
      });

      router.replace("/login");
    } catch (error) {
      if (error instanceof Error) {
        setErrorMessage(error.message);
        console.error(error);
      } else {
        setErrorMessage("회원가입에 실패했습니다.");
      }
    } finally {
      setIsPending(false);
    }
  };

  const getInputClassName = (hasError: boolean) =>
    hasError ? "border-error" : "";

  return (
    <div className="my-15 flex w-full max-w-142 flex-col items-center gap-2 rounded-[40px] bg-gray-800 px-14 pt-12 pb-11">
      <form
        onSubmit={handleSubmit}
        className="flex w-full max-w-114 flex-col gap-6"
      >
        <div className="flex flex-col gap-10">
          <h1 className="text-center text-2xl font-bold text-gray-50">
            회원가입
          </h1>
        </div>

        <div className="flex flex-col gap-2">
          <div className="flex flex-col gap-1">
            <Label htmlFor="nickname" className="text-sm font-medium">
              닉네임 <span className="text-mint-500">*</span>
            </Label>

            <div className="flex items-center gap-1">
              <Input
                id="nickname"
                type="text"
                value={nickname}
                onChange={(e) => setNickname(e.target.value)}
                placeholder="닉네임을 입력해주세요"
                className={getInputClassName(
                  showNicknameError && !!nicknameError,
                )}
              />

              <button
                type="button"
                onClick={handleRandomNickname}
                className="flex shrink-0 items-center gap-1 text-sm text-green-500"
              >
                <Image
                  src={RandomIcon}
                  alt="랜덤설정 아이콘"
                  width={24}
                  height={24}
                />
                <span>랜덤설정</span>
              </button>
            </div>

            <p className="text-error min-h-5 text-sm">
              {showNicknameError ? nicknameError : ""}
            </p>
          </div>

          <div className="flex flex-col gap-3">
            <Label htmlFor="email" className="text-sm font-medium">
              이메일 <span className="text-mint-500">*</span>
            </Label>

            <Input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="이메일을 입력해주세요"
              className={getInputClassName(showEmailError && !!emailError)}
            />

            <p className="text-error min-h-5 text-sm">
              {showEmailError ? emailError : ""}
            </p>
          </div>

          <div className="flex flex-col gap-3">
            <Label htmlFor="password" className="text-sm font-medium">
              비밀번호 <span className="text-mint-500">*</span>
            </Label>

            <Input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="비밀번호를 입력해주세요"
              className={getInputClassName(
                showPasswordError && !!passwordError,
              )}
            />

            <p className="text-error min-h-5 text-sm">
              {showPasswordError ? passwordError : ""}
            </p>
          </div>

          <div className="flex flex-col gap-3">
            <Label htmlFor="passwordConfirm" className="text-sm font-medium">
              비밀번호 확인 <span className="text-mint-500">*</span>
            </Label>

            <Input
              id="passwordConfirm"
              type="password"
              value={passwordConfirm}
              onChange={(e) => setPasswordConfirm(e.target.value)}
              placeholder="비밀번호를 입력해주세요"
              className={getInputClassName(
                showPasswordConfirmError && !!passwordConfirmError,
              )}
            />

            <p className="text-error min-h-5 text-sm">
              {showPasswordConfirmError ? passwordConfirmError : ""}
            </p>
          </div>
        </div>

        {errorMessage && <p className="text-error text-sm">{errorMessage}</p>}

        <div className="flex flex-col gap-10">
          <div className="flex flex-col gap-2">
            <SignupSubmitButton
              disabled={isSubmitDisabled}
              isPending={isPending}
            />
          </div>

          <div className="flex flex-col gap-4">
            <div className="flex w-full items-center gap-4">
              <div className="h-px flex-1 bg-slate-300" />
              <span className="shrink-0 text-sm text-slate-500">
                SNS 계정으로 로그인
              </span>
              <div className="h-px flex-1 bg-slate-300" />
            </div>

            <div className="flex flex-col gap-3">
              <Button
                type="button"
                variant="outline"
                className="w-full bg-white text-slate-800"
              >
                <div className="flex items-center gap-3">
                  <span>로고</span>
                  <span>구글로 계속하기</span>
                </div>
              </Button>

              <Button
                type="button"
                variant="secondary"
                className="w-full bg-[#FFEE01] text-slate-800 hover:bg-[#f5e400]"
              >
                <div className="flex items-center gap-3">
                  <span>로고</span>
                  <span>카카오로 계속하기</span>
                </div>
              </Button>

              <Button
                type="button"
                variant="outline"
                className="w-full bg-white text-slate-800"
              >
                <div className="flex items-center gap-3">
                  <span>로고</span>
                  <span>Github로 계속하기</span>
                </div>
              </Button>
            </div>
          </div>
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
  );
}
