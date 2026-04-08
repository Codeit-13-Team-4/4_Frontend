import { getMeServer } from "@/features/auth/api/getMeServer";
import { getSafeRedirectPath } from "@/features/auth/lib/authRedirect";
import LoginForm from "@/features/auth/ui/LoginForm";
import LoginHero from "@/features/auth/ui/LoginHero";
import { redirect } from "next/navigation";

interface LoginPageProps {
  searchParams: Promise<{
    redirect?: string;
  }>;
}

export default async function LoginPage({ searchParams }: LoginPageProps) {
  const user = await getMeServer();
  const params = await searchParams;
  const redirectPath = getSafeRedirectPath(params.redirect);

  if (user) {
    redirect(redirectPath ?? "/mypage");
  }

  return (
    <div className="flex min-h-screen">
      <div className="flex flex-1 items-center justify-center">
        <LoginForm />
      </div>

      <div className="hidden flex-1 xl:flex">
        <LoginHero />
      </div>
    </div>
  );
}
