"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useAuthStore } from "@/features/auth/model/authStore";
import { login } from "@/features/auth/api/login";
import { Button, Input, Label } from "@/shared/ui";

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

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  const isValid =
    email.trim() !== "" && emailRegex.test(email) && password.trim() !== "";

  const isSubmitDisabled = !isValid || isPending;

  const handleSubmit = async (e: React.SubmitEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (isSubmitDisabled) return;

    setErrorMessage(null);
    setIsPending(true);

    try {
      const data = await login({ email, password });
      setUser(data.user);
      router.replace("/");
    } catch (error) {
      if (error instanceof Error) {
        setErrorMessage(error.message);
        console.error(error);
      } else {
        setErrorMessage("로그인에 실패했습니다.");
      }
    } finally {
      setIsPending(false);
    }
  };

  return (
    <div className="flex w-full max-w-142 flex-col items-center gap-2 rounded-[40px] bg-white px-14 pt-12 pb-11">
      <form
        onSubmit={handleSubmit}
        className="flex w-full max-w-114 flex-col gap-6"
      >
        <div className="flex flex-col gap-10">
          <h1 className="text-center text-2xl font-bold text-gray-900">
            로그인
          </h1>

          <div className="flex flex-col gap-4">
            <div className="flex flex-col gap-3">
              <Label htmlFor="email" className="text-sm font-medium">
                아이디
              </Label>
              <Input
                id="email"
                type="email"
                placeholder="이메일을 입력해주세요"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>

            <div className="flex flex-col gap-3">
              <Label htmlFor="password" className="text-sm font-medium">
                비밀번호
              </Label>
              <Input
                id="password"
                type="password"
                placeholder="비밀번호를 입력해주세요"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
          </div>
        </div>

        <div className="flex flex-col gap-10">
          <div className="flex flex-col gap-2">
            <LoginSubmitButton
              disabled={isSubmitDisabled}
              isPending={isPending}
            />

            {errorMessage && (
              <p className="text-sm text-red-500">{errorMessage}</p>
            )}
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
              <Button type="button" variant="outline" className="w-full">
                <div className="flex items-center gap-3">
                  <span>로고</span>
                  <span>구글로 계속하기</span>
                </div>
              </Button>

              <Button
                type="button"
                variant="secondary"
                className="w-full bg-[#FFEE01]"
              >
                <div className="flex items-center gap-3">
                  <span>로고</span>
                  <span>카카오로 계속하기</span>
                </div>
              </Button>

              <Button type="button" variant="outline" className="w-full">
                <div className="flex items-center gap-3">
                  <span>로고</span>
                  <span>Github로 계속하기</span>
                </div>
              </Button>
            </div>
          </div>

          <p className="flex justify-center gap-1 text-sm text-gray-800">
            서비스가 처음이신가요?
            <Link
              href="/signup"
              className="border-b font-medium text-green-600"
            >
              회원가입
            </Link>
          </p>
        </div>
      </form>
    </div>
  );
}
