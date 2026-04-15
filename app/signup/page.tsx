import { getMeServer } from "@/features/auth/api/getMeServer";
import { getSafeRedirectPath } from "@/features/auth/lib/authRedirect";
import { type SocialType } from "@/features/auth/api/socialLogin";
import SignupForm from "@/features/auth/signup/ui/SignupForm";
import { redirect } from "next/navigation";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "회원가입",
  description:
    "DevUp에 가입하고 다양한 개발자 스터디와 프로젝트에 참여해 보세요.",
  robots: {
    index: false,
    follow: false,
  },
};

interface SignupPageProps {
  searchParams: Promise<{
    token?: string;
    type?: string;
    email?: string;
    name?: string;
    redirect?: string;
  }>;
}

function isValidSocialType(value: string): value is SocialType {
  return value === "google" || value === "kakao" || value === "github";
}

export default async function SignupPage({ searchParams }: SignupPageProps) {
  const user = await getMeServer();
  const params = await searchParams;
  const redirectPath = getSafeRedirectPath(params.redirect);

  if (user) {
    redirect(redirectPath ?? "/mypage");
  }

  const token = params.token;
  const type = params.type;
  const email = params.email;

  const isSocialSignup =
    !!token && !!email && !!type && isValidSocialType(type);

  const socialSignup = isSocialSignup ? { token, type, email } : undefined;
  return (
    <div className="flex min-h-[calc(100vh-5.5rem)] items-start justify-center py-6 md:py-10">
      <SignupForm socialSignup={socialSignup} />
    </div>
  );
}
