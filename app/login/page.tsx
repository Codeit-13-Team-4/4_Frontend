import { getMeServer } from "@/features/auth/api/getMeServer";
import LoginForm from "@/features/auth/ui/LoginForm";
import LoginHero from "@/features/auth/ui/LoginHero";
import { redirect } from "next/navigation";

export default async function LoginPage() {
  const user = await getMeServer();

  if (user) {
    redirect("/mypage");
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
