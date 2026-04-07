import { getMeServer } from "@/features/auth/api/getMeServer";
import SignupForm from "@/features/auth/ui/SignupForm";
import SocialSignupForm from "@/features/auth/ui/SocialSignupForm";
import { type SocialType } from "@/features/auth/api/socialLogin";
import { redirect } from "next/navigation";

interface SignupPageProps {
  searchParams: Promise<{
    token?: string;
    type?: string;
    email?: string;
    name?: string;
  }>;
}

function isValidSocialType(value: string): value is SocialType {
  return value === "google" || value === "kakao" || value === "github";
}

export default async function SignupPage({ searchParams }: SignupPageProps) {
  const user = await getMeServer();

  if (user) {
    redirect("/mypage");
  }

  const params = await searchParams;

  const token = params.token;
  const type = params.type;
  const email = params.email;

  const isSocialSignup =
    !!token && !!email && !!type && isValidSocialType(type);

  return (
    <div className="flex min-h-screen items-center justify-center">
      {isSocialSignup ? (
        <SocialSignupForm token={token} type={type} email={email} />
      ) : (
        // 쿼리파라미터가 있으면 여길로 렌더링 -> 소셜 회원가입용 폼
        <SignupForm /> //없으면 여기로 랜더링 -> 일반 회원가입 폼
      )}
    </div>
  );
}
