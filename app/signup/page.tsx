import { getMeServer } from "@/features/auth/api/getMeServer";
import { getSafeRedirectPath } from "@/features/auth/lib/authRedirect";
import { type SocialType } from "@/features/auth/api/socialLogin";
import SignupForm from "@/features/auth/signup/ui/SignupForm";
import { redirect } from "next/navigation";

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
    <div className="flex min-h-screen items-center justify-center">
      <SignupForm socialSignup={socialSignup} />
    </div>
  );
}
