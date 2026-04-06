"use client";
import { Button, FieldGroup } from "@/shared/ui";
import { useState } from "react";
import NicknameInput from "./NicknameInput";
import { getRandomName } from "@/shared/utils/randomName/randomName";
import { useRouter } from "next/navigation";
import { socialSignup } from "@/features/auth/api/signup";
import EmailInput from "./EmailInput";
import Link from "next/link";

interface SocialSignupFormProps {
  type: string;
  email: string;
  token?: string;
}

export interface SocialSignupFormValues extends SocialSignupFormProps {
  nickname: string;
}

const SocialSignupForm = (props: SocialSignupFormProps) => {
  const { type, email, token } = props;
  const router = useRouter();

  const [form, setForm] = useState<SocialSignupFormValues>({
    type: type,
    nickname: getRandomName(),
    email: email,
  });

  const [errorMessage, setErrorMessage] = useState<string | null>("");
  const [isPending, setIsPending] = useState<boolean>(false);

  const handleSubmit = async (e: React.SubmitEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsPending(true);

    setErrorMessage(null);

    try {
      if (!form.email || !form.nickname) {
        setErrorMessage("정보를 입력해주세요");
        return;
      }
      if (!token) {
        return;
      }

      await socialSignup({
        type: type,
        token: token,
        nickname: form.nickname,
      });

      router.replace("/");
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

  return (
    <div className="my-15 flex w-full max-w-142 flex-col items-center gap-2 rounded-[40px] bg-gray-800 px-14 pt-12 pb-11">
      <form
        onSubmit={handleSubmit}
        className="flex w-full max-w-114 flex-col gap-6"
      >
        <h1 className="text-center text-2xl font-bold text-gray-50">
          소셜 회원가입
        </h1>

        <FieldGroup className="gap-2">
          <NicknameInput
            nickName={form.nickname}
            isPending={isPending}
            setForm={setForm}
          />
          <EmailInput
            setForm={setForm}
            isDisabled
            email={form.email}
            isPending={isPending}
          />
        </FieldGroup>

        <div className="flex flex-col gap-10">
          <Button
            type="submit"
            variant="primary"
            disabled={isPending}
            className="w-full"
          >
            {isPending ? "회원가입 중..." : "회원가입"}
          </Button>
        </div>
      </form>
    </div>
  );
};

export default SocialSignupForm;
