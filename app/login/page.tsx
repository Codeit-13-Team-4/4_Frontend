import LoginForm from "@/features/auth/ui/LoginForm";
import LoginHero from "@/features/auth/ui/LoginHero";

export default function LoginPage() {
  return (
    <main className="flex min-h-screen bg-gray-900">
      <div className="flex flex-1 items-center justify-center">
        <LoginForm />
      </div>

      <div className="flex flex-1">
        <LoginHero />
      </div>
    </main>
  );
}
